(() => {
  const api = 'https://shadowgrid-api-uwmmxi4eha-ts.a.run.app';
  const status = document.querySelector('[data-shadowgrid-status]');
  const setStatus = text => { if (status) status.textContent = text; };
  const get = async url => {
    const r = await fetch(url, { cache: 'no-store', referrerPolicy: 'no-referrer' });
    if (!r.ok) throw new Error('service_unavailable'); return r.json();
  };
  const post = async (path, value) => {
    const r = await fetch(api + path, { method: 'POST', referrerPolicy: 'no-referrer', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
    const data = await r.json(); if (!r.ok) throw new Error(data.error || 'service_unavailable'); return data;
  };
  const buy = document.querySelector('[data-shadowgrid-buy]');
  if (buy) {
    get(api + '/health').then(data => {
      if (!data.checkout || data.paymentMode !== 'live') { buy.textContent = 'Purchasing opens after beta validation'; setStatus('You can try the framework using the installation guide.'); return; }
      const beta = data.salesMode === 'beta';
      const invitation = document.querySelector('[data-shadowgrid-beta]');
      if (invitation) invitation.hidden = !beta;
      buy.dataset.beta = String(beta);
      buy.disabled = false; buy.textContent = beta ? 'Redeem beta invitation' : 'Buy a founding licence';
      if (beta) setStatus('Private beta: use your invitation to open Stripe, check that the total is A$0 and complete the order without a card.');
    }).catch(() => { buy.textContent = 'Checkout temporarily unavailable'; setStatus('Please retry later or contact luke@blackgrid.com.au.'); });
    buy.addEventListener('click', async () => {
      buy.disabled = true; setStatus('Opening secure Stripe Checkout…');
      try {
        const betaCode = document.querySelector('[data-shadowgrid-beta-code]')?.value.trim();
        if (buy.dataset.beta === 'true' && !betaCode) { setStatus('Enter your beta invitation code first.'); buy.disabled = false; return; }
        const result = await post('/v1/checkout', betaCode ? { betaCode } : {});
        const target = new URL(result.url); if (target.origin !== 'https://checkout.stripe.com') throw new Error();
        window.location.assign(target.href);
      } catch {
        buy.disabled = false;
        setStatus(buy.dataset.beta === 'true' ? 'The invitation could not be redeemed. It may have expired or already been used. If you completed checkout, recover your existing key with your receipt via luke@blackgrid.com.au.' : 'Checkout could not open. Retry or contact luke@blackgrid.com.au. If you already completed an order, use your receipt to recover it.');
      }
    });
  }
  const download = document.querySelector('[data-shadowgrid-download]');
  if (download) {
    const decode = value => Uint8Array.from(atob(value), c => c.charCodeAt(0));
    Promise.all([get(api + '/v1/releases/stable'), get('/assets/shadowgrid/update-key.json')]).then(async ([envelope, trusted]) => {
      if (typeof envelope.payload !== 'string' || envelope.payload.length > 131072) throw new Error('invalid_manifest');
      const key = trusted.keys.find(x => x.id === envelope.keyId && x.purpose === 'update');
      if (!key) throw new Error('unknown_update_key');
      const rsa = await crypto.subtle.importKey('jwk', key, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
      const bytes = decode(envelope.payload);
      if (!await crypto.subtle.verify('RSASSA-PKCS1-v1_5', rsa, decode(envelope.signature), bytes)) throw new Error('invalid_signature');
      const release = JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(bytes));
      const url = new URL(release.url);
      if (release.schema !== 1 || release.purpose !== 'update' || release.issuer !== 'shadowgrid' || release.audience !== 'shadowgrid-desktop' ||
          !/^\d+\.\d+\.\d+$/.test(release.version) || !/^[a-f0-9]{64}$/.test(release.sha256) ||
          !Number.isSafeInteger(release.size) || release.size < 1 || release.size >= 300000000 ||
          !Number.isFinite(Date.parse(release.expiresAt)) || Date.parse(release.expiresAt) <= Date.now() ||
          !Number.isFinite(Date.parse(release.releasedAt)) || Date.parse(release.releasedAt) > Date.now() + 300000 ||
          release.publisherThumbprint !== 'D9BA84607BF9EE8F3DDC673F0C61B08F13D91F46' ||
          url.origin !== 'https://github.com' || !url.pathname.startsWith('/LukeyJohnson/bg-sites/releases/download/') ||
          url.pathname.split('/').at(-1) !== `ShadowGrid-${release.version}.msi` || url.username || url.password || url.search || url.hash) throw new Error('invalid_release');
      download.href = url.href; download.textContent = `Download ShadowGrid ${release.version} (.msi)`;
      const base = new URL('.', url);
      const trust = document.querySelector('[data-shadowgrid-trust]');
      const checksums = document.querySelector('[data-shadowgrid-checksums]');
      if (trust) trust.href = new URL('ShadowGrid-TrustSetup.zip', base).href;
      if (checksums) checksums.href = new URL('SHA256SUMS.txt', base).href;
      setStatus('Release signature verified. Complete one-time trust setup before your first Revit run.');
    }).catch(() => {
      download.removeAttribute('href'); download.setAttribute('aria-disabled', 'true'); download.textContent = 'Current installer could not be verified';
      setStatus('Retry later or use the official release files and verification instructions. Contact luke@blackgrid.com.au if needed.');
    });
  }
  const fulfilStatus = document.querySelector('[data-shadowgrid-fulfil-status]');
  if (fulfilStatus) {
    const sessionId = new URLSearchParams(location.search).get('session_id') || history.state?.shadowgridCheckout;
    if (!sessionId || !/^cs_(?:test_|live_)?[a-zA-Z0-9]{16,240}$/.test(sessionId)) fulfilStatus.textContent = 'Your licence key appears when you return from successful Stripe checkout. Already have a key? Continue with setup below. For a lost key, contact luke@blackgrid.com.au with your receipt.';
    else {
      // Retain only the order reference in this tab's history. Never persist a
      // key in local/session storage or leave the reference in an outgoing URL.
      history.replaceState({ shadowgridCheckout: sessionId }, '', location.pathname);
      post('/v1/fulfill', { sessionId }).then(data => {
        document.querySelector('[data-shadowgrid-key]').textContent = data.licenseKey;
        const summary = document.querySelector('[data-shadowgrid-order-summary]');
        const order = data.orderSummary;
        if (summary && order) {
          const amount = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(order.amountTotal / 100);
          const updates = new Intl.DateTimeFormat('en-AU', { dateStyle: 'long' }).format(new Date(order.updatesUntil));
          summary.textContent = `${amount} AUD total · Perpetual covered v1 · ${order.namedUsers} named user · ${order.devices} devices · Updates through ${updates} · Agreement ${order.termsVersion}`;
        }
        document.querySelector('[data-shadowgrid-fulfil]').hidden = false;
        fulfilStatus.textContent = data.qaOrder ? 'Order verified. No payment was required. Save your key, then follow the setup steps below.' : 'Payment verified. Save your key, then follow the setup steps below.';
        document.querySelector('[data-shadowgrid-copy]').addEventListener('click', async event => {
          try { await navigator.clipboard.writeText(data.licenseKey); event.target.textContent = 'Copied'; }
          catch { event.target.textContent = 'Select and copy the key above'; }
        });
        document.querySelector('[data-shadowgrid-save]').addEventListener('click', () => {
          const lines = ['ShadowGrid licence details — keep private', 'Black Grid — The Trustee for L & T JOHNSON FAMILY TRUST', 'ABN 79 257 336 947', '', 'Licence key: ' + data.licenseKey];
          if (order) lines.push('Perpetual covered v1; one named user; ' + order.devices + ' devices', 'Updates until: ' + order.updatesUntil, 'Agreement: ' + order.termsVersion);
          lines.push('', 'Setup: https://blackgrid.com.au/projects/shadowgrid/install/', 'Support: luke@blackgrid.com.au');
          const href = URL.createObjectURL(new Blob([lines.join('\r\n') + '\r\n'], { type: 'text/plain;charset=utf-8' }));
          const link = document.createElement('a'); link.href = href; link.download = 'ShadowGrid-licence-details.txt'; link.click();
          setTimeout(() => URL.revokeObjectURL(href), 1000);
        });
      }).catch(() => { fulfilStatus.textContent = 'Your order could not yet be verified. Wait and reload this page, or contact luke@blackgrid.com.au with your receipt. Avoid placing another order to retry key delivery. Setup downloads are below.'; });
    }
  }
})();
