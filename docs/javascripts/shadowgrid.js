(() => {
  const api = 'https://shadowgrid-api-uwmmxi4eha-ts.a.run.app';
  const status = document.querySelector('[data-shadowgrid-status]');
  const setStatus = text => { if (status) status.textContent = text; };
  const post = async (path, value) => {
    const r = await fetch(api + path, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(value) });
    const data = await r.json(); if (!r.ok) throw new Error(data.error || 'service_unavailable'); return data;
  };
  const buy = document.querySelector('[data-shadowgrid-buy]');
  if (buy) {
    fetch(api + '/health').then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(data => {
      if (!data.checkout || data.paymentMode !== 'live') { buy.textContent = 'Purchasing opens after beta validation'; setStatus('You can try the framework using the installation guide.'); return; }
      const beta = data.salesMode === 'beta';
      const invitation = document.querySelector('[data-shadowgrid-beta]');
      if (invitation) invitation.hidden = !beta;
      buy.dataset.beta = String(beta);
      buy.disabled = false; buy.textContent = beta ? 'Redeem beta invitation' : 'Buy a founding licence';
      if (beta) setStatus('Private beta: use your invitation code to complete checkout without a card. General purchasing opens after validation.');
    }).catch(() => { buy.textContent = 'Checkout temporarily unavailable'; setStatus('Please retry later.'); });
    buy.addEventListener('click', async () => {
      buy.disabled = true; setStatus('Opening secure Stripe Checkout…');
      try {
        const betaCode = document.querySelector('[data-shadowgrid-beta-code]')?.value.trim();
        if (buy.dataset.beta === 'true' && !betaCode) { setStatus('Enter your beta invitation code first.'); buy.disabled = false; return; }
        const result = await post('/v1/checkout', betaCode ? { betaCode } : {}); const target = new URL(result.url); if (target.origin !== 'https://checkout.stripe.com') throw new Error(); window.location.assign(target.href);
      }
      catch { buy.disabled = false; setStatus('Checkout could not open. Please retry; no payment has been taken here.'); }
    });
  }
  const download = document.querySelector('[data-shadowgrid-download]');
  if (download) {
    fetch(api + '/v1/releases/stable').then(r => { if (!r.ok) throw new Error(); return r.json(); }).then(envelope => {
      const release = JSON.parse(atob(envelope.payload)); const url = new URL(release.url);
      if (url.protocol !== 'https:' || !['github.com', 'blackgrid.com.au'].includes(url.hostname)) throw new Error();
      download.href = release.url; download.textContent = 'Download ShadowGrid ' + release.version;
      const releases = document.createElement('a'); releases.href = 'https://github.com/LukeyJohnson/bg-sites/releases'; releases.textContent = 'Trust package and SHA-256 checksums';
      download.parentElement.append(' · ', releases);
      setStatus('The desktop updater verifies the signed manifest and installer before installing.');
    }).catch(() => { download.removeAttribute('href'); download.textContent = 'Release not yet available'; setStatus('The release is undergoing validation. Please check back.'); });
  }
  const fulfilStatus = document.querySelector('[data-shadowgrid-fulfil-status]');
  if (fulfilStatus) {
    const sessionId = new URLSearchParams(location.search).get('session_id') || history.state?.shadowgridCheckout;
    if (!sessionId || !/^cs_(?:test_|live_)?[a-zA-Z0-9]{16,240}$/.test(sessionId)) fulfilStatus.textContent = 'No checkout reference was supplied. Return here from your successful Stripe checkout.';
    else post('/v1/fulfill', { sessionId }).then(data => {
      document.querySelector('[data-shadowgrid-key]').textContent = data.licenseKey;
      const summary = document.querySelector('[data-shadowgrid-order-summary]');
      if (summary && data.orderSummary) {
        const order = data.orderSummary;
        const amount = new Intl.NumberFormat('en-AU', { style: 'currency', currency: 'AUD' }).format(order.amountTotal / 100);
        const updates = new Intl.DateTimeFormat('en-AU', { dateStyle: 'long' }).format(new Date(order.updatesUntil));
        summary.textContent = `${amount} AUD total · Perpetual covered v1 · ${order.namedUsers} named user · ${order.devices} devices · Updates through ${updates} · Agreement ${order.termsVersion}`;
      }
      document.querySelector('[data-shadowgrid-fulfil]').hidden = false;
      fulfilStatus.textContent = data.qaOrder ? 'Test order verified. No payment was required. Your licence is ready.' : 'Payment verified. Your licence is ready.';
      document.querySelector('[data-shadowgrid-copy]').addEventListener('click', async event => {
        try { await navigator.clipboard.writeText(data.licenseKey); event.target.textContent = 'Copied'; }
        catch { event.target.textContent = 'Select and copy the key above'; }
      });
      // Keep only the checkout reference in this tab's history so reload can
      // reverify payment; never persist the activation key in browser storage.
      history.replaceState({ shadowgridCheckout: sessionId }, '', location.pathname);
    }).catch(() => { fulfilStatus.textContent = 'Your payment could not yet be verified. Wait and reload, or contact Black Grid with your receipt. Do not purchase again to retry.'; });
  }
})();
