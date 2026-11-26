import fs from 'node:fs';
import vm from 'node:vm';
import assert from 'node:assert/strict';
import { webcrypto } from 'node:crypto';

const source = fs.readFileSync(new URL('../docs/javascripts/analytics.js', import.meta.url), 'utf8');
const id = 'G-4LFM33KC58';
function browser(href = 'https://blackgrid.com.au/', options = {}) {
  const scripts = [], listeners = {}, timeouts = [], storage = options.storage || new Map();
  const cookies = new Map((options.cookie || '').split(';').filter(Boolean).map(x => x.trim().split('=')));
  const location = { ...Object.fromEntries(['href', 'hostname', 'protocol', 'origin', 'pathname', 'search'].map(k => [k, new URL(href)[k]])), reload() { this.reloaded = true; }, assign(href) { (this.navigations ||= []).push(href); } };
  const document = {
    title: options.title || 'Black Grid', referrer: options.referrer || '',
    createElement: () => ({}), head: { appendChild: x => scripts.push(x) },
    querySelector: s => s.startsWith('script[') ? scripts.find(x => x.src.startsWith('https://www.googletagmanager.com/gtag/js')) : null,
    addEventListener: (name, fn) => { listeners[name] = fn; }
  };
  Object.defineProperty(document, 'cookie', {
    get: () => [...cookies].map(([k, v]) => k + '=' + v).join('; '),
    set: value => { const [k, v] = value.split(';')[0].split('='); if (value.includes('Max-Age=0')) cookies.delete(k); else cookies.set(k, v); }
  });
  const context = { location, document, navigator: options.navigator || {}, window: options.window || {},
    URL, Date, Set, setTimeout: (fn, ms) => timeouts.push({ fn, ms }), sessionStorage: { getItem: k => storage.get(k), setItem: (k, v) => storage.set(k, v) } };
  vm.createContext(context); vm.runInContext(source, context);
  return { context, scripts, listeners, storage, cookies, timeouts, commands: () => (context.window.dataLayer || []).map(x => [...x]) };
}
const events = (b, name) => b.commands().filter(x => x[0] === 'event' && x[1] === name);
const main = browser();
assert.equal(main.scripts.length, 1);
assert.equal(events(main, 'page_view').length, 1);
assert.equal(main.commands().filter(x => x[0] === 'config').length, 1, 'configure once on document load');
assert.equal(main.context.window.bgAnalytics.pageView(), false);
vm.runInContext(source, main.context);
assert.equal(main.scripts.length, 1);
assert.equal(events(main, 'page_view').length, 1);
const settings = main.commands().find(x => x[0] === 'config')[2];
assert.equal(settings.send_page_view, false);
assert.equal(settings.cookie_domain, 'blackgrid.com.au');
assert.equal(settings.allow_google_signals, false);
assert.equal(settings.allow_ad_personalization_signals, false);

for (const href of ['http://blackgrid.com.au/', 'https://localhost/', 'https://lukeyjohnson.github.io/bg-sites/', 'https://pulsegrid-staging-7ps5dsadra-uc.a.run.app/']) {
  assert.equal(browser(href).scripts.length, 0);
}
for (const options of [{ navigator: { globalPrivacyControl: true } }, { navigator: { doNotTrack: '1' } }, { cookie: 'bg_analytics_optout=1' }, { window: { ['ga-disable-' + id]: true } }]) {
  const b = browser(undefined, options); assert.equal(b.scripts.length, 0); assert.equal(b.commands().length, 0);
  assert.equal(b.context.window.bgAnalytics.checkoutStarted(), false);
}
for (const host of ['pmgrid', 'mytendrils', 'proxp', 'pulse']) {
  const b = browser(`https://${host}.blackgrid.com.au/projects/CustomerName/edit?email=person@example.com&token=VERY_PRIVATE#licence`, {
    title: 'CustomerName confidential project', referrer: 'https://proxp.blackgrid.com.au/portfolio/PRIVATE_UID?token=BEARER'
  });
  const serialized = JSON.stringify(b.commands());
  for (const secret of ['CustomerName', 'person@example.com', 'VERY_PRIVATE', 'PRIVATE_UID', 'BEARER', 'confidential']) assert.ok(!serialized.includes(secret), secret);
  assert.equal(events(b, 'page_view').length, 1);
  b.context.location.pathname = '/projects/ANOTHER_PRIVATE_ID/edit';
  b.context.location.href = `https://${host}.blackgrid.com.au/projects/ANOTHER_PRIVATE_ID/edit`;
  b.context.window.bgAnalytics.pageView();
  assert.equal(events(b, 'page_view').length, 2);
  assert.equal(b.commands().filter(x => x[0] === 'config').at(-1)[2].update, true, 'route context updates must not reinitialise measurement');
  assert.ok(!JSON.stringify(b.commands()).includes('ANOTHER_PRIVATE_ID'));
}
const campaign = browser('https://blackgrid.com.au/?utm_source=linkedin&utm_medium=social&utm_campaign=shadowgrid-launch&session_id=cs_live_SECRET&email=someone@example.com#SECRET');
assert.equal(campaign.commands().find(x => x[0] === 'config')[2].campaign_source, 'linkedin');
assert.ok(!JSON.stringify(campaign.commands()).includes('SECRET'));
assert.ok(!JSON.stringify(campaign.commands()).includes('someone@example.com'));
const unknownCampaign = browser('https://blackgrid.com.au/?utm_source=PRIVATE_PERSON&utm_campaign=person@example.com');
assert.ok(!JSON.stringify(unknownCampaign.commands()).includes('PRIVATE_PERSON'));
assert.ok(!JSON.stringify(unknownCampaign.commands()).includes('person@example.com'));
const external = browser(undefined, { referrer: 'https://example.com/private?token=SECRET#PRIVATE' });
assert.equal(events(external, 'page_view')[0][2].page_referrer, 'https://example.com/');

const shared = browser();
shared.scripts[0].src = 'https://www.googletagmanager.com/gtag/js?id=G-2CJ2VLZ8MY';
delete shared.context.window.bgAnalytics;
vm.runInContext(source, shared.context);
assert.equal(shared.scripts.length, 1, 'reuse an existing Google library');
assert.ok(events(shared, 'page_view').every(x => x[2].send_to === id), 'never broadcast to WRW legacy destination');
const order = 'sg_' + 'a'.repeat(32);
assert.equal(main.context.window.bgAnalytics.purchase('cs_live_SECRET'), false);
assert.equal(main.context.window.bgAnalytics.purchase(order), true);
assert.equal(main.context.window.bgAnalytics.purchase(order), false);
assert.equal(events(main, 'purchase').length, 1);
assert.equal(events(main, 'purchase')[0][2].value, undefined, 'do not mistake tax-inclusive totals for net revenue');
const reload = browser(undefined, { storage: main.storage });
assert.equal(reload.context.window.bgAnalytics.purchase(order), false);
const preference = browser(undefined, { cookie: '_ga=ABC; _ga_4LFM33KC58=DEF' });
preference.context.window.bgAnalytics.preference(false);
assert.equal(preference.cookies.get('bg_analytics_optout'), '1');
assert.ok(!preference.cookies.has('_ga'));
assert.ok(!preference.cookies.has('_ga_4LFM33KC58'));
assert.equal(preference.context.window['ga-disable-G-2CJ2VLZ8MY'], true);
assert.equal(preference.context.location.reloaded, true);

// Launch attribution and the real PulseGrid checkout handoff use the shared destination.
const launch = browser('https://wrw.blackgrid.com.au/pulsegrid-a-shared-board-for-people-and-agents/?utm_source=linkedin&utm_medium=organic_social&utm_campaign=pulsegrid-launch&utm_content=pulsegrid-launch-post');
const launchConfig = launch.commands().find(x => x[0] === 'config')[2];
assert.equal(launchConfig.campaign_source, 'linkedin');
assert.equal(launchConfig.campaign_name, 'pulsegrid-launch');
assert.equal(launchConfig.campaign_content, 'pulsegrid-launch-post');
function click(b, href) {
  b.listeners.click({ target: { closest: selector => selector === 'a[href]' ? { href, dataset: {} } : null } });
}
click(launch, 'https://blackgrid.com.au/projects/pulsegrid/');
assert.equal(events(launch, 'pulsegrid_cta')[0][2].action, 'landing');
const pulseLanding = browser('https://blackgrid.com.au/projects/pulsegrid/');
assert.equal(events(pulseLanding, 'view_item')[0][2].items[0].item_id, 'pulsegrid-collaborator-monthly');
assert.equal(pulseLanding.commands().find(x => x[0] === 'config')[2].campaign_source, undefined, 'internal pages preserve session attribution');
click(pulseLanding, 'https://pulse.blackgrid.com.au/?settings=account');
assert.equal(events(pulseLanding, 'pulsegrid_cta')[0][2].action, 'start');
const pulse = browser('https://pulse.blackgrid.com.au/?settings=account&email=private@example.com', { title: 'Private account' });
assert.equal(pulse.context.window.bgAnalytics.pulsegridBillingViewed(), true);
assert.equal(pulse.context.window.bgAnalytics.pulsegridCheckoutStarted(), true);
assert.equal(events(pulse, 'begin_checkout')[0][2].value, 29);
assert.equal(events(pulse, 'begin_checkout')[0][2].send_to, id);
assert.equal(events(pulse, 'purchase').length, 0, 'opening subscription checkout never claims a paid purchase');
assert.ok(!JSON.stringify(pulse.commands()).includes('private@example.com'));
assert.ok(!JSON.stringify(pulse.commands()).includes('Private account'));
assert.equal(main.context.window.bgAnalytics.pulsegridCheckoutStarted(), false, 'only the PulseGrid app may report its handoff');
const blockedPulse = browser('https://pulse.blackgrid.com.au/', { navigator: { globalPrivacyControl: true } });
assert.equal(blockedPulse.context.window.bgAnalytics.pulsegridCheckoutStarted(), false);
assert.equal(blockedPulse.context.window.bgAnalytics.pulsegridBillingViewed(), false);
assert.equal(blockedPulse.commands().length, 0);

// A fast CTA must send before same-tab navigation, with a bounded no-library fallback.
function navigationClick(b, options = {}) {
  const href = 'https://pulse.blackgrid.com.au/?settings=account';
  const link = { href, target: options.target || '', dataset: {}, hasAttribute: name => name === 'download' && !!options.download };
  const e = { button: 0, defaultPrevented: false, ...options, preventDefault() { this.defaultPrevented = true; }, target: { closest: selector => selector === 'a[href]' ? link : null } };
  b.listeners.click(e);
  return e;
}
const quick = browser();
assert.equal(navigationClick(quick).defaultPrevented, true);
assert.equal(quick.context.location.navigations, undefined, 'do not navigate before the send callback');
const quickEvent = events(quick, 'pulsegrid_cta')[0][2];
assert.equal(quickEvent.event_timeout, 250);
quickEvent.event_callback();
quick.timeouts[0].fn();
assert.equal(quick.context.location.navigations.length, 1, 'callback plus fallback navigate only once');
const noCallback = browser();
navigationClick(noCallback);
assert.equal(noCallback.timeouts[0].ms, 300);
noCallback.timeouts[0].fn();
assert.equal(noCallback.context.location.navigations.length, 1, 'a missing Google callback cannot strand the visitor');
for (const options of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { target: '_blank' }, { download: true }, { defaultPrevented: true }]) {
  const b = browser(); navigationClick(b, options);
  assert.equal(b.timeouts.length, 0, 'retain native modified/new-tab/download or already-handled clicks');
}
const noTrackingNavigation = browser(undefined, { navigator: { globalPrivacyControl: true } });
assert.equal(navigationClick(noTrackingNavigation).defaultPrevented, false);
assert.equal(noTrackingNavigation.timeouts.length, 0);

// Exercise the actual fulfilment script, without creating orders or sending events.
const fulfilment = fs.readFileSync(new URL('../docs/javascripts/shadowgrid.js', import.meta.url), 'utf8');
async function completedOrder(qaOrder, amountTotal, currency = 'aud') {
  const captured = [], sessionId = 'cs_live_' + 'S'.repeat(40), licence = 'DO_NOT_SEND_THIS_LICENCE';
  const elements = new Map();
  for (const name of ['fulfil-status', 'key', 'fulfil', 'copy', 'save']) elements.set(`[data-shadowgrid-${name}]`, { textContent: '', hidden: true, addEventListener() {} });
  const c = { URL, URLSearchParams, TextEncoder, Intl, Date, crypto: webcrypto,
    location: { search: '?session_id=' + sessionId, pathname: '/projects/shadowgrid/thank-you/' },
    history: { state: null, replaceState() {} }, document: { querySelector: k => elements.get(k) || null },
    fetch: async () => ({ ok: true, json: async () => ({ licenseKey: licence, qaOrder, orderSummary: { amountTotal, currency } }) }),
    window: { bgAnalytics: { purchase: x => captured.push(x) } } };
  vm.createContext(c); vm.runInContext(fulfilment, c);
  await new Promise(resolve => setTimeout(resolve, 30));
  assert.equal(elements.get('[data-shadowgrid-key]').textContent, licence, 'analytics must not interrupt key delivery');
  assert.ok(captured.every(x => /^sg_[a-f0-9]{32}$/.test(x)));
  assert.ok(!JSON.stringify(captured).includes(sessionId)); assert.ok(!JSON.stringify(captured).includes(licence));
  return captured;
}
assert.equal((await completedOrder(false, 27390)).length, 1);
assert.equal((await completedOrder(true, 0)).length, 0);
assert.equal((await completedOrder(false, 0)).length, 0);
assert.equal((await completedOrder(false, 24900, 'usd')).length, 0);
console.log('Analytics regression checks passed: privacy, URL sanitisation, routing, duplicate guards, browser choice and verified paid-order counts.');
