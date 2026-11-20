---
title: Get started with ShadowGrid
description: Install and activate ShadowGrid, connect optional Claude or Codex guidance, and create, run and improve your first Revit Python tool.
---

# Get started with ShadowGrid

Go from installation to your first working Revit tool on this page. Bring the AI assistant you already use; ShadowGrid includes Python and runs your saved scripts inside Revit. Your AI subscription is separate.

1. [Download, set up Windows trust and install](#first-installation).
2. [Activate and run the included example](#c-activate-and-check-the-first-run).
3. [Create, save, run and revise your first tool](#create-your-first-tool). Copy the design guide into your AI chat, or use the [optional Claude/Codex MCP connection](#optional-mcp-for-claude-or-codex).

You can start a **14-day trial** or [buy a founding licence](../shadowgrid.md#get-started). MCP configuration is optional; copying the design guide works with an ordinary AI chat.

## Before you start

You need 64-bit Windows, a supported full Revit installation, internet access for initial activation, and permission under your organisation's software policy.

**Release validation:** the packages contain Revit 2023–2026 builds. Protected startup, cloud activation and same-session Python iteration have passed in Revit 2024.1. Checkout, installation, publisher trust, trial and purchased activation, and a framework upgrade have also passed on a second machine by owner report. Other Revit years have passed build/signature and relevant runtime checks; native testing in those hosts remains pending.

## First installation

### A. Set up Windows trust once

**Trust setup is a separate download. It is not integrated into the MSI.** If you already ran the MSI, complete this step and reopen Revit; your installation can stay in place.

<p><a class="md-button md-button--primary" data-shadowgrid-trust href="https://github.com/LukeyJohnson/bg-sites/releases/download/shadowgrid-v1.0.2-beta.1/ShadowGrid-TrustSetup.zip">Download one-time trust package (.zip)</a></p>

1. Right-click the ZIP and choose **Extract All**. Open the extracted folder.
2. Check the publisher: **Black Grid**, thumbprint `D9BA84607BF9EE8F3DDC673F0C61B08F13D91F46`{ .shadowgrid-thumbprint }. The package contains the public certificate and setup helpers.
3. Double-click **`Install-ShadowGridTrust.cmd`** and review any Windows certificate prompt. Wait for **SUCCESS**.

The helper adds trust for your Windows user. If company policy blocks it, ask IT to deploy the public certificate to Trusted Root Certification Authorities and Trusted Publishers under your organisation's policy. Routine framework updates reuse this publisher.

### B. Install the add-in

Save your work and close Revit. Download and run the MSI for your Windows user. It installs the supported Revit payloads and bundled Python together.

<p><a class="md-button md-button--primary" data-shadowgrid-download>Checking the current installer…</a></p>
<p data-shadowgrid-status role="status" aria-live="polite"></p>
<p><a data-shadowgrid-checksums href="https://github.com/LukeyJohnson/bg-sites/releases/download/shadowgrid-v1.0.2-beta.1/SHA256SUMS.txt">Download SHA-256 checksums</a> · <a href="https://github.com/LukeyJohnson/bg-sites/releases" target="_blank" rel="noopener noreferrer">Official release files</a></p>

### C. Activate and check the first run

Open Revit and choose **ShadowGrid → Account / Updates**. Paste the key saved after checkout and choose **Activate**, or start the 14-day trial and review/accept its agreement. Paid Checkout already records the purchase agreement; starting another trial is unnecessary for a purchased key.

Check the installation before asking your AI to write anything:

1. Open a suitable test project in Revit.
2. On the **ShadowGrid** ribbon, choose **Open Folder**. This opens your personal tools folder, normally `%LocalAppData%\Black Grid\ShadowGrid\tools`.
3. Choose **Refresh List**, select **`hello_world.py`** in the script dropdown, then click **Run**.
4. A **ShadowGrid** dialog should say **Hello from ShadowGrid Python Runner!**, with your Revit year and active document title. This example does not change the model.

If the example is absent from an existing tools folder, copy `hello_world.py` from `%AppData%\Autodesk\Revit\Addins\<year>\ShadowGrid\scripts` into the folder opened by **Open Folder**, then refresh. Keep any personal files already there.

Your licence key is confidential. Store the key you receive after checkout. If you need help recovering a purchase, contact Black Grid with the payment receipt; do not publish your key or model files.

## Create your first tool

### 1. Give your AI the ShadowGrid rules

Choose **ShadowGrid → Build with your AI** and select the Revit year you will run the script in. Click **Copy design guide** and paste it into your AI chat. The same Markdown files are installed in the host's `guidance` folder if you prefer attachments.

If you have configured the [optional MCP below](#optional-mcp-for-claude-or-codex), ask your AI to call `get_script_design_rules` for that year instead. Confirm it retrieved the rules before asking it to draft the script. Registering an MCP server alone does not establish that a chat has read its guidance.

The rules cover the supplied Revit context, script structure, transactions, dependencies and differences between Revit years.

### 2. Ask for a small, inspectable tool

Use **Copy starter prompt** for your own task, or paste this first-task request after supplying the rules. Replace `[year]` with your selected Revit year:

> Following the ShadowGrid design rules for Revit [year], write a single UTF-8 Python file named `my_first_tool.py`. Make it read-only: show the active document title and the number of selected elements in a Revit TaskDialog titled "My first ShadowGrid tool". Handle no open document and an empty selection with a useful message. Use the supplied Revit context and no external packages, network access or file writes. Explain what it does and how to test it. Return the complete Python file, ready to save.

Review the explanation and code before running it. For this task, it should report information without starting a transaction or changing the model. Ask your AI to explain any unexpected behaviour or dependency.

### 3. Save the Python file

1. Choose **Open Folder** in Revit and keep that folder open.
2. Copy the generated Python code into a plain-text/code editor. Include only the Python file contents, without chat commentary or Markdown code fences.
3. Save it as **`my_first_tool.py`**, using UTF-8 encoding, directly inside that tools folder. In Windows Notepad, choose **Save as type → All files** so it is not saved as `my_first_tool.py.txt`. Show file extensions in Explorer to check.

Your own scripts belong in this personal tools folder, outside the installer files. Back up the folder as part of your normal work backup.

### 4. Run it and check the result

1. In your test project, select a known number of elements.
2. Choose **ShadowGrid → Refresh List**, select **`my_first_tool.py`** from the dropdown, then click **Run**.
3. Check that the dialog shows the correct document title and selection count. Clear the selection and run again to check the empty-selection message.

You run the script from the Revit ribbon. The guidance MCP helps your AI author it; it does not inspect the live model, save the script or run it for you.

### 5. Change it and run again

Ask your AI to change the dialog title to **My updated ShadowGrid tool**, keeping the tool read-only. Review the change, save the same `.py` file, dismiss any previous result dialog and click **Run** again with that file selected. The updated title should appear without restarting Revit. Use **Refresh List** whenever you add a new filename.

ShadowGrid reads the selected file again on each run. Imported helper modules can remain cached; changes to them and new dependencies may require extra setup. Follow the design guide rather than installing arbitrary packages into the bundled runtime.

You now have the basic workflow: **give your AI the rules → describe a task → review → save → refresh/select → run → revise and rerun**.

## Optional MCP for Claude or Codex

The installed **ShadowGrid.Guidance.exe** runs locally over MCP stdio. It needs no API key or open Revit session and supplies the bundled guidance offline. ShadowGrid 1.0.2 includes guidance contract 1.0.0 for Revit 2023–2026.

For **Claude Code** or the **Codex CLI running on Windows**, run the applicable command in PowerShell. Replace `2026` with a Revit year installed on your PC; the server in any installed host folder can return guidance for all four years.

```powershell
$sgGuidance = "$env:APPDATA\Autodesk\Revit\Addins\2026\ShadowGrid\ShadowGrid.Guidance.exe"

# Codex CLI
codex mcp add shadowgrid-guidance -- "$sgGuidance"

# Claude Code
claude mcp add --transport stdio --scope user shadowgrid-guidance -- "$sgGuidance"
```

Check `codex mcp list`, or `/mcp` inside Claude Code, then ask your AI:

> Before drafting my ShadowGrid script for Revit 2026, call `get_script_design_rules` with `revit_version` set to `"2026"`, then follow those rules.

For **Claude Desktop on Windows**:

1. In **Build with your AI**, click **Copy optional MCP configuration**. This copies JSON containing the actual executable path for your installation.
2. In Claude Desktop, open **Settings → Developer → Edit Config**. On Windows the file is `%AppData%\Claude\claude_desktop_config.json`.
3. Merge the `shadowgrid-guidance` entry into `mcpServers`, preserving existing entries/settings. If the file is empty, use the complete copied JSON. Keep the absolute path and JSON's escaped backslashes as copied.
4. Save, fully quit Claude Desktop and reopen it. Check the connector/tool list for **shadowgrid-guidance**, then use the rules-retrieval prompt above in a new chat. Allow the guidance call if your client asks.

Other clients accepting `mcpServers` JSON can use the ribbon's copied entry too. Codex uses its own MCP configuration format; use its command above. Client references: [Codex MCP guide](https://developers.openai.com/codex/mcp/), [Claude Code MCP guide](https://code.claude.com/docs/en/mcp), [Claude Desktop local-server setup](https://modelcontextprotocol.io/docs/develop/connect-local-servers).

A WSL client needs the executable's Linux-mounted path and working Windows process interoperability. A cloud-only chat client cannot start this local Windows server; use **Copy design guide** or attach the installed Markdown guidance instead. The cloud guidance URL serves documentation, not a hosted MCP connection.

The packaged server has passed protocol checks and an independent MCP SDK test. Setup inside a particular Claude or Codex client still needs verification by discovering and calling the tool in that client.

## If something does not work

| What you see | What to check |
| --- | --- |
| Missing ribbon or publisher-trust warning | Complete the one-time trust setup for the same Windows user, check that you installed the MSI and are using full Revit, then close and reopen Revit. Company policy may require IT assistance. |
| Activation fails | Use the licence key saved after checkout rather than an invitation code, and check internet access. Keep the exact error for support; do not place another order to retry activation. |
| New script missing from the dropdown | Save directly into the folder opened by **Open Folder**, check the `.py` extension rather than `.py.txt`, and choose **Refresh List**. |
| No valid script selected | Select the actual `.py` filename in the dropdown before clicking **Run**. |
| Python execution error or no useful result | Check that a suitable project is open and the script matches its Revit year. Give your AI the exact error and relevant code, then review the correction. Ask for a TaskDialog result; `print()` has no guaranteed visible console here. |
| MCP does not connect or the rules are unavailable | Check the executable path and local stdio support in the client. Use **Copy design guide** to continue while resolving MCP setup. |

Contact [luke@blackgrid.com.au](mailto:luke@blackgrid.com.au) with your ShadowGrid version, exact Revit build, the failed step and error message. Keep licence keys and confidential model/script content out of public diagnostics.

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
