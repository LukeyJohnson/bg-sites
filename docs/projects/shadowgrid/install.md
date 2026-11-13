---
title: Install and update ShadowGrid
---

# Install ShadowGrid

You need 64-bit Windows, a supported full Revit installation, internet access for initial activation, and permission under your organisation's software policy.

**Beta validation:** the 1.0.0 package contains builds for Revit 2023–2026. Protected startup, cloud activation and same-session Python iteration have passed in Revit 2024.1. Fresh MSI installation and an OTA upgrade are awaiting second-machine acceptance. Other Revit years have passed build/signature and relevant runtime checks; native testing in those hosts remains pending.

<p><a class="md-button md-button--primary" data-shadowgrid-download href="../">Checking the current release…</a></p>
<p data-shadowgrid-status role="status" aria-live="polite"></p>

## First installation

1. Save your work and close Revit before installing or upgrading the framework.
2. Download the **MSI**, **Black Grid trust package** and **SHA256SUMS.txt** from the official release page.
3. Verify the publisher before importing the certificate: **Black Grid**, thumbprint `D9BA84607BF9EE8F3DDC673F0C61B08F13D91F46`. Your IT team can deploy the public certificate centrally. The trust package imports it for your Windows user; this is a one-time setup for this publisher.
4. Run the MSI for your Windows user. It installs the Revit-specific payloads together.
5. Open Revit. Choose **ShadowGrid → Account / Updates** and either start a trial or paste your purchased licence key.
6. Choose **Open Folder** to find your personal tools. Run the included hello-world example against a suitable open project.

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
