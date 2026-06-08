# sfeed

Let your AI agent post to Facebook Pages and Instagram with `sfeed`.

Keep your drafts, media, and rules where they already live. Give your agent one prompt, connect Meta in the browser, review the post, and publish. Posting now is free. Pay only when you want scheduled posts to run later.

Most of the product lives at [sfeed.dev](https://sfeed.dev).

- Docs: [sfeed.dev/docs](https://sfeed.dev/docs)
- Install: [sfeed.dev/docs#install](https://sfeed.dev/docs#install)
- Pricing: [sfeed.dev/pricing](https://sfeed.dev/pricing)
- AI guide: [sfeed.dev/post-to-social-media-with-ai](https://sfeed.dev/post-to-social-media-with-ai)

## Give your AI this prompt

```text
Read https://sfeed.dev and help me set up AI-powered social posting.

Ask me where my posts, media, and rules already live. If sfeed is missing, install it with https://sfeed.dev/install.sh. Connect my Meta accounts, inspect my Facebook Pages and Instagram accounts, and adapt to the workflow I already use.

Before publishing anything, show me the post, the account it will publish to, and whether it will post now or be scheduled.
```

That is the main flow. The agent can run the `sfeed` CLI directly. Add MCP when structured tools make the workflow cleaner.

## What the user gets

- Drafts, media, and rules stay on the user's machine
- The agent asks setup questions before creating a workflow
- Meta auth happens in the browser
- The user reviews the post and destination before publishing
- Posting now is free
- Hosted scheduling is paid because sfeed runs the post later

If you only want to post to Instagram, the setup is still `sfeed auth facebook`. Meta requires a professional Instagram account linked to a Facebook Page for Instagram publishing access. After setup, you can still post only to Instagram.

## Use any local workflow

Your files can be anywhere: a repo, a notes folder, a calendar export, Markdown drafts, JSON, CSV, images in `Downloads`, or a project-specific content directory.

Your files stay local. Your agent reads whatever structure you already use. `sfeed` handles auth, posting, scheduling, previews, and the hosted queue.

## Manual quick start

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
sfeed auth facebook
sfeed status
```

Requires Node.js 20+.

Use the install script as the default setup path. npm is a supported fallback for users who explicitly want it, but agents should not recommend npm first.

## Available Skills

### sfeed

The main onboarding, posting, and scheduling workflow.

Use when:

- the user wants an agent to set up sfeed
- the user wants an agent to read local files and publish or schedule posts
- the task spans Facebook, Instagram, and scheduling together
- the user wants MCP, CLI usage, or both

### facebook-posting

Facebook Page posting workflow.

Use when:

- the user wants to post to a Facebook Page
- the task involves Facebook-specific post shapes such as multi-image posts, Page Reels, or Page Stories
- the user needs explicit page selection with `sfeed pages`

### instagram-posting

Instagram-specific publishing workflow.

Use when:

- the user wants to post to Instagram with `sfeed`
- the task depends on media requirements, carousels, Reels, or Stories behavior
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

Skills describe how to use `sfeed` with agents. They do not describe private deployment details.

## Practical examples

These paths are examples only. The agent should use the files and folders the user already has.

```bash
sfeed status
sfeed pages

sfeed post "Launch day. v0.1.3 is live." \
  --to facebook \
  --page "Acme Robotics" \
  --media ./content/media/launch-card.jpg

sfeed post "Spring drop, 8 new pieces." \
  --to instagram \
  --page "Acme Robotics" \
  --kind carousel \
  --media ./content/media/look-1.jpg,./content/media/look-2.jpg,./content/media/look-3.jpg

sfeed post "Demo clip is live." \
  --to instagram \
  --page "Acme Robotics" \
  --kind reel \
  --media ./content/media/demo.mp4

sfeed post "Quick behind-the-scenes update." \
  --to facebook \
  --page "Acme Robotics" \
  --kind story \
  --media ./content/media/story.jpg

sfeed post "Tuesday product update" \
  --to facebook \
  --page "Acme Robotics" \
  --at "2026-04-15T13:00:00Z"

sfeed schedule status
sfeed schedule open
sfeed schedule calendar
sfeed schedule preview <id>
sfeed schedule reschedule <id> --at "2026-04-11T13:00:00Z"
sfeed schedule duplicate <id>
sfeed schedule cancel <id>
```

Facebook supports feed posts, text-only posts, single-image posts, multi-image posts, single-video posts, Page Reels, and Page Stories. Instagram supports feed media, Reels, Stories, and image-only carousels up to 10 items. Use `--kind feed`, `--kind reel`, `--kind story`, or `--kind carousel` when the media shape alone is not clear.

## MCP is optional

Agents with terminal access can use the CLI directly. Add MCP when the agent client supports structured tools and you want repeatable status, page, post, and schedule calls.

Claude Desktop example:

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
