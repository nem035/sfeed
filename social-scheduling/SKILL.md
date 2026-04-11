# Social Scheduling With sfeed

Use this skill when the user wants to schedule Facebook or Instagram posts with `sfeed`.

## Setup check

```bash
sfeed doctor
```

Hosted scheduling requires an active subscription.

For Instagram scheduling, the Instagram account must be a professional account linked to a Facebook Page.

## Schedule a post

Facebook:

```bash
sfeed post "tomorrow at 9" --to facebook --at "2026-04-15T13:00:00Z"
```

Instagram:

```bash
sfeed post "launch image" --to instagram --media ./launch.jpg --at "2026-04-15T13:00:00Z"
```

If more than one Page is connected, include `--page <page-id>`.

## Inspect and manage the queue

```bash
sfeed schedule status
sfeed schedule list
sfeed schedule preview <id>
sfeed schedule open
sfeed schedule reschedule <id> --at "2026-04-16T13:00:00Z"
sfeed schedule duplicate <id>
sfeed schedule cancel <id>
```

## What the user can expect

- scheduled jobs are stored in the hosted queue
- previews are available before publish time
- queue commands show times in the user's local timezone

## Good agent behavior

- confirm the target time includes a timezone
- keep media files attached for Instagram scheduling
- use preview or queue inspection when the user wants to review upcoming posts

## Docs

- https://sfeed.dev/schedule-social-media-posts-with-ai
- https://sfeed.dev/docs/scheduling
