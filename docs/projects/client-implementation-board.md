---
title: Client Implementation Board
---

# Client Implementation Board

<p class="bg-lead">A client-safe window into the implementation work Black Grid tracks for each customer.</p>

Implementation issues are managed on a GitHub Projects board. The Client Implementation Board gives customers a read-only view of that work — an issue list and issue detail pages — without exposing the underlying repository.

## What it does

- **Verified access:** email-link sign-in with a server-side session, no passwords to manage.
- **Sanitised data:** raw GitHub URLs, usernames and non-whitelisted labels are stripped before anything reaches the client.
- **Live board:** list and detail views are read straight from the project board with short-lived caching.
- **Read-only by design:** comment posting is intentionally disabled in the current release.

!!! info "Availability"
    Provisioned per customer as part of a Black Grid implementation engagement.
