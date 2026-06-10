---
name: sfeed
description: >-
  Use this skill when the user wants to post or schedule content on Facebook
  Pages or Instagram with sfeed, especially from local drafts, media files, or
  agent-driven workflows. Guide first-time setup, ask where posts and media
  already live, install sfeed if it is missing, connect Meta accounts with
  sfeed auth facebook, inspect Pages and Instagram accounts, and use the CLI or
  MCP tools to publish or schedule work after approval.
---

# sfeed

Use this skill when the task is onboarding, posting, scheduling, queue inspection, or MCP setup with `sfeed`.

Do not use this skill for generic copywriting, social strategy, or analytics unless the task also includes publishing with `sfeed`.

## Onboarding promise

The user should be able to say:

```text
Read https://sfeed.dev and help me set up AI-powered social posting.
```

Then the agent should ask the setup questions, install what is needed, connect Meta, inspect accounts, and show a post preview before publishing anything.

## First-run workflow

Before posting, discover the user's workflow:

1. Ask where posts, media, and rules already live
2. Ask whether they want Facebook, Instagram, or both
3. Ask whether they want to post now, schedule for later, or both
4. Ask whether every post should be shown for approval before publishing
5. Adapt to the user's existing files and only suggest a simple folder shape if they ask for one

Then check the machine and account state:

1. Run `sfeed --version`
2. If `sfeed` is missing, install it:

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
```

Use the install script by default. It installs a managed local `sfeed` command without touching global npm packages when a direct release is available for the machine. Use `npm install -g @sfeed/cli` only if the install script is blocked or the user explicitly asks for npm.

3. Run `sfeed status`
4. If Meta is not connected, run `sfeed auth facebook`
5. Run `sfeed pages` when page choice is ambiguous

Use the CLI directly by default. Add MCP only when the agent client supports structured tools and MCP improves the workflow.

If the agent supports installable plugins, prefer the sfeed plugin from this repo. The plugin bundles this skill and the local `sfeed mcp` server entry. The user still needs `sfeed` installed locally and authenticated with `sfeed auth facebook`.

## Important constraints

- Facebook posting goes to Facebook Pages, not personal profiles
- If more than one Page is connected, use `sfeed pages` and make page choice explicit
- Instagram posting requires a professional Instagram account linked to a Facebook Page
- Instagram requires media, text-only Instagram posts do not work
- Facebook supports feed posts, text-only posts, single-image posts, multi-image posts, single-video posts, Page Reels, and Page Stories
- Instagram supports feed media, Reels, Stories, and image-only carousels up to 10 items
- Use `--kind feed`, `--kind reel`, `--kind story`, or `--kind carousel` when the media shape alone is not clear

## Default workflow

1. Inspect setup with `sfeed status`
2. Inspect Pages with `sfeed pages` when needed
3. Read the user's local drafts, media, and rules
4. Show the final content, media, destination account, and timing
5. Ask for approval before publishing unless the user already gave explicit approval
6. Post now with `sfeed post ...` or schedule with `--at`
7. If scheduled, inspect the queue with `sfeed schedule status` or `sfeed schedule open`

## Practical example: post from a local draft folder

The paths below are examples only. Use the user's actual files and folders.

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
- ask for approval before posting
- select the page explicitly when more than one Page is connected

## Practical example: use sfeed through MCP when helpful

User request:

> Start the posting tool for Claude Code, inspect my connected Pages, draft an Instagram caption for `./assets/drop-1.jpg`, ask me to approve it, then post it.

Useful command flow:

```bash
sfeed status
sfeed mcp
```

After MCP is configured, the agent should:

1. check `sfeed_status`
2. call `sfeed_pages` if more than one Page is connected
3. confirm the Instagram account is available on the chosen Page
4. show the caption draft
5. call `sfeed_post` with `dry_run: true` when validation is useful
6. call `sfeed_post` with the local media path after approval

For Reels, Stories, or carousels, pass the explicit `kind` field to `sfeed_post`.

CLI examples:

```bash
sfeed post "Demo clip is live." --to instagram --kind reel --media ./assets/demo.mp4
sfeed post "Quick update." --to facebook --kind story --media ./assets/story.jpg
```

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

## Pricing behavior

- Posting now is free
- MCP usage is free
- Hosted scheduling is paid because sfeed keeps and runs the scheduled post later

## References

- https://sfeed.dev/docs
- https://sfeed.dev/docs/mcp
- https://sfeed.dev/post-to-social-media-with-ai
