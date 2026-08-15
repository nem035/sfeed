---
name: sfeed
description: Use when the user wants to post, schedule, inspect, preview, or manage Facebook Page or Instagram content with sfeed CLI or MCP. Always confirm before publishing or scheduling.
---

# sfeed Social Media Posting Skill

sfeed is a CLI + MCP tool for posting to Facebook Pages and Instagram. It handles auth, posting, hosted scheduling, and MCP access for AI agents.

sfeed does not generate copy for the user. Write the post yourself from the user's request, then use sfeed to publish or schedule it.

## Setup Check

Before doing anything, verify sfeed is set up:

1. Run `sfeed status` for the full picture
2. Or run `sfeed auth status` if you only need to know which platforms are connected
3. If Facebook is needed but disconnected, ask the user to run `sfeed auth facebook connect`
4. If Instagram is needed but disconnected, ask the user to run `sfeed auth instagram connect`

When `SFEED_AGENT_TOKEN` is present, do not ask the agent process to connect or
revoke providers, manage billing or keys, read audit events, or open hosted
dashboard and preview URLs. Those are owner-only operations. A scoped agent
should use the destinations returned by `sfeed destinations` or
`sfeed_destinations`; the hosted service filters them by the key policy.

## How to Post

### Step 1: Check state

Start here:

```bash
sfeed status
```

Or via MCP: call `sfeed_status`

This shows:
- Connected platforms
- Subscription status
- Scheduled posts

Call `sfeed_destinations` or run `sfeed destinations` before posting so you can choose the canonical destination ID for each platform. `sfeed_pages` remains available for Facebook Page compatibility workflows.

### Step 2: Write the post

Craft the post content from the user's request. If the user wants different versions per platform, draft them separately and confirm which one should be posted where.

### Step 3: Confirm with the user

Always show the drafted post(s) to the user before posting. Show each platform variant if they differ.

### Step 4: Post

```bash
sfeed post "your content here" --to facebook,instagram
```

Or via MCP: call `sfeed_post` with content, platforms, `destination_ids`, and optional media or `schedule_at`.

Options:
- `--to` / `platforms`: comma-separated platforms (facebook, instagram)
- `--media` / `media`: local files or public URLs. sfeed stages local files automatically when Instagram or hosted scheduling needs a public URL
- `--at` / `schedule_at`: ISO 8601 datetime to schedule for
- `--page`: CLI account name or ID selector when more than one matching destination is connected
- `destination_ids`: MCP map from platform to canonical destination ID; get IDs from `sfeed_destinations`
- `--dry-run` / `dry_run`: validate media and preview inputs without publishing or scheduling

Use dry-run first when the user is testing or when media validation is useful.

## Connecting Accounts

```bash
sfeed auth facebook connect
sfeed auth instagram connect
```

Run the command for each platform the user wants. Facebook connects selected Pages through Facebook Login for Business. Instagram connects a professional Business or Creator account directly through Instagram Login and does not require a Facebook Page. Provider credentials remain encrypted in the hosted service; the CLI stores only its sfeed identity and safe destination metadata.

## Platform Specifics

### Facebook Pages
- Posts go to your Facebook Page. The API does not support personal profiles.
- Supports immediate posting and hosted scheduling via `--at`
- Supports text-only, single-image, multi-image, and single-video posts
- `sfeed posts list` and `sfeed posts show` read current Page-owned posts
- `sfeed posts edit` can replace the text of a post created by sfeed
- `sfeed posts delete` permanently deletes a post created by sfeed only after explicit confirmation
- Longer content is fine

### Instagram
- Requires at least one image or video (no text-only posts)
- Supports single-image, single-video, and image-only carousels
- Scheduled posts use sfeed's hosted scheduler
- Reels: all single-feed videos become Reels

## Checking State

Before posting or scheduling, check the current state:

```bash
sfeed status
```

Or via MCP: call `sfeed_status`

This returns a combined overview of auth connections, subscription status, and scheduled posts. Call this first to understand what's set up before doing anything else.

To see scheduled posts in detail:

```bash
sfeed schedule list
sfeed schedule list --status failed
sfeed schedule list --status posted
sfeed schedule list --json   # machine-readable
```

Or via MCP: call `sfeed_schedule_list` with optional `format: "json"` and `status: "pending" | "failed" | "posted" | "all"`.

## Scheduling

```bash
sfeed post "content" --to facebook --at "2024-12-31T09:00:00Z"
```

- Scheduled posts are stored on sfeed's hosted scheduler
- Hosted scheduling requires an active subscription
- Local staged media must be within 90 days
- Local staged files must be 100 MB or smaller
- Schedule times must be ISO 8601 with a timezone, for example `2026-04-01T09:00:00Z`

## File Locations

| File | Purpose |
|------|---------|
| `~/.sfeed/tokens.json` | sfeed identity and safe destination metadata (chmod 600) |
| `~/.sfeed/subscription.json` | Cached hosted subscription status |

Scoped runtimes should receive `SFEED_USER_ID` and `SFEED_AGENT_TOKEN` from the
process environment. Do not put the agent token in the owner's
`~/.sfeed/.env`. If the runtime can read the owner's `~/.sfeed/tokens.json`, it
can recover owner authority, so untrusted agents require OS-user, container, or
sandbox isolation from that file.

## MCP Tools Reference

| Tool | Purpose |
|------|---------|
| `sfeed_status` | Complete overview: auth, subscription, and schedule |
| `sfeed_auth_status` | Check authenticated platforms |
| `sfeed_destinations` | List canonical Facebook and Instagram publishing destinations |
| `sfeed_pages` | List connected page IDs and Instagram linkage |
| `sfeed_post` | Publish, schedule, or dry-run a post |
| `sfeed_facebook_posts_list` | List recent posts owned by one connected Facebook Page |
| `sfeed_facebook_post_get` | Read one Page post and its live URL |
| `sfeed_facebook_post_update` | Replace the text of a Page post created by sfeed |
| `sfeed_facebook_post_delete` | Permanently delete a Page post created by sfeed after explicit user confirmation |
| `sfeed_schedule_status` | Queue counts, next scheduled posts, and recent failures |
| `sfeed_schedule_dashboard_url` | Owner only: get a signed browser URL for the hosted queue UI |
| `sfeed_schedule_preview_url` | Owner only: get a signed browser URL for one scheduled post |
| `sfeed_schedule_list` | List scheduled posts (supports `format` and `status`) |
| `sfeed_schedule_reschedule` | Move a pending scheduled post to a new time |
| `sfeed_schedule_duplicate` | Copy a scheduled post into a fresh pending job |
| `sfeed_schedule_cancel` | Cancel a scheduled post |
| `sfeed_report_problem` | Send a user-approved problem report |

## CLI Commands Reference

| Command | Purpose |
|---------|---------|
| `sfeed status` | Complete overview of auth, subscription, and schedule |
| `sfeed dashboard` | Open the hosted queue UI in a browser |
| `sfeed dashboard --view calendar` | Open the hosted queue UI as a month calendar |
| `sfeed calendar` | Open the hosted queue UI as a month calendar |
| `sfeed auth facebook connect` | Connect or reconnect Facebook Pages |
| `sfeed auth instagram connect` | Connect or reconnect direct Instagram |
| `sfeed auth facebook revoke` | Revoke Facebook access in sfeed without affecting Instagram |
| `sfeed auth instagram revoke` | Revoke Instagram access in sfeed without affecting Facebook |
| `sfeed auth status` | Show connection status |
| `sfeed post <content>` | Post to platforms (`--to`, `--media`, `--at`, `--page`) |
| `sfeed posts list` | List recent Page-owned Facebook posts |
| `sfeed posts show <id>` | Read one Facebook Page post |
| `sfeed posts edit <id>` | Replace the text of a Facebook Page post created by sfeed |
| `sfeed posts delete <id>` | Permanently delete a Facebook Page post after confirmation |
| `sfeed schedule status` | Show queue counts and recent activity |
| `sfeed schedule open` | Open the same hosted queue UI as `sfeed dashboard` |
| `sfeed schedule calendar` | Open the same hosted queue UI as a month calendar |
| `sfeed schedule list` | List scheduled posts (`--status`, `--json`) |
| `sfeed schedule preview <id>` | Open a browser preview for one scheduled post |
| `sfeed schedule reschedule <id>` | Move a pending scheduled post |
| `sfeed schedule duplicate <id>` | Copy a scheduled post into a fresh pending job |
| `sfeed schedule cancel <id>` | Cancel a scheduled post |
| `sfeed pages` | List connected pages |
| `sfeed destinations` | List canonical publishing destinations |
| `sfeed agents create` | Owner only: create a scoped agent credential |
| `sfeed agents list` | Owner only: list agent credentials |
| `sfeed agents revoke <id>` | Owner only: revoke an agent credential |
| `sfeed audit --json` | Owner only: inspect content-free hosted activity |
| `sfeed billing` | Show subscription status |
| `sfeed billing subscribe` | Start hosted scheduling subscription |
| `sfeed billing portal` | Open the billing portal |
| `sfeed report "what went wrong"` | Send a user-written problem report |
| `sfeed mcp` | Start MCP server |
