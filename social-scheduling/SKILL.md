---
name: social-scheduling
description: >-
  Use this skill when the user wants to schedule, inspect, preview, reschedule,
  duplicate, or cancel social posts with sfeed. Verify that sfeed is installed,
  run sfeed doctor, confirm hosted scheduling is available, and manage the queue
  with the schedule commands while keeping timezone handling and Instagram media
  requirements explicit.
---

# Social Scheduling With sfeed

Use this skill when the task is queue management or scheduled publishing with `sfeed`.

## Install and setup

1. Check `sfeed --version`
2. If needed, install `sfeed`
3. Run `sfeed doctor`
4. Confirm hosted scheduling is available

Important setup notes:

- hosted scheduling requires an active subscription
- queue commands show times in the user's local timezone
- Instagram scheduling still requires a professional Instagram account linked to a Facebook Page
- Instagram scheduling requires media

## Core commands

```bash
sfeed schedule status
sfeed schedule list
sfeed schedule preview <id>
sfeed schedule open
sfeed schedule reschedule <id> --at "2026-04-16T13:00:00Z"
sfeed schedule duplicate <id>
sfeed schedule cancel <id>
```

## Practical example: schedule a Facebook update and review the queue

User request:

> Schedule tomorrow's product update for 9am local time, then show me what is queued next.

Useful command flow:

```bash
sfeed post "Tomorrow's product update" \
  --to facebook \
  --page "Acme Robotics" \
  --at "2026-04-15T13:00:00Z"

sfeed schedule status
sfeed schedule list
```

## Practical example: schedule an Instagram asset review

User request:

> Queue `./assets/teaser.jpg` for Instagram on Friday at 2pm, then open the preview so I can sanity-check the post before it goes live.

Useful command flow:

```bash
sfeed post "Friday teaser." \
  --to instagram \
  --page "Lound" \
  --media ./assets/teaser.jpg \
  --at "2026-04-17T18:00:00Z"

sfeed schedule preview <id>
```

## Practical example: adjust a scheduled campaign

User request:

> Duplicate last Tuesday's scheduled post, move the copy to next Tuesday, and cancel the old placeholder job.

Useful command flow:

```bash
sfeed schedule list
sfeed schedule duplicate <id> --at "2026-04-21T13:00:00Z"
sfeed schedule cancel <old-id>
```

## Agent behavior

- make the target timezone explicit before scheduling
- keep page choice explicit when more than one Page is connected
- inspect the queue before mutating it when the user references an older job by description rather than exact ID
- open previews when the user wants a final visual check

## References

- https://sfeed.dev/schedule-social-media-posts-with-ai
- https://sfeed.dev/docs/scheduling
