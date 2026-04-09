# sfeed

Post to Facebook Pages and Instagram from the terminal or through MCP.

sfeed is a CLI for people who want to automate social posting, and an MCP server for agents that need to do the same work safely.

Most of the product lives at [sfeed.dev](https://sfeed.dev).

- Docs: [sfeed.dev/docs](https://sfeed.dev/docs)
- Install: [sfeed.dev/install.sh](https://sfeed.dev/install.sh)
- Pricing: [sfeed.dev/pricing](https://sfeed.dev/pricing)

## What it does

- Connect Facebook Pages and linked Instagram accounts with one browser auth flow
- Post now from the terminal
- Schedule posts for later, even when your laptop is closed
- Open browser previews for scheduled posts
- Expose MCP tools so agents can inspect status, schedule work, and manage the queue

## Agent-first workflow

sfeed is built to be driven by an agent.

Run `sfeed mcp`, connect it to Claude, Codex, OpenCode, or any MCP client, and the agent can:

- check connected accounts
- inspect page choices
- create immediate posts
- schedule posts
- open the hosted queue UI
- open a hosted preview for one scheduled post
- reschedule, duplicate, or cancel queued jobs

```mermaid
flowchart LR
  User[User] --> Agent[AI agent]
  Agent --> MCP[sfeed MCP server]
  MCP --> CLI[sfeed CLI]
  CLI --> Meta[Facebook and Instagram]
  CLI --> Hosted[Hosted scheduling and previews]
```

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
sfeed post "tomorrow at 9" --to facebook --at "2026-04-10T13:00:00Z"

sfeed schedule status
sfeed schedule open
sfeed schedule preview <id>
sfeed schedule reschedule <id> --at "2026-04-11T13:00:00Z"
sfeed schedule duplicate <id>
sfeed schedule cancel <id>
```

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

Useful MCP tools:

- `sfeed_status`
- `sfeed_pages`
- `sfeed_post`
- `sfeed_schedule_status`
- `sfeed_schedule_dashboard_url`
- `sfeed_schedule_preview_url`
- `sfeed_schedule_list`
- `sfeed_schedule_reschedule`
- `sfeed_schedule_duplicate`
- `sfeed_schedule_cancel`

## How scheduling works

When you schedule a post, sfeed stores the job in the hosted queue and publishes it when it becomes due.

You can inspect that queue in three ways:

- `sfeed schedule status` for a terminal summary
- `sfeed schedule open` for the full hosted queue UI
- `sfeed schedule preview <id>` for a browser preview of one job

```mermaid
sequenceDiagram
  participant User
  participant Agent
  participant sfeed
  participant Queue as Hosted queue
  participant Meta

  User->>Agent: Schedule this post for tomorrow
  Agent->>sfeed: sfeed_post or schedule tool
  sfeed->>Queue: Store pending job
  Agent->>sfeed: Open preview or queue UI
  Queue->>Meta: Publish when due
```

## Current platforms

- Facebook Pages
- Instagram Business or Creator accounts linked to a Facebook Page

## Links

- Main site: [sfeed.dev](https://sfeed.dev)
- Docs: [sfeed.dev/docs](https://sfeed.dev/docs)
- MCP docs: [sfeed.dev/docs/mcp](https://sfeed.dev/docs/mcp)
- Scheduling docs: [sfeed.dev/docs/scheduling](https://sfeed.dev/docs/scheduling)
- Pricing: [sfeed.dev/pricing](https://sfeed.dev/pricing)
