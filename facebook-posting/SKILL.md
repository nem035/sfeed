# Facebook Posting With sfeed

Use this skill when the user wants to post to a Facebook Page with `sfeed`.

## Setup check

```bash
sfeed doctor
```

If needed:

```bash
sfeed auth facebook
```

## Facebook support

`sfeed` posts to Facebook Pages. It does not post to personal profiles.

Supported Facebook post shapes:

- text-only posts
- single-image posts
- multi-image posts
- single-video posts

## Commands

Text post:

```bash
sfeed post "shipping today" --to facebook
```

Single image:

```bash
sfeed post "launch image" --to facebook --media ./launch.jpg
```

Multiple images:

```bash
sfeed post "event photos" --to facebook --media ./1.jpg,./2.jpg,./3.jpg
```

Schedule a Facebook post:

```bash
sfeed post "tomorrow at 9" --to facebook --at "2026-04-15T13:00:00Z"
```

## When more than one Page is connected

List Pages first:

```bash
sfeed pages
```

Then choose one:

```bash
sfeed post "launch update" --to facebook --page <page-id>
```

## Docs

- https://sfeed.dev/post-to-facebook-with-ai
- https://sfeed.dev/docs
