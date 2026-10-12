# zcode-cli-npm

追踪 [zai-org/ZCode](https://github.com/zai-org/ZCode)（Z.ai 官方 GLM Coding Agent Harness）的上游更新，自动构建 Linux / Windows 单文件可执行程序，并发布到 npm 包 **[@cup319/zcode](https://www.npmjs.com/package/@cup319/zcode)**。

> 本仓库是 ZCode CLI 的第三方自动再分发管道（Apache-2.0），不修改任何上游源码。

## 工作原理

```
zai-org/ZCode (main)                    每 30 分钟轮询 (GitHub Actions)
        │
        ▼ 有新 commit？
   .last-upstream-sha 对比
        │ 不同 → 触发构建
        ▼
   pnpm install + 构建 CLI workspace
        │
        ▼
   SEA 单文件打包（交叉编译）
   ├─ zcode-linux-x64      (~272 MB)
   └─ zcode-windows-x64.exe (~217 MB)
        │
        ▼
   npm publish @cup319/zcode  +  GitHub Release（附二进制与 sha256）
```

- 版本号取自上游 `apps/zcode-cli/package.json` 的 `version`。
- 上游没动则跳过；同版本号被 force 重发时自动 +1 补丁位。
- 每次发布会在本仓库留一条 `.last-upstream-sha` 提交，可追溯对应的上游 commit。

## 手动触发

Actions → **Poll upstream ZCode and publish** → Run workflow：

| 输入 | 说明 |
|---|---|
| `upstream_ref` | 指定上游 commit/tag，留空用最新 main |
| `force` | `true` 时即使版本号相同也重新发布 |

## 仓库结构

```
.github/workflows/poll-upstream.yml   # 轮询 + 构建 + 发布流水线
run.js                                 # npm 包启动器（按平台选二进制并 spawn）
package.json                           # @cup319/zcode 包定义
.last-upstream-sha                     # 最近一次发布的上游 commit 指针
```

## Secrets

| 名称 | 用途 |
|---|---|
| `NPM_TOKEN` | 发布 @cup319/zcode 到 npmjs |
| `UPSTREAM_TOKEN` | 克隆上游 / 创建 Release（需 repo 权限的 PAT） |
