# Local Files Social Workflow With sfeed

Use this skill when the user keeps drafts, media, and posting rules in local files and wants an agent to publish from that filesystem.

## Core idea

The user can organize posts however they want on their own machine.

Example:

```text
social/
  rules.md
  queue/
    2026-04-15-launch.md
    2026-04-16-behind-the-scenes.md
  media/
    launch-card.jpg
    bts-1.jpg
    bts-2.jpg
```

The agent reads those files, prepares the post, and uses `sfeed` to publish or schedule it.

## Setup

```bash
sfeed auth facebook
sfeed mcp
```

## Workflow

1. Read the user's local rules, drafts, and media references.
2. Turn that into a platform-specific post.
3. Use `sfeed` to post now or schedule later.
4. Inspect the queue if the user wants confirmation.

## Commands

```bash
sfeed post "shipping today" --to facebook
sfeed post "spring drop" --to instagram --media ./media/1.jpg,./media/2.jpg
sfeed post "tomorrow at 9" --to facebook --at "2026-04-15T13:00:00Z"
sfeed schedule list
```

## Why this workflow is useful

- the user's source material stays in local files
- the agent can follow the user's own folder structure
- `sfeed` handles auth, publishing, scheduling, and previews

## Docs

- https://sfeed.dev/local-files-social-media-workflow
- https://sfeed.dev/post-to-social-media-with-ai
