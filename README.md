# sfeed

Post to social media with AI agents.

sfeed is a CLI and MCP server for posting to Facebook Pages and Instagram with AI agents.

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

## CLI examples

```bash
sfeed post "shipping today" --to facebook
sfeed post "launch image" --to instagram --media ./launch.jpg
sfeed post "launch carousel" --to instagram --media ./1.jpg,./2.jpg,./3.jpg
sfeed post "event photos" --to facebook --media ./1.jpg,./2.jpg,./3.jpg
sfeed post "tomorrow at 9" --to facebook --at "2026-04-10T13:00:00Z"

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
