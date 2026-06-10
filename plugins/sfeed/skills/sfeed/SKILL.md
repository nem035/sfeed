---
name: sfeed
description: Use when the user wants to post, schedule, inspect, preview, or manage Facebook Page or Instagram content with sfeed CLI or MCP. Always confirm before publishing or scheduling.
---

# sfeed Social Media Posting Skill

sfeed is a CLI and MCP server for posting to Facebook Pages and Instagram. It handles auth, posting, hosted scheduling, previews, queue management, billing checks for hosted scheduling, and problem reports.

sfeed does not generate copy by itself. Draft the post from the user's request, then use sfeed to validate, publish, or schedule it.

## Setup Check

Before posting or scheduling, check state:

1. Prefer MCP: call `sfeed_status`.
2. If MCP is unavailable, run `sfeed status`.
3. If nothing is connected, ask the user to run `sfeed auth facebook`.
4. If more than one Page is connected, call `sfeed_pages` or run `sfeed pages` before drafting the final action.

## Posting Workflow

1. Check state with `sfeed_status` or `sfeed status`.
2. Draft the post content from the user's request.
3. Show the final content, platform, media, Page, and schedule time to the user.
4. Ask for approval before publishing or scheduling.
5. Use `dry_run` first when the user is testing or when media validation is useful.
6. After approval, call `sfeed_post` or run `sfeed post`.

## MCP Usage

Use MCP tools when they are available:

```json
{
  "content": "Shipping v0.2.1 today.",
  "platforms": ["facebook"],
  "page_id": "112233445566778",
  "dry_run": true
}
```

For real posting, set `dry_run` to `false` or omit it after the user approves.

For scheduling, pass `schedule_at` as an ISO 8601 timestamp with a timezone:

```json
{
  "content": "Launch day.",
  "platforms": ["instagram"],
  "media": ["./assets/launch-card.jpg"],
  "page_id": "112233445566778",
  "schedule_at": "2026-04-01T13:00:00Z",
  "dry_run": true
}
```

## CLI Fallback

Use the CLI if MCP tools are not available:

```bash
sfeed status
sfeed pages
sfeed post "Shipping v0.2.1 today." --to facebook --page "Acme Robotics" --dry-run
sfeed post "Shipping v0.2.1 today." --to facebook --page "Acme Robotics"
```

For scheduled posts:

```bash
sfeed post "Launch day." --to instagram --page "Acme Robotics" --media ./assets/launch-card.jpg --at "2026-04-01T13:00:00Z" --dry-run
sfeed post "Launch day." --to instagram --page "Acme Robotics" --media ./assets/launch-card.jpg --at "2026-04-01T13:00:00Z"
```

## Account Connection

Use:

```bash
sfeed auth facebook
```

This opens the browser. The user approves access, and sfeed stores the local auth state. Facebook auth also enables Instagram when the user's Facebook Page is linked to an Instagram professional account.

## Platform Notes

Facebook:

- Posts go to Facebook Pages, not personal profiles.
- Supports text-only posts, images, videos, Page Reels, Page Stories, immediate posting, and hosted scheduling.

Instagram:

- Requires at least one image or video.
- Supports feed posts, Reels, Stories, and image-only carousels.
- Requires a professional Instagram account linked to a Facebook Page.

## Scheduling

Hosted scheduling is the scheduling mode. It requires an active subscription.

- Use `schedule_at` in MCP or `--at` in CLI.
- Use ISO 8601 timestamps with a timezone.
- Local scheduled media must be within 90 days.
- Local staged files must be 100 MB or smaller.
- Use `sfeed_schedule_preview_url` or `sfeed schedule preview <id>` to inspect one scheduled post.
- Use `sfeed_schedule_dashboard_url` or `sfeed dashboard` for the hosted queue UI.

## MCP Tools

| Tool | Purpose |
| --- | --- |
| `sfeed_status` | Complete overview of auth, subscription, Pages, and schedule |
| `sfeed_auth_status` | Check authenticated platforms |
| `sfeed_pages` | List connected Page IDs and Instagram linkage |
| `sfeed_post` | Publish, schedule, or dry-run a post |
| `sfeed_schedule_status` | Queue counts, next scheduled posts, and recent failures |
| `sfeed_schedule_dashboard_url` | Signed browser URL for the hosted queue UI |
| `sfeed_schedule_preview_url` | Signed browser preview URL for one scheduled post |
| `sfeed_schedule_list` | List scheduled posts |
| `sfeed_schedule_reschedule` | Move a pending scheduled post |
| `sfeed_schedule_duplicate` | Copy a scheduled post into a new pending job |
| `sfeed_schedule_cancel` | Cancel a scheduled post |
| `sfeed_report_problem` | Send a user-approved problem report |

Only call `sfeed_report_problem` after the user asks to report a problem. Do not include tokens, auth codes, payment details, or private post content in reports.
