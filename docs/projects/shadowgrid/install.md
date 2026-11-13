---
title: Install and update ShadowGrid
---

# Install ShadowGrid

You need 64-bit Windows, a supported full Revit installation, internet access for initial activation, and permission under your organisation's software policy.

**Beta validation:** the packages contain Revit 2023–2026 builds. Protected startup, cloud activation and same-session Python iteration have passed in Revit 2024.1. The owner has completed checkout, download and MSI installation on a second machine; publisher trust, first-run activation and an OTA upgrade still need acceptance. Other Revit years have passed build/signature and relevant runtime checks; native testing in those hosts remains pending.

## First installation

### A. Set up Windows trust once

**Trust setup is a separate download. It is not integrated into the MSI.** If you already ran the MSI, complete this step and reopen Revit; your installation can stay in place.

<p><a class="md-button md-button--primary" data-shadowgrid-trust href="https://github.com/LukeyJohnson/bg-sites/releases/download/shadowgrid-v1.0.1-beta.1/ShadowGrid-TrustSetup.zip">Download one-time trust package (.zip)</a></p>

1. Right-click the ZIP and choose **Extract All**. Open the extracted folder.
2. Check the publisher: **Black Grid**, thumbprint `D9BA84607BF9EE8F3DDC673F0C61B08F13D91F46`{ .shadowgrid-thumbprint }. The package contains the public certificate and setup helpers.
3. Double-click **`Install-ShadowGridTrust.cmd`** and review any Windows certificate prompt. Wait for **SUCCESS**.

The helper adds trust for your Windows user. If company policy blocks it, ask IT to deploy the public certificate to Trusted Root Certification Authorities and Trusted Publishers under your organisation's policy. Routine framework updates reuse this publisher.

### B. Install the add-in

Save your work and close Revit. Download and run the MSI for your Windows user. It installs the supported Revit payloads and bundled Python together.

<p><a class="md-button md-button--primary" data-shadowgrid-download>Checking the current installer…</a></p>
<p data-shadowgrid-status role="status" aria-live="polite"></p>
<p><a data-shadowgrid-checksums href="https://github.com/LukeyJohnson/bg-sites/releases/download/shadowgrid-v1.0.1-beta.1/SHA256SUMS.txt">Download SHA-256 checksums</a> · <a href="https://github.com/LukeyJohnson/bg-sites/releases" target="_blank" rel="noopener noreferrer">Official release files</a></p>

### C. Activate and check the first run

Open Revit and choose **ShadowGrid → Account / Updates**. Paste the key saved after checkout and choose **Activate**, or start the 14-day trial and review/accept its agreement. Paid Checkout already records the purchase agreement; starting another trial is unnecessary for a purchased key.

Open a suitable test project, choose **Open Folder** and run the included hello-world example. If the ribbon is missing or Revit reports an unverified publisher, finish the trust step above for the same Windows user, then close and reopen Revit. Contact [luke@blackgrid.com.au](mailto:luke@blackgrid.com.au) with your Revit/ShadowGrid versions and the exact message if the issue remains.

Your licence key is confidential. Store the key you receive after checkout. If you need help recovering a purchase, contact Black Grid with the payment receipt; do not publish your key or model files.

## Create your first tool

1. Choose **ShadowGrid → Build with your AI** and select your Revit year.
2. Click **Copy design guide** and paste it into your chosen AI chat. Use **Copy starter prompt**, then describe the task you want to automate.
3. Review the generated `.py` file, save it using **Open Folder**, refresh the list and run it.

The guide covers script structure, the supplied Revit context, transactions, dependencies and version differences. The same Markdown files are installed in the host's `guidance` folder for attachment to an AI chat.

For a compatible Windows AI client, **Copy optional MCP configuration** gives you a local connection that lets the AI retrieve these rules automatically. Merge the entry into your client's MCP settings. The MCP provides guidance on script shape; it does not supply scripts, inspect your model or run tools. Scripts come from you, your AI or a separate library. MCP setup is optional.

Save the `.py` file in the folder opened by **Open Folder**, refresh the list and run it. Editing the saved script does not require a Revit restart. New dependencies and native framework changes can require additional setup; do not install arbitrary packages into the bundled runtime without checking compatibility.

## Update the framework

ShadowGrid checks the canonical Black Grid service for signed releases. When an update is available, the ribbon identifies it. Open **Account / Updates → Check for framework updates** and choose whether to install.

The updater downloads the MSI, checks the signed release metadata, file size, SHA-256, expected Windows publisher and your update entitlement. Save and close Revit, and disconnect the optional ShadowGrid MCP in your AI client. The updater waits for these processes in your Windows session, then installs without automatically reopening Revit or restarting Windows. A routine update does not reinstall the trust certificate.

Personal tools and activation are retained under `%LocalAppData%\Black Grid\ShadowGrid`. Installer-owned files are under your Revit add-ins directories. Back up your tools as part of your normal work backup.

If updating fails, use the existing installation as the recovery starting point. Logs are under `%LocalAppData%\Black Grid\ShadowGrid\updates`. You can also download the current official MSI and install it after closing Revit.

## Offline use and device changes

A perpetual licence permits offline execution of the covered release after activation. Trial and time-limited licences have a signed offline expiry. Maintenance expiry does not remove perpetual execution rights for a covered release. Cloud services and new downloads require connectivity.

Use **Release this installation** before moving a licence to another device. Two registered devices belong to one named user, not two users. If a device is lost or unavailable, contact Black Grid for help releasing it.

## Existing Black Grid clients

Before replacing an older client-delivered add-in, back up its script folder and confirm your existing delivery/licence terms with Black Grid. Older scripts may live beside the add-in DLL. Commercial v1 keeps personal tools in the separate folder opened by **Open Folder**. Copy your approved tools there after checking their dependencies; existing bespoke support agreements are separate.
