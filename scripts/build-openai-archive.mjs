import { cpSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const packageJson = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
const source = join(root, "plugins/sfeed");
const dist = join(root, "dist");
const staging = join(dist, ".openai-staging");
const pluginRoot = join(staging, "sfeed");
const archive = join(dist, `sfeed-openai-skills-only-${packageJson.version}.zip`);

rmSync(staging, { recursive: true, force: true });
rmSync(archive, { force: true });
mkdirSync(join(pluginRoot, ".claude-plugin"), { recursive: true });

const manifest = JSON.parse(
  readFileSync(join(source, ".claude-plugin/plugin.json"), "utf8"),
);
delete manifest.mcpServers;
manifest.description =
  "Guide an agent with local shell access through reviewed Facebook Page and Instagram publishing with sfeed.";

writeFileSync(
  join(pluginRoot, ".claude-plugin/plugin.json"),
  `${JSON.stringify(manifest, null, 2)}\n`,
);
cpSync(join(source, "skills"), join(pluginRoot, "skills"), { recursive: true });
cpSync(join(source, "assets"), join(pluginRoot, "assets"), { recursive: true });
cpSync(join(source, "README.md"), join(pluginRoot, "README.md"));
cpSync(join(root, "LICENSE"), join(pluginRoot, "LICENSE"));

const zip = spawnSync("zip", ["-qr", archive, "sfeed"], {
  cwd: staging,
  encoding: "utf8",
});
if (zip.status !== 0) {
  throw new Error(zip.stderr || zip.stdout || "zip failed");
}

rmSync(staging, { recursive: true, force: true });
console.log(archive);
