---
title: Analytics operations
---

# Black Grid analytics operations

Configured 23 November 2026. Deployment and live verification receipts are recorded separately as rollout completes.

| Setting | Value |
| --- | --- |
| Account | Existing Luke-owned account `133640448` |
| Shared property | **Black Grid — Web**, `565459335` |
| Web stream | **Black Grid root and production subdomains**, `16392127739` |
| Measurement ID | `G-4LFM33KC58` |
| Reporting zone / currency | `Australia/Brisbane` / `AUD` |
| User / event retention | 14 months each |
| Shared Google tag container | `GTM-PG2352L8`, live version 3 |
| Existing WRW property | `363747891`, `G-2CJ2VLZ8MY`, retained independently |

[Open the shared property](https://analytics.google.com/analytics/web/#/a133640448p565459335/reports/reportinghub). Use **Pages and screens** for page usage and **Traffic acquisition** for sources. Add **Hostname** to separate the root, WRW, PMGrid, PulseGrid, ProXP and MyTendrils. Views and users are different metrics. Standard reporting can take 24–48 hours to settle; Realtime/DebugView and successful collection requests provide earlier evidence.

## Collection contract

The shared source is `docs/javascripts/analytics.js`, served from the root website. The hostname allowlist contains only the six deployed public sites. Localhost, GitHub previews and generated Firebase/Cloud Run/staging origins do not collect. Add a new product hostname deliberately when its production deployment is ready; merely creating DNS does not install tracking.

Each page explicitly injects one Google library; Google may fetch another destination configuration script for WRW’s historical property. WRW retains its historical destination and loads the shared tracker as a second, explicit reporting destination; shared events specify `send_to` and never broadcast into its legacy property. The parent-domain first-party cookie maintains anonymous browser continuity across the covered hosts. Cross-domain linker decoration is unnecessary for subdomains, and Stripe Checkout is not tagged.

Next.js roots load the same source after hydration and call `pageView` on pathname changes. Initial load/effect retries are deduplicated. ProXP dynamic project/portfolio paths are normalised; other unknown private paths become `/private/`. App titles are fixed labels. Page/referrer query strings and fragments are excluded, and external referrers retain only their origin. Arbitrary URL campaign values are not forwarded. Google signals and advertising personalisation are off. Enhanced measurement is off in the shared stream: no automatic form, site-search, video or outbound-link capture.

| Event | Meaning |
| --- | --- |
| `page_view` | A document view or completed app pathname change |
| `view_item` | ShadowGrid product page viewed; public founding offer A$249 excluding tax |
| `product_open` | A public link to another Black Grid product selected |
| `guide_open` / `trial_guide_open` | Setup/first-script guide opened; does **not** claim a trial activation |
| `file_download` | Official installer, trust ZIP or checksum link selected; does **not** prove installation |
| `contact_click` | Email link selected; does **not** prove an enquiry was sent |
| `begin_checkout` | The service returned a valid Stripe Checkout URL for a public purchase |
| `checkout_error` | Public checkout could not open; no error text or invitation code is recorded |
| `purchase` | A returning browser received server-verified paid fulfilment; complimentary/test orders excluded |

Purchase identity is a truncated SHA-256 reference, never a raw Stripe session or licence key. In-tab state and the stable Analytics transaction ID deduplicate reloads. **Revenue amounts are omitted** because the existing fulfilment response does not itemise tax. Stripe remains authoritative for revenue and for purchases whose customers never return to the website; browser counts are not a complete financial ledger. No paid order is placed to test this integration.

## Privacy and browser choice

The [public privacy page](privacy.md) explains collection and supplies browser controls. The parent-domain `bg_analytics_optout` cookie applies across covered hosts and clears Analytics cookies when disabled. GPC, DNT and the Google opt-out flag prevent Google script loading. Do not pass account IDs, email/name fields, customer/project content, licence keys, checkout references or conversation text to the shared API. Google-side email/query redaction provides an additional safeguard; source sanitisation remains mandatory.

Run `node tools/test-analytics.mjs` and `mkdocs build --strict` before changing the root integration. The deployment workflow runs the analytics regression suite. Each app has a loader/route-observer component and its own integration notes; do not add another tag in Firebase or a separate layout. Source repositories are `bg-sites`, `bg-wrw`, `pmgrid`, `studio` (ProXP) and `mytendrils`; the empty `proxp` repository is not its deployed source. PulseGrid production uses `pulse.blackgrid.com.au` and the `feat/pulsegrid` branch; legacy PMGrid production remains on `main`.

For live checks, verify a successful `page_view` collection request with the shared measurement ID, correct hostname/sanitised path and a single page-view event per destination. Check blocked/privacy preference cases and route navigation. Keep raw provider/browser evidence outside Git; commit only non-secret status and public identifiers. Never manufacture a live purchase event for QA.

## Google container settings

The automatically created Google Analytics tag initially ignored on-page configuration and generated an extra default page view. On 24 November, container version 3 sets `send_page_view=false` at the destination and allows the explicit on-page configuration. It also disables user-provided-data capabilities and automatic email/phone/name detection. Version 2 disabled automatic event/history/form/link/video/download detection. Keep both Google-side and source-side controls when editing this integration; the GA stream's Enhanced Measurement toggle alone did not configure these container controls. Recheck actual collection requests after changes.

## PulseGrid launch funnel · 27 November 2026

The campaign is `pulsegrid-launch`. Reviewed Facebook, Black Grid LinkedIn and X posts link to the single WRW launch article with `utm_source=facebook|linkedin|x`, `utm_medium=organic_social`, `utm_campaign=pulsegrid-launch` and `utm_content=pulsegrid-launch-post`. These exact values are allowlisted. WRW → Black Grid → PulseGrid links have **no new UTMs**: the shared first-party GA cookie preserves the original session source rather than attributing the conversion to our own site. Attribution remains subject to browser privacy choices and session expiry.

Before launch, register the event-scoped custom dimensions **Action** (`action`) and **Product** (`product`) in the shared property if absent, so the optional event parameters are usable in explorations. These contain only fixed allowlisted labels. Follow [Google’s campaign configuration reference](https://developers.google.com/analytics/devguides/collection/ga4/reference/config) for the allowlisted campaign fields.

The saved **PulseGrid launch — social to checkout** exploration is a closed user funnel: WRW article view → main product page view → PulseGrid billing view → Stripe handoff. It is filtered by **Session campaign = pulsegrid-launch** and broken down by **Session source**. GA4 disables the combined Session source / medium dimension for this funnel; source and medium are imported separately. Funnel users are not session counts, and a user can return across sessions. Use Traffic acquisition for session visit counts.

[Open the launch exploration](https://analytics.google.com/analytics/web/#/analysis/a133640448p565459335/edit/hj8cyerjQ6auFbb3FmAbVQ). The saved range is This month, including launch day; adjust the range when reviewing the complete November–December campaign. New reporting data is subject to GA processing latency.

For additional detail, the available events are:

1. `page_view` on `wrw.blackgrid.com.au`, launch article path.
2. `pulsegrid_cta` with action `landing` (WRW → main product page).
3. `view_item`, item ID `pulsegrid-collaborator-monthly`, on `blackgrid.com.au/projects/pulsegrid/`.
4. `pulsegrid_cta` with action `start` (launch CTA), then `pulsegrid_billing_view` on `pulse.blackgrid.com.au`.
5. `begin_checkout` with product `pulsegrid`: the authenticated server has returned a Stripe Checkout URL and the browser is about to open it. The monthly list price is AUD 29; a trial or coupon can change the actual charge.

Other public actions are `preview`, `open` and `guide`. Event values are fixed labels, never link queries, account IDs, project names or form input. App paths stay sanitised. The matching PulseGrid app change opens Connections & account after authentication for `?settings=account`, and emits the last two events. Deploy that app change and this shared script before releasing the campaign.

**No PulseGrid `purchase` event is implemented or inferred from a success query.** Stripe remains the source of truth for paid subscriptions, coupon redemptions and revenue. This funnel measures visits through the purchase handoff, not verified paid conversion. Do not mark checkout or a free trial as a paid purchase. Existing ShadowGrid purchase measurement is independent and unchanged. Realtime/DebugView may be used for a real, consented walkthrough; automated regression tests intercept gtag and create no live orders or collection requests.

PulseGrid public same-tab CTA clicks use a Google event callback before navigation, with a 250 ms event timeout and a 300 ms independent navigation fallback. Modified clicks, new tabs, downloads, already-cancelled navigation and privacy opt-outs retain their normal browser behavior. A missing Analytics library cannot strand a visitor. This addresses a real live check in which an immediate navigation dropped the queued click event.
