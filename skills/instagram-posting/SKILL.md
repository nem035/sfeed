---
name: instagram-posting
description: >-
  Use this skill when the user wants to publish or schedule Instagram posts with
  sfeed. Check that sfeed is installed, verify that the Instagram account is a
  professional account linked to a Facebook Page, ensure media is present, and
  handle Instagram-specific post shapes such as single-image posts, single-video
  posts, and image-only carousels.
---

# Instagram Posting With sfeed

Use this skill when the task is specifically about Instagram publishing with `sfeed`.

## Install and setup

1. Check `sfeed --version`
2. If needed, install `sfeed`
3. Run `sfeed doctor`
4. If Instagram is not available yet, run `sfeed auth facebook`

For Instagram posting with `sfeed`, the account must be:

- a professional Instagram account
- linked to a Facebook Page

Meta setup help:

- https://www.facebook.com/help/instagram/138925576505882
- https://www.facebook.com/help/1148909221857370
- https://www.facebook.com/help/570895513091465

## Instagram-specific constraints

- Instagram requires media
- text-only Instagram posts do not work
- carousels must be image-only
- carousels support up to 10 items
- single feed videos publish as Reels

## Practical example: review and post a launch image

User request:

> Read `./social/queue/2026-04-15-launch.md`, use `./social/media/launch-card.jpg`, show me the caption first, then post it to Instagram on the Lound page.

Useful command flow:

```bash
sfeed doctor
sfeed pages
sfeed post "Launch day. v0.1.3 is live." \
  --to instagram \
  --page "Lound" \
  --media ./social/media/launch-card.jpg
```

## Practical example: post a carousel from local media

User request:

> Post the three before-and-after images in `./content/media/restoration/` as one Instagram carousel, and keep the caption under 120 words.

Useful command flow:

```bash
sfeed post "Found the Easter egg hunt photo from 1988. The color work is live." \
  --to instagram \
  --page "Made To Delight" \
  --media ./content/media/restoration/1.jpg,./content/media/restoration/2.jpg,./content/media/restoration/3.jpg
```

Agent behavior:

- check that every carousel item is an image
- keep the caption and media selection visible for approval if the user expects review
- fail early if the chosen Page has no linked Instagram account

## Practical example: schedule an Instagram post

User request:

> Schedule this teaser video for next Tuesday at 9:30am Eastern and then show me the preview link.

Useful command flow:

```bash
sfeed post "Teaser drop next week." \
  --to instagram \
  --page "Lound" \
  --media ./assets/teaser.mp4 \
  --at "2026-04-21T13:30:00Z"
```

After scheduling, inspect with:

```bash
sfeed schedule status
sfeed schedule preview <id>
```

## References

- https://sfeed.dev/post-to-instagram-with-ai
- https://sfeed.dev/docs/posting
