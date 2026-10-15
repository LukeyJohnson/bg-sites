---
title: ShadowGrid
---

# ShadowGrid

<p class="bg-lead">A Black Grid add-in for Autodesk Revit that runs Black Grid automation script packs from a dedicated ribbon tab.</p>

ShadowGrid adds a **ShadowGrid** tab to the Revit ribbon. From it you run automation scripts supplied by Black Grid as *script packs* — repeatable model clean-ups, tagging, audits and other jobs that would otherwise be done by hand. It ships with its own embedded Python runtime, so nothing else needs to be installed on the machine.

| | |
|---|---|
| **Revit** | 2023, 2024, 2025 — one installer covers every supported year on the machine |
| **Windows** | Windows 10 / 11 (64-bit) |
| **Rights needed** | None — installs per user, no administrator or UAC prompt |
| **Signing** | Signed with Black Grid's own code-signing certificate; a one-time trust package removes Revit's "publisher could not be verified" prompt |

## How it is delivered

Clients receive a trust package, the add-in installer and a checksums file so they can verify what they received before installing. Script packs are installed separately and can be updated without reinstalling the add-in.

!!! info "Availability"
    ShadowGrid is delivered directly to Black Grid clients. Install guides and script-pack documentation are provided with each release.
