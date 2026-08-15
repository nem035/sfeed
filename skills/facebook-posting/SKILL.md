---
name: facebook-posting
description: >-
  Use this skill when the user wants to publish or schedule Facebook Page posts
  with sfeed. Check that sfeed is installed, run sfeed status, use sfeed destinations
  when more than one Page is connected, ask where drafts and media already
  live, show the post and destination before publishing, and handle Facebook
  post shapes such as text-only posts, single-image posts, multi-image posts,
  single-video posts, Page Reels, and Page Stories.
---

# Facebook Posting With sfeed

Use this skill when the task is specifically about posting to Facebook Pages with `sfeed`.

## Install and setup

1. Ask where the user's Facebook drafts, media, and posting rules already live
2. Check `sfeed --version`
3. If needed, install `sfeed` with `curl -fsSL https://sfeed.dev/install.sh | sh`
4. Run `sfeed status`
5. If Facebook is not connected, run `sfeed auth facebook connect`
6. Run `sfeed destinations` when Page choice is ambiguous

Important constraints:

- `sfeed` posts to Facebook Pages, not personal profiles
- if more than one Page is connected, make page choice explicit
- Facebook supports feed posts, text-only posts, single-image posts, multi-image posts, single-video posts, Page Reels, and Page Stories
- Use `--kind reel` for Page Reels and `--kind story` for Page Stories
- posting now is free, hosted scheduling is paid

## Practical example: post a reviewed draft to a specific Page

The paths below are examples only. Use the user's actual files and folders.

User request:

> Read `./content/queue/2026-04-15-launch.md`, show me the Facebook copy first, then post it to the Acme Robotics page with `./content/media/launch-card.jpg`.

Useful command flow:

```bash
sfeed status
sfeed destinations
sfeed post "Launch day. v0.1.3 is live." \
  --to facebook \
  --page "Acme Robotics" \
  --media ./content/media/launch-card.jpg
```

Agent behavior:

- read the local draft first
- show the final copy, media, and Page before publishing
- ask for approval before posting
- use `sfeed destinations` before posting if Page selection is ambiguous

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

## Practical example: post a Facebook Page Reel or Story

User request:

> Publish this product demo as a Facebook Reel on the Acme Robotics page.

Useful command flow:

```bash
sfeed post "New product demo is live." \
  --to facebook \
  --page "Acme Robotics" \
  --kind reel \
  --media ./content/media/demo.mp4
```

For Page Stories, use exactly one image or video:

```bash
sfeed post "Behind the scenes today." \
  --to facebook \
  --page "Acme Robotics" \
  --kind story \
  --media ./content/media/story.jpg
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
sfeed schedule calendar
```

## References

- https://sfeed.dev/post-to-facebook-with-ai
- https://sfeed.dev/docs/posting
- https://sfeed.dev/docs/mcp
