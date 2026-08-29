import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const readJson = (path) => JSON.parse(readFileSync(join(root, path), "utf8"));
const readText = (path) => readFileSync(join(root, path), "utf8");

const packageJson = readJson("package.json");
const claudeManifest = readJson("plugins/sfeed/.claude-plugin/plugin.json");
const codexManifest = readJson("plugins/sfeed/.codex-plugin/plugin.json");
const claudeMarketplace = readJson(".claude-plugin/marketplace.json");
const codexMarketplace = readJson(".agents/plugins/marketplace.json");
const claudeMcp = readJson("plugins/sfeed/.mcp.json");
const goldenPrompts = readJson("evals/golden-prompts.json");

assert.equal(claudeManifest.version, packageJson.version, "Claude plugin version must match package.json");
assert.equal(codexManifest.version, packageJson.version, "Codex plugin version must match package.json");
assert.equal(claudeManifest.name, "sfeed");
assert.equal(codexManifest.name, "sfeed");
assert.equal(claudeMarketplace.plugins[0]?.name, "sfeed");
assert.equal(claudeMarketplace.plugins[0]?.source, "./plugins/sfeed");
assert.equal(codexMarketplace.plugins[0]?.name, "sfeed");
assert.equal(codexMarketplace.plugins[0]?.source?.path, "./plugins/sfeed");

for (const manifestPath of [
  claudeManifest.skills,
  claudeManifest.mcpServers,
  codexManifest.skills,
  codexManifest.interface.composerIcon,
  codexManifest.interface.logo,
]) {
  const target = join(root, "plugins/sfeed", manifestPath);
  assert.ok(existsSync(target), `Manifest path does not exist: ${manifestPath}`);
}

assert.ok(claudeMcp.mcpServers?.sfeed, "Claude MCP config must use the mcpServers wrapper");
assert.ok(codexManifest.mcpServers?.sfeed, "Codex manifest must use an inline direct server map");
assert.equal(codexManifest.mcpServers.sfeed.command, "sfeed");
assert.deepEqual(codexManifest.mcpServers.sfeed.args, ["mcp"]);

const standaloneSkill = readText("skills/sfeed/SKILL.md");
const pluginSkill = readText("plugins/sfeed/skills/sfeed/SKILL.md");
assert.equal(pluginSkill, standaloneSkill, "The standalone and plugin sfeed skills must stay identical");
assert.match(standaloneSkill, /^---\nname: sfeed\ndescription:/);
assert.match(standaloneSkill, /Do not\s+use/);

const categories = new Set(goldenPrompts.cases.map((testCase) => testCase.category));
assert.deepEqual(categories, new Set(["direct", "indirect", "negative"]));
assert.ok(goldenPrompts.cases.some((testCase) => testCase.expected === "activate"));
assert.ok(goldenPrompts.cases.some((testCase) => testCase.expected === "do_not_activate"));
assert.equal(new Set(goldenPrompts.cases.map((testCase) => testCase.id)).size, goldenPrompts.cases.length);

for (const textPath of [
  "README.md",
  ".claude-plugin/marketplace.json",
  "plugins/sfeed/.claude-plugin/plugin.json",
  "plugins/sfeed/.codex-plugin/plugin.json",
]) {
  assert.doesNotMatch(readText(textPath), /0\.2\.2/, `Stale version in ${textPath}`);
}

console.log(`sfeed extension release ${packageJson.version} is structurally valid`);
