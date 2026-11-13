---
title: Your ShadowGrid purchase
---

# Set up ShadowGrid

<p data-shadowgrid-fulfil-status role="status" aria-live="polite">Checking your payment with Stripe…</p>
<div data-shadowgrid-fulfil hidden>
<h2>1. Save your licence key</h2>
<p data-shadowgrid-order-summary></p>
<p>Keep this page open while you set up. Copy your key or save the licence details below; you will paste the key into Revit.</p>
<pre><code data-shadowgrid-key></code></pre>
<button class="md-button" type="button" data-shadowgrid-copy>Copy licence key</button>
<button class="md-button" type="button" data-shadowgrid-save>Save licence details (.txt)</button>
<p class="shadowgrid-note">The saved file contains your key. Keep it private.</p>
</div>

## 2. Set up Windows trust once

**The trust package is separate from the MSI.** Download it on your first Windows installation. Routine ShadowGrid updates use the same publisher and do not repeat this step.

<p><a class="md-button md-button--primary" data-shadowgrid-trust href="https://github.com/LukeyJohnson/bg-sites/releases/download/shadowgrid-v1.0.1-beta.1/ShadowGrid-TrustSetup.zip">Download trust package (.zip)</a></p>

1. Right-click the downloaded ZIP and choose **Extract All**.
2. Open the extracted folder and double-click **`Install-ShadowGridTrust.cmd`**.
3. Review any Windows certificate prompt. The publisher is **Black Grid**, with thumbprint `D9BA84607BF9EE8F3DDC673F0C61B08F13D91F46`{ .shadowgrid-thumbprint }. The helper installs trust for your Windows user; company policy may require IT assistance.
4. Wait for the helper to report **SUCCESS**.

**Already installed the MSI?** Complete trust setup now, close Revit and open it again. You can keep the existing ShadowGrid installation.

## 3. Install ShadowGrid

Save your work and close Revit. Download and run the MSI for your Windows user. Python and the Revit 2023–2026 builds are included.

<p><a class="md-button md-button--primary" data-shadowgrid-download>Checking the current installer…</a></p>
<p data-shadowgrid-status role="status" aria-live="polite"></p>
<p><a data-shadowgrid-checksums href="https://github.com/LukeyJohnson/bg-sites/releases/download/shadowgrid-v1.0.1-beta.1/SHA256SUMS.txt">Download SHA-256 checksums</a> · <a href="https://github.com/LukeyJohnson/bg-sites/releases" target="_blank" rel="noopener noreferrer">Official release files</a></p>

## 4. Activate in Revit

Open your supported full Revit version, choose **ShadowGrid → Account / Updates**, paste the key from step 1 and choose **Activate**. Initial activation needs internet access. Open a suitable test project and run the included hello-world tool.

## 5. Build your first AI tool

Choose **Build with your AI**, select your Revit year and **Copy design guide**. Paste the guide into your AI chat and describe a small task. Review the generated `.py` file, save it using **Open Folder**, then refresh and run it. You can revise and rerun without restarting Revit.

The optional MCP retrieves design rules for your AI. Copying the guide is enough to get started.

[Full installation, activation and update guide](install.md){ .md-button }

<section aria-labelledby="shadowgrid-stay-connected">
<h2 id="shadowgrid-stay-connected">Keep building with us</h2>
<p>Follow Black Grid and Luke for ShadowGrid news, practical BIM tools and AI workflows.</p>
<p><a href="https://www.linkedin.com/company/black-grid/" target="_blank" rel="noopener noreferrer">Black Grid on LinkedIn</a> · <a href="https://www.facebook.com/WhatRevitWants/" target="_blank" rel="noopener noreferrer">What Revit Wants on Facebook</a> · <a href="https://x.com/LukeyJohnson" target="_blank" rel="noopener noreferrer">Luke on X / Twitter</a></p>
<p><a class="md-button" href="https://wrw.is/feed/" target="_blank" rel="noopener noreferrer">Subscribe to What Revit Wants RSS</a></p>
</section>

Your order is verified with Stripe before a key is issued. If verification is still processing, wait and reload this page. If you completed checkout but cannot recover your key, keep your Stripe receipt and contact [luke@blackgrid.com.au](mailto:luke@blackgrid.com.au). Avoid placing another order to retry key delivery.

Supplier: The Trustee for L & T JOHNSON FAMILY TRUST, trading as Black Grid. ABN **79 257 336 947**. [Licence and refunds](licence.md) · [Privacy](privacy.md).
