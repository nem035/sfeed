# Instagram Posting With sfeed

Use this skill when the user wants to post to Instagram with `sfeed`.

## Setup check

```bash
sfeed doctor
```

If Instagram is not available yet, connect Facebook first:

```bash
sfeed auth facebook
```

For Instagram posting with `sfeed`, the account must be:

- a professional Instagram account
- linked to a Facebook Page

Meta setup help:

- https://www.facebook.com/help/instagram/138925576505882
- https://www.facebook.com/help/1148909221857370

## Instagram support

Instagram requires media. Text-only posts are not supported.

Supported Instagram post shapes:

- single-image posts
- single-video posts
- image-only carousels up to 10 items

Single feed videos publish as Reels.

## Commands

Single image:

```bash
sfeed post "launch image" --to instagram --media ./launch.jpg
```

Video:

```bash
sfeed post "feature video" --to instagram --media ./demo.mp4
```

Carousel:

```bash
sfeed post "spring drop" --to instagram --media ./1.jpg,./2.jpg,./3.jpg
```

Schedule:

```bash
sfeed post "tomorrow at 9" --to instagram --media ./launch.jpg --at "2026-04-15T13:00:00Z"
```

## Good agent behavior

- Check that media files exist before posting
- Do not try text-only Instagram posts
- Use a carousel only when all media items are images
- If Instagram is missing, tell the user to switch to a professional account and link it to a Facebook Page first

## Docs

- https://sfeed.dev/post-to-instagram-with-ai
- https://sfeed.dev/docs
