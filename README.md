# @cup319/zcode

[ZCode](https://github.com/zai-org/ZCode)（Z.ai 官方 GLM Coding Agent Harness）的命令行版，打包为 **免安装依赖的单文件可执行程序**，通过 npm 分发，支持 **Linux x64** 和 **Windows x64**。

> 本包为 ZCode 官方开源（Apache-2.0）CLI 的第三方再分发，未修改任何源码。上游项目：https://github.com/zai-org/ZCode

## 安装

```sh
npm install -g @cup319/zcode
```

## 使用

```sh
# 进入 TUI 交互界面
zcode

# 单次提示（headless）
zcode -p "解释这个仓库的结构" --mode plan

# 查看版本与帮助
zcode --version
zcode --help

# 运行环境自检
zcode doctor
```

首次使用需要登录：在 TUI 里输入 `/login`（支持 Z.AI / BigModel 浏览器授权），或使用 API Key 环境变量：

```sh
export ZCODE_MODEL=zai/glm-5.3        # 格式必须为 provider/model
export ZCODE_BASE_URL=https://api.z.ai/api/anthropic
export ANTHROPIC_API_KEY=<你的 Z.ai API Key>
```

## 平台支持

| 平台 | 二进制 |
|---|---|
| Linux x64 (glibc) | `zcode-linux-x64` |
| Windows x64 | `zcode-windows-x64.exe` |

安装后由 `zcode` 命令按当前平台自动选择对应二进制启动（单文件内嵌 Node.js 运行时与 TUI 资源，无需系统安装 Node.js）。

## 说明

- 版本号跟随上游 CLI 版本（当前对应 CLI 0.16.9 / 仓库 v3.15.1）。
- 内嵌完整 TUI 资源、官方插件（visualize / documents / pdf / presentations / spreadsheets / browser-use 等）与 Playwright 运行时资产。
- 许可证：Apache-2.0（保留上游版权与第三方声明，见包内 LICENSE 与 THIRD-PARTY-NOTICES.md…随二进制分发）。
