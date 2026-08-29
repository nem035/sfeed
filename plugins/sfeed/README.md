# sfeed plugin 0.3.5

This plugin gives Codex and Claude a shared sfeed skill plus an MCP server entry for `sfeed mcp`.

Users still need the local sfeed CLI and Meta auth state:

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
sfeed auth facebook connect
sfeed auth instagram connect
sfeed destinations
```

Run only the connection command for each platform the user wants. Facebook
connects selected Pages. Instagram connects a professional Business or Creator
account directly without requiring a Facebook Page.

The plugin MCP server starts with:

```bash
sfeed mcp
```

Use the skill when an agent needs to check account status, list publishing
destinations, draft a post, validate media with `dry_run`, publish now, schedule
for later, inspect the hosted queue, or report a user-approved problem.

Read-only checks and dry runs are safe to perform immediately. The skill
requires a destination-specific preview and user approval before publishing,
scheduling, editing, deleting, revoking, or reporting.

The Claude manifest uses `.mcp.json`. The Codex manifest declares the same
server inline because the two plugin hosts currently expect different MCP
configuration envelopes.
