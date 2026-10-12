#!/usr/bin/env node
// zcode 启动器：定位当前平台对应的 SEA 单文件可执行并 spawn。
// 包目录内含 zcode-linux-x64 与 zcode-windows-x64.exe 两个二进制。
import { existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { spawnSync } from "node:child_process";

const pkgDir = dirname(fileURLToPath(import.meta.url));

const candidates =
  process.platform === "win32"
    ? [join(pkgDir, "zcode-windows-x64.exe")]
    : process.platform === "linux" && process.arch === "x64"
      ? [join(pkgDir, "zcode-linux-x64")]
      : [];

const binary = candidates.find((p) => existsSync(p));

if (!binary) {
  console.error(
    `zcode: unsupported platform ${process.platform}-${process.arch} or missing binary.\n` +
      `Supported: linux-x64, win-x64. Reinstall with: npm install -g @cup319/zcode`,
  );
  process.exit(1);
}

if (process.platform !== "win32") {
  // npm 有时不保留可执行位，兜底补一次
  try {
    const { chmodSync } = await import("node:fs");
    const { statSync } = await import("node:fs");
    if (!(statSync(binary).mode & 0o111)) chmodSync(binary, 0o755);
  } catch {}
}

const result = spawnSync(binary, process.argv.slice(2), {
  stdio: "inherit",
  windowsHide: true,
});
if (result.error) {
  console.error(`zcode: failed to launch: ${result.error.message}`);
  process.exit(1);
}
process.exit(result.status ?? 1);
