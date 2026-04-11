# Social Posting With sfeed

Use this skill when the user wants to post or schedule content on Facebook Pages or Instagram with `sfeed`.

## What sfeed does

`sfeed` connects social accounts, starts an MCP server for AI agents, posts immediately, and schedules posts for later.

It works well when the user already has a local workflow for drafts, media, prompts, or review notes.

## Setup check

Start here:

```bash
sfeed doctor
```

If Facebook is not connected:

```bash
sfeed auth facebook
```

If the user wants agent access:

```bash
sfeed mcp
```

## Default workflow

1. Read the user's local post files and media files.
2. Draft the post content from those files.
3. Check connected Pages if the account has more than one Page.
4. Post now or schedule it.

## Useful commands

Post now:

```bash
sfeed post "shipping today" --to facebook
sfeed post "new feature" --to instagram --media ./launch.jpg
```

Schedule for later:

```bash
sfeed post "tomorrow at 9" --to facebook --at "2026-04-15T13:00:00Z"
```

Choose a specific Page:

```bash
sfeed pages
sfeed post "launch update" --to facebook --page <page-id>
```

## Supported post shapes

- Facebook: text-only, single-image, multi-image, single-video
- Instagram: single-image, single-video, image-only carousels up to 10 items

## Good agent behavior

- Read the user's local files first
- Show the draft before posting if review is expected
- Use `sfeed pages` when more than one Page is connected
- Use scheduling when the user gives a publish time

## Docs

- https://sfeed.dev/post-to-social-media-with-ai
- https://sfeed.dev/docs
- https://sfeed.dev/docs/mcp
