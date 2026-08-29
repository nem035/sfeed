import assert from "node:assert/strict";
import { existsSync, readFileSync, rmSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import test from "node:test";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const version = JSON.parse(readFileSync(join(root, "package.json"), "utf8")).version;
const archive = join(root, "dist", `sfeed-openai-skills-only-${version}.zip`);

function run(command, args) {
  const result = spawnSync(command, args, { cwd: root, encoding: "utf8" });
  assert.equal(result.status, 0, result.stderr || result.stdout);
  return result.stdout;
}

test("release metadata and paths are consistent", () => {
  run(process.execPath, ["scripts/validate-release.mjs"]);
});

test("OpenAI archive is skills-only and self-contained", () => {
  rmSync(archive, { force: true });
  run(process.execPath, ["scripts/build-openai-archive.mjs"]);
  assert.ok(existsSync(archive));

  const entries = run("unzip", ["-Z1", archive]).trim().split("\n");
  assert.ok(entries.includes("sfeed/.claude-plugin/plugin.json"));
  assert.ok(entries.includes("sfeed/skills/sfeed/SKILL.md"));
  assert.ok(entries.includes("sfeed/LICENSE"));
  assert.ok(entries.every((entry) => !entry.endsWith(".mcp.json")));
  assert.ok(entries.every((entry) => !entry.includes(".codex-plugin")));
});
