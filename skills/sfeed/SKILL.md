---
name: sfeed
description: >-
  Use when the user wants to connect, inspect, publish, schedule, edit, or
  delete Facebook Page or Instagram content through sfeed, including requests
  that refer indirectly to connected social accounts or a social queue. Do not
  use for generic copywriting, strategy, analytics, unsupported platforms, or
  requests that do not include a sfeed publishing or account-management goal.
---

# sfeed

sfeed is a local CLI and MCP server for Facebook Page and Instagram publishing.
Use MCP tools when they are available and the CLI otherwise. If neither a local
shell nor sfeed MCP tools are available, explain setup without claiming an
action ran.

## Action boundary

Read-only checks, drafting, and `dry_run` validation do not need confirmation.
Before an external write, show the exact content, platform, destination, media,
post kind, and timing, then ask for approval. External writes include:

- publishing now
- creating or changing a scheduled post
- editing or deleting a published Facebook Page post
- revoking an account connection
- sending a problem report

Do not treat approval of one post as approval for later posts. Never expose
sfeed identity tokens, agent tokens, or provider credentials.

## First-run workflow

1. Ask which platforms the user wants: Facebook, Instagram, or both.
2. Ask where drafts, media, and posting rules already live.
3. Check `sfeed --version` and then run `sfeed status`.
4. If sfeed is missing, install it with:

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
```

5. Connect only the platforms the user requested:

```bash
sfeed auth facebook connect
sfeed auth instagram connect
```

6. Run `sfeed destinations`. Make the destination explicit when more than one
   matching account is connected.

Facebook connects selected Pages. Instagram connects a professional Business
or Creator account directly and does not require a Facebook Page. Browser auth
requires the user to complete Meta's consent flow.

## Publish workflow

1. Run `sfeed status` or call `sfeed_status`.
2. Run `sfeed destinations` or call `sfeed_destinations`.
3. Read the user's source material and prepare the final platform-specific post.
4. Use `--dry-run` or `dry_run: true` when media or destination validation is useful.
5. Show the complete action and get approval.
6. Publish or schedule with `sfeed post` or `sfeed_post`.
7. Return the post result or scheduled-job ID. Never report success before the
   command or tool returns successfully.

CLI example:

```bash
sfeed post "Launch day. The release is live." \
  --to facebook \
  --page "Acme Robotics" \
  --media ./content/media/launch-card.jpg
```

MCP calls should pass the canonical IDs from `sfeed_destinations` in
`destination_ids`. The CLI can use `--page` with an account name, external ID,
or canonical destination ID.

## Platform rules

Facebook:

- publishes to Pages, not personal profiles or Groups
- supports text-only feed posts, images, multiple images, videos, Page Reels,
  and Page Stories
- supports published-post list, show, edit, and delete operations when Meta
  grants the required permissions

Instagram:

- requires a professional Business or Creator account
- requires media; text-only posts are unsupported
- supports feed media, Reels, Stories, and image-only carousels of up to 10 items

Use `--kind feed`, `--kind reel`, `--kind story`, or `--kind carousel` when the
desired shape is not obvious. A Story takes exactly one image or video.

## Scheduling

Scheduling is hosted and requires an active subscription. Make the timezone
explicit and use an ISO 8601 time with an offset.

```bash
sfeed post "Tuesday product update" \
  --to facebook \
  --page "Acme Robotics" \
  --at "2026-09-01T09:00:00-04:00"
```

Inspect before mutating a job identified by description rather than ID:

```bash
sfeed schedule status
sfeed schedule list --json
sfeed schedule preview <id>
sfeed schedule reschedule <id> --at "2026-09-04T14:00:00-04:00"
sfeed schedule duplicate <id>
sfeed schedule cancel <id>
sfeed schedule acknowledge <id>
```

After inspecting a failed job and either recovering it or confirming no further
action is needed, acknowledge it so readiness checks no longer report it as an
active incident. Acknowledgement preserves the failure and its error in
history. Never acknowledge failures merely to clear a warning. Use
`sfeed schedule acknowledge --all` only after reviewing every unacknowledged
failure.

## Published Facebook posts

Use these only for a connected Facebook Page. List or read first when the user
describes a post instead of supplying an exact ID.

```bash
sfeed posts list --page "Acme Robotics"
sfeed posts show <post-id> --page "Acme Robotics"
sfeed posts edit <post-id> --page "Acme Robotics" --content "Updated text"
sfeed posts delete <post-id> --page "Acme Robotics" --yes
```

Before edit or delete, show the selected Page, post ID, current content, and
exact change. Deletion is permanent.

## Owner and scoped-agent modes

When `SFEED_AGENT_TOKEN` is present, the hosted service limits destinations and
operations according to the owner's policy. In scoped mode, do not attempt to:

- connect or revoke providers
- manage billing or agent keys
- read the owner audit stream
- mint hosted dashboard or preview URLs

Use only destinations returned by `sfeed destinations` or
`sfeed_destinations`. An untrusted agent must not be able to read the owner's
`~/.sfeed/tokens.json`; isolate it with a separate OS user, container, or
sandbox.

## Tool choice

Prefer these MCP tools when available:

- `sfeed_status` and `sfeed_destinations` for readiness and account selection
- `sfeed_post` for dry runs, immediate publishing, and scheduling
- `sfeed_facebook_posts_list`, `sfeed_facebook_post_get`,
  `sfeed_facebook_post_update`, and `sfeed_facebook_post_delete` for Page posts
- `sfeed_schedule_*` tools for queue inspection and mutation

Use CLI commands when MCP is unavailable or when a command gives a clearer
interactive owner flow, such as browser authentication or billing.

## References

- https://sfeed.dev/docs
- https://sfeed.dev/docs/posting
- https://sfeed.dev/docs/scheduling
- https://sfeed.dev/docs/mcp
- https://sfeed.dev/docs/agent-keys
