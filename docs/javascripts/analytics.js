/* Shared production measurement for Black Grid. No account or application data. */
(() => {
  'use strict';
  if (window.bgAnalytics) return;
  const id = 'G-4LFM33KC58';
  const sites = {
    'blackgrid.com.au': 'Black Grid',
    'wrw.blackgrid.com.au': 'What Revit Wants',
    'pmgrid.blackgrid.com.au': 'PMGrid',
    'pulse.blackgrid.com.au': 'PulseGrid',
    'proxp.blackgrid.com.au': 'ProXP',
    'mytendrils.blackgrid.com.au': 'MyTendrils'
  };
  const site = sites[location.hostname];
  const privateApps = ['pulse.blackgrid.com.au', 'pmgrid.blackgrid.com.au', 'proxp.blackgrid.com.au', 'mytendrils.blackgrid.com.au'];
  const products = { 'pulse.blackgrid.com.au': 'pulsegrid', 'pmgrid.blackgrid.com.au': 'pmgrid', 'proxp.blackgrid.com.au': 'proxp', 'mytendrils.blackgrid.com.au': 'mytendrils', 'wrw.blackgrid.com.au': 'wrw' };
  let started = false, lastPage = '', lastLocation = '';
  const purchases = new Set();
  const optedOut = () => (document.cookie || '').split(';').some(x => x.trim() === 'bg_analytics_optout=1');
  const blocked = () => !site || location.protocol !== 'https:' || optedOut() ||
    navigator.globalPrivacyControl === true || navigator.doNotTrack === '1' ||
    window['ga-disable-' + id] === true;
  function path(url) {
    if (!privateApps.includes(url.hostname)) {
      // Public editorial paths only; never retain email-like or credential paths.
      let decoded;
      try { decoded = decodeURIComponent(url.pathname); } catch { return '/other/'; }
      if (/@|(?:cs_|sk_|SG1\.)|(?:token|secret|password|licenseKey)/i.test(decoded)) return '/other/';
      return url.pathname;
    }
    if (url.hostname !== 'proxp.blackgrid.com.au') return url.pathname === '/' ? '/' : '/private/';
    const exact = ['/', '/settings', '/dashboard', '/privacy', '/experts', '/terms', '/projects', '/projects/create', '/login', '/login/google-redirect', '/signup'];
    const plain = url.pathname.replace(/\/$/, '') || '/';
    if (exact.includes(plain)) return plain;
    if (/^\/portfolio\/[^/]+\/?$/.test(url.pathname)) return '/portfolio/_id';
    if (/^\/projects\/[^/]+\/edit\/?$/.test(url.pathname)) return '/projects/_id/edit';
    if (/^\/projects\/[^/]+\/?$/.test(url.pathname)) return '/projects/_id';
    return '/private/';
  }
  function context() {
    const here = new URL(location.href);
    let referrer = '';
    try {
      const ref = new URL(document.referrer);
      if (/^https?:$/.test(ref.protocol)) referrer = ref.origin + (sites[ref.hostname] ? path(ref) : '/');
    } catch { /* No referrer is normal. */ }
    return {
      page_location: here.origin + path(here),
      page_referrer: referrer,
      page_title: privateApps.includes(here.hostname) ? site : (/@/.test(document.title || '') ? site : document.title),
      site_name: site
    };
  }
  function start() {
    if (blocked()) return false;
    if (started) return true;
    started = true;
    const existing = typeof window.gtag === 'function';
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () { window.dataLayer.push(arguments); };
    if (!existing) window.gtag('js', new Date());
    window.gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'granted' });
    const settings = { ...context(), send_page_view: false, cookie_domain: 'blackgrid.com.au',
      allow_google_signals: false, allow_ad_personalization_signals: false,
      allow_interest_groups: false, cookie_flags: 'SameSite=Lax;Secure' };
    // Only known public campaign labels are accepted; no arbitrary URL values.
    const params = new URL(location.href).searchParams;
    if (['facebook', 'linkedin', 'x', 'twitter', 'wrw', 'blackgrid', 'followit', 'newsletter'].includes(params.get('utm_source'))) settings.campaign_source = params.get('utm_source');
    if (['social', 'organic_social', 'email', 'referral'].includes(params.get('utm_medium'))) settings.campaign_medium = params.get('utm_medium');
    if (['shadowgrid-launch-20261121', 'shadowgrid-launch', 'pulsegrid-launch'].includes(params.get('utm_campaign'))) settings.campaign_name = params.get('utm_campaign');
    if (['pulsegrid-launch-post'].includes(params.get('utm_content'))) settings.campaign_content = params.get('utm_content');
    window.gtag('config', id, settings);
    if (!document.querySelector('script[src^="https://www.googletagmanager.com/gtag/js"]')) {
      const script = document.createElement('script');
      script.async = true; script.referrerPolicy = 'no-referrer';
      script.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
      document.head.appendChild(script);
    }
    return true;
  }
  function event(name, values = {}) {
    if (!start()) return false;
    window.gtag('event', name, { ...context(), ...values, send_to: id, transport_type: 'beacon' });
    return true;
  }
  const item = { item_id: 'shadowgrid-v1', item_name: 'ShadowGrid framework v1', quantity: 1 };
  const pulseItem = { item_id: 'pulsegrid-collaborator-monthly', item_name: 'PulseGrid personal collaborator', price: 29, quantity: 1 };
  function pageView() {
    if (blocked()) return false;
    const key = location.origin + location.pathname;
    if (lastPage === key) return false;
    lastPage = key;
    const first = !started;
    if (!start()) return false;
    const page = context();
    if (lastLocation) page.page_referrer = lastLocation;
    if (!first) window.gtag('config', id, { ...page, update: true, send_page_view: false });
    event('page_view', page);
    lastLocation = page.page_location;
    if (location.hostname === 'blackgrid.com.au' && location.pathname === '/projects/shadowgrid/') {
      event('view_item', { currency: 'AUD', value: 249, items: [{ ...item, price: 249 }] });
    }
    if (location.hostname === 'blackgrid.com.au' && location.pathname === '/projects/pulsegrid/') {
      event('view_item', { currency: 'AUD', value: 29, items: [pulseItem] });
    }
    return true;
  }
  function purchase(transactionId) {
    if (blocked() || !/^sg_[a-f0-9]{32}$/.test(transactionId) || purchases.has(transactionId)) return false;
    try { if (sessionStorage.getItem('bg_purchase_' + transactionId)) return false; } catch { /* Provider transaction ID also deduplicates. */ }
    const sent = event('purchase', { transaction_id: transactionId, currency: 'AUD', items: [item] });
    if (sent) {
      purchases.add(transactionId);
      try { sessionStorage.setItem('bg_purchase_' + transactionId, '1'); } catch { /* Storage can be unavailable. */ }
    }
    return sent;
  }
  function preference(enabled) {
    document.cookie = 'bg_analytics_optout=' + (enabled ? '0' : '1') + '; Max-Age=31536000; Path=/; Domain=blackgrid.com.au; SameSite=Lax; Secure';
    if (!enabled) {
      for (const measurement of [id, 'G-2CJ2VLZ8MY']) window['ga-disable-' + measurement] = true;
      for (const cookie of (document.cookie || '').split(';')) {
        const name = cookie.trim().split('=')[0];
        if (/^_ga(?:_|$)/.test(name)) for (const domain of ['', '; Domain=blackgrid.com.au', '; Domain=' + location.hostname]) {
          document.cookie = name + '=; Max-Age=0; Path=/; SameSite=Lax; Secure' + domain;
        }
      }
    }
    location.reload();
  }
  window.bgAnalytics = {
    pageView, purchase, enabled: () => !blocked(),
    checkoutStarted: () => event('begin_checkout', { currency: 'AUD', value: 249, items: [{ ...item, price: 249 }] }),
    checkoutFailed: () => event('checkout_error', { product: 'shadowgrid' }),
    pulsegridBillingViewed: () => location.hostname === 'pulse.blackgrid.com.au' && event('pulsegrid_billing_view', { product: 'pulsegrid' }),
    pulsegridCheckoutStarted: () => location.hostname === 'pulse.blackgrid.com.au' && event('begin_checkout', { product: 'pulsegrid', currency: 'AUD', value: 29, items: [pulseItem] }),
    preference
  };
  document.addEventListener('click', e => {
    const choice = e.target.closest?.('[data-bg-analytics-choice]');
    if (choice) { preference(choice.dataset.bgAnalyticsChoice === 'enable'); return; }
    // Track only public, explicitly selected actions. Never inspect input values.
    if (location.hostname !== 'blackgrid.com.au' && location.hostname !== 'wrw.blackgrid.com.au') return;
    const link = e.target.closest?.('a[href]');
    if (!link) return;
    const url = new URL(link.href, location.href);
    // Internal links keep the original session attribution: never replace social UTMs with "wrw".
    let pulseAction = '';
    if (url.hostname === 'blackgrid.com.au' && url.pathname === '/projects/pulsegrid/') pulseAction = 'landing';
    if (url.hostname === 'pulse.blackgrid.com.au') {
      if (url.pathname === '/') pulseAction = url.searchParams.get('settings') === 'account' ? 'start' : 'open';
      else if (url.pathname === '/preview') pulseAction = 'preview';
      else if (['/help/user', '/help/mcp'].includes(url.pathname)) pulseAction = 'guide';
    }
    if (pulseAction) {
      const values = { product: 'pulsegrid', action: pulseAction };
      // Give gtag time to send before leaving the document. Never hold modified,
      // new-tab, download or opted-out clicks; a blocked library cannot strand a link.
      if (!blocked() && !e.defaultPrevented && e.button === 0 &&
          !e.ctrlKey && !e.metaKey && !e.shiftKey && !e.altKey &&
          (!link.target || link.target === '_self') && !link.hasAttribute?.('download')) {
        e.preventDefault();
        let followed = false;
        const follow = () => {
          if (followed) return;
          followed = true;
          location.assign(url.href);
        };
        setTimeout(follow, 300);
        values.event_callback = follow;
        values.event_timeout = 250;
      }
      event('pulsegrid_cta', values);
    }
    if (url.protocol === 'mailto:') { event('contact_click', { method: 'email' }); return; }
    if (products[url.hostname] && url.hostname !== location.hostname) event('product_open', { product: products[url.hostname] });
    if (url.hostname === 'blackgrid.com.au' && url.pathname === '/projects/shadowgrid/install/') {
      event(link.dataset.bgTrialGuide !== undefined ? 'trial_guide_open' : 'guide_open', { product: 'shadowgrid' });
    }
    if (url.hostname === 'github.com' && url.pathname.startsWith('/LukeyJohnson/bg-sites/releases/download/')) {
      const extension = url.pathname.split('.').at(-1).toLowerCase();
      if (['msi', 'zip', 'txt'].includes(extension)) event('file_download', { product: 'shadowgrid', file_extension: extension,
        file_name: extension === 'msi' ? 'ShadowGrid-installer.msi' : extension === 'zip' ? 'ShadowGrid-trust.zip' : 'SHA256SUMS.txt' });
    }
  });
  const status = document.querySelector('[data-bg-analytics-status]');
  if (status) status.textContent = blocked() ? 'Optional analytics is currently off in this browser.' : 'Optional analytics is currently on in this browser.';
  pageView();
})();
