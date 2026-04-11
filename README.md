# sfeed Agent Skills

A collection of skills for AI agents that post to Facebook Pages and Instagram with `sfeed`.

`sfeed` is a CLI and MCP server for posting to Facebook Pages and Instagram with AI agents.

Most of the product lives at [sfeed.dev](https://sfeed.dev).

- Docs: [sfeed.dev/docs](https://sfeed.dev/docs)
- Install: [sfeed.dev/docs#install](https://sfeed.dev/docs#install)
- Pricing: [sfeed.dev/pricing](https://sfeed.dev/pricing)
- AI guide: [sfeed.dev/post-to-social-media-with-ai](https://sfeed.dev/post-to-social-media-with-ai)

## How to post to social media with AI

1. Install `sfeed`
2. Run `sfeed auth facebook`
3. Run `sfeed mcp`
4. Tell your agent to read your local files and use `sfeed` to publish

You can keep your posts, media, prompts, and schedules however you want on your own machine. Then you tell Claude, Codex, OpenCode, or another MCP client to use sfeed to publish them according to your rules.

If you only want to post to Instagram, the setup is still `sfeed auth facebook`. Meta requires a professional Instagram account linked to a Facebook Page for Instagram publishing access. After setup, you can still post only to Instagram.

## Local workflow

```text
social/
  rules.md
  queue/
    2026-04-15-launch.md
  media/
    launch-card.jpg
```

Your files stay local. Your agent reads them. `sfeed` handles auth, posting, scheduling, previews, and the hosted queue.

## Available Skills

### sfeed

The main posting and MCP workflow.

Use when:

- the user wants to post with `sfeed`
- the user wants to run `sfeed mcp`
- the user wants an agent to read local files and publish or schedule work
- the task spans Facebook, Instagram, and scheduling together

### facebook-posting

Facebook Page posting workflow.

Use when:

- the user wants to post to a Facebook Page
- the task involves Facebook-specific post shapes such as multi-image posts
- the user needs explicit page selection with `sfeed pages`

### instagram-posting

Instagram-specific publishing workflow.

Use when:

- the user wants to post to Instagram with `sfeed`
- the task depends on media requirements, carousels, or Reels behavior
- the user needs help with the professional-account and linked-Page requirement

### social-scheduling

Hosted queue and scheduling workflow.

Use when:

- the user wants to schedule posts for later
- the user wants previews, queue inspection, rescheduling, duplication, or canceling
- the task requires local timezone awareness

## Installation

```bash
npx skills add nem035/sfeed --list
```

Install all skills from this repo:

```bash
npx skills add nem035/sfeed
```

Install specific skills:

```bash
npx skills add nem035/sfeed --skill sfeed
npx skills add nem035/sfeed --skill facebook-posting
npx skills add nem035/sfeed --skill instagram-posting
npx skills add nem035/sfeed --skill social-scheduling
```

## Skill Structure

Each skill is in `skills/<name>/SKILL.md`.

Skills describe how to use `sfeed`, not how `sfeed` is deployed.

## Install

Use the install script:

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
```

Or install from npm:

```bash
npm install -g @sfeed/cli
```

Requires Node.js 20+.

## Quick start

```bash
sfeed auth facebook
sfeed mcp
```

That connects your accounts and starts the MCP server.

For Instagram posting, your Instagram account must be a professional account linked to a Facebook Page. Meta setup help:

- https://www.facebook.com/help/instagram/138925576505882
- https://www.facebook.com/help/1148909221857370

## Practical examples

```bash
sfeed doctor
sfeed pages

sfeed post "Launch day. v0.1.3 is live." \
  --to facebook \
  --page "Acme Robotics" \
  --media ./content/media/launch-card.jpg

sfeed post "Spring drop, 8 new pieces." \
  --to instagram \
  --page "Acme Robotics" \
  --media ./content/media/look-1.jpg,./content/media/look-2.jpg,./content/media/look-3.jpg

sfeed post "Tuesday product update" \
  --to facebook \
  --page "Acme Robotics" \
  --at "2026-04-15T13:00:00Z"

sfeed schedule status
sfeed schedule open
sfeed schedule preview <id>
sfeed schedule reschedule <id> --at "2026-04-11T13:00:00Z"
sfeed schedule duplicate <id>
sfeed schedule cancel <id>
```

Facebook supports text-only, single-image, multi-image, and single-video posts. Instagram supports single-image, single-video, and image-only carousels up to 10 items.

## MCP example

Claude Desktop config:

```json
{
  "mcpServers": {
    "sfeed": {
      "command": "sfeed",
      "args": ["mcp"]
    }
  }
}
```

Once connected, the agent can inspect status, choose the right Page, post immediately, schedule posts, and manage the queue.

Full MCP docs: [sfeed.dev/docs/mcp](https://sfeed.dev/docs/mcp)

## Start here

- [How to post to social media with AI](https://sfeed.dev/post-to-social-media-with-ai)
- [How to post to Facebook with AI](https://sfeed.dev/post-to-facebook-with-ai)
- [How to post to Instagram with AI](https://sfeed.dev/post-to-instagram-with-ai)
- [How to schedule social media posts with AI](https://sfeed.dev/schedule-social-media-posts-with-ai)
- [Local files social media workflow](https://sfeed.dev/local-files-social-media-workflow)

## Links

- Main site: [sfeed.dev](https://sfeed.dev)
- Docs: [sfeed.dev/docs](https://sfeed.dev/docs)
- MCP docs: [sfeed.dev/docs/mcp](https://sfeed.dev/docs/mcp)
- Scheduling docs: [sfeed.dev/docs/scheduling](https://sfeed.dev/docs/scheduling)
- Pricing: [sfeed.dev/pricing](https://sfeed.dev/pricing)
