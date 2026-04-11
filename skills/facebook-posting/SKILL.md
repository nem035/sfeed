---
name: facebook-posting
description: >-
  Use this skill when the user wants to publish or schedule Facebook Page posts
  with sfeed. Check that sfeed is installed, run sfeed doctor, use sfeed pages
  when more than one Page is connected, and handle Facebook post shapes such as
  text-only posts, single-image posts, multi-image posts, and single-video
  posts.
---

# Facebook Posting With sfeed

Use this skill when the task is specifically about posting to Facebook Pages with `sfeed`.

## Install and setup

1. Check `sfeed --version`
2. If needed, install `sfeed`
3. Run `sfeed doctor`
4. If Meta is not connected, run `sfeed auth facebook`

Important constraints:

- `sfeed` posts to Facebook Pages, not personal profiles
- if more than one Page is connected, make page choice explicit
- Facebook supports text-only, single-image, multi-image, and single-video posts

## Practical example: post a reviewed draft to a specific Page

User request:

> Read `./content/queue/2026-04-15-launch.md`, show me the Facebook copy first, then post it to the Acme Robotics page with `./content/media/launch-card.jpg`.

Useful command flow:

```bash
sfeed doctor
sfeed pages
sfeed post "Launch day. v0.1.3 is live." \
  --to facebook \
  --page "Acme Robotics" \
  --media ./content/media/launch-card.jpg
```

Agent behavior:

- read the local draft first
- ask for approval if the user expects review
- use `sfeed pages` before posting if page selection is ambiguous

## Practical example: post multiple images to Facebook

User request:

> Publish the restored Easter photos to the Made To Delight page as one Facebook post with all three images.

Useful command flow:

```bash
sfeed post "Found the Easter egg hunt photo from 1988. The restored set is live." \
  --to facebook \
  --page "Made To Delight" \
  --media ./content/media/restoration/1.jpg,./content/media/restoration/2.jpg,./content/media/restoration/3.jpg
```

## Practical example: schedule a Facebook Page update

User request:

> Schedule tomorrow's product update for 9am local time on the Acme Robotics page, then let me inspect the queue.

Useful command flow:

```bash
sfeed post "Tomorrow's product update" \
  --to facebook \
  --page "Acme Robotics" \
  --at "2026-04-15T13:00:00Z"

sfeed schedule status
sfeed schedule open
```

## References

- https://sfeed.dev/post-to-facebook-with-ai
- https://sfeed.dev/docs/posting
- https://sfeed.dev/docs/mcp
