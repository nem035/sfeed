# sfeed plugin

This plugin gives Codex and Claude a shared sfeed skill plus an MCP server entry for `sfeed mcp`.

Users still need the local sfeed CLI and Meta auth state:

```bash
curl -fsSL https://sfeed.dev/install.sh | sh
sfeed auth facebook
```

The plugin MCP server starts with:

```bash
sfeed mcp
```

Use the skill when an agent needs to check account status, list Pages, draft a post, validate media with `dry_run`, publish now, schedule for later, inspect the hosted queue, or report a user-approved problem.
