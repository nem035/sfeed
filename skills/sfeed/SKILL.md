---
name: sfeed
description: >-
  Use this skill when the user wants to post or schedule content on Facebook
  Pages or Instagram with sfeed, especially from local drafts, media files, or
  MCP workflows. Install sfeed if it is missing, run sfeed status, connect Meta
  accounts with sfeed auth facebook, use sfeed pages when more than one Page is
  connected, and use sfeed post or queue commands to publish or schedule work.
---

# sfeed

Use this skill when the task is actual posting, scheduling, queue inspection, or MCP setup with `sfeed`.

Do not use this skill for generic copywriting, social strategy, or analytics unless the task also includes publishing with `sfeed`.

## Install and setup

Before doing anything else:

1. Check whether `sfeed` is installed: `sfeed --version`
2. If it is missing, install it:

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
```

or

```bash
npm install -g @sfeed/cli
```

3. Run `sfeed status`
4. If Meta is not connected, run `sfeed auth facebook`
5. If the task will be handled through an agent client, run `sfeed mcp`

## Important constraints

- Facebook posting goes to Facebook Pages, not personal profiles
- If more than one Page is connected, use `sfeed pages` and make page choice explicit
- Instagram posting requires a professional Instagram account linked to a Facebook Page
- Instagram requires media, text-only Instagram posts do not work
- Facebook supports text-only, single-image, multi-image, and single-video posts
- Instagram supports single-image, single-video, and image-only carousels up to 10 items

## Default workflow

1. Inspect setup with `sfeed status`
2. If more than one Page is connected, run `sfeed pages`
3. Read the user's local drafts and media files
4. Draft or confirm the final post content
5. Post now with `sfeed post ...` or schedule it with `--at`
6. If scheduled, inspect the queue with `sfeed schedule status` or `sfeed schedule open`

## Practical example: post from a local draft folder

User request:

> Read `./content/rules.md` and `./content/queue/2026-04-15-launch.md`, show me the Facebook post first, then publish it to the Acme Robotics page with `./content/media/launch-card.jpg`.

Useful command flow:

```bash
sfeed status
sfeed pages
sfeed post "Launch day. v0.1.3 is live." \
  --to facebook \
  --page "Acme Robotics" \
  --media ./content/media/launch-card.jpg
```

Agent behavior:

- read the draft and rules first
- ask for approval before posting if the user expects review
- select the page explicitly when more than one Page is connected

## Practical example: use sfeed through MCP

User request:

> Start the posting tool for Claude Code, inspect my connected Pages, draft an Instagram caption for `./assets/drop-1.jpg`, ask me to approve it, then post it.

Useful command flow:

```bash
sfeed status
sfeed mcp
```

After the MCP server is running, the agent should:

1. check `sfeed_status`
2. call `sfeed_pages` if more than one Page is connected
3. confirm the Instagram account is available on the chosen Page
4. show the caption draft
5. call `sfeed_post` with the local media path after approval

## Practical example: schedule and review

User request:

> Schedule tomorrow's update for 9am local time, then show me the queue and open the preview.

Useful command flow:

```bash
sfeed post "Tomorrow's shipping update" \
  --to facebook \
  --page "Acme Robotics" \
  --at "2026-04-15T13:00:00Z"

sfeed schedule status
sfeed schedule open
sfeed schedule calendar
```

Use `sfeed dashboard` or `sfeed calendar` as shortcuts for opening the hosted queue UI.

## References

- https://sfeed.dev/docs
- https://sfeed.dev/docs/mcp
- https://sfeed.dev/post-to-social-media-with-ai
