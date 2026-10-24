---
date: 2026-10-13
icon: brands/signal-messenger
category:
  - 评价
tag:
  - 横评
  - 工具
  - 桌面端
---

# Agent 工具横评

2026 年是 agent 元年，LLM + agent 继续高速发展，几乎彻底改变了代码的编写方式。

这里是我使用过的 agent 的一些评价。本文仅包含 agent 工具，不包含 LLM 模型的评价。按照本人的首次使用时间顺序排序。

## cursor

cursor 是各个 agent 的元老。2025 年我的毕设有 cursor 一大功劳。

2025 年白嫖 cursor 实在是太爽了，每个新邮箱都可以白嫖 14 天；于是从邮箱号池到自己域名随便开邮箱，从清除 computer id 到锁定 cursor 版本，白嫖 cursor 永不停息。当然后面封禁强度也上来了，就渐渐不用了。

cursor 刚开始确实是有点东西的，有独家的 diff apply 模型、code embedding 模型来尽力提升 agent 任务完成率，当时绝对是顶尖的 agent 工具。然而现在随着 agent 能力发展，这些模型已经退出历史舞台，cursor 也被 SpaceX 收购，成为了只做模型中转的路边一条了。属于 cursor 的辉煌时代已经结束了。

::: 一些过时的 cursor 使用心得

[Cursor](https://www.cursor.com/pricing) 是 AI 时代下的，基于 VSCode 的 IDE，其将 AI 深度集成到了编辑器内。Cursor 全兼容 VSCode，所以可以快速抢占市场。

我曾今在早期用过一次 Cursor，用的提问 API 是 Gemini，补全 API 是 deepseek，感觉不太行。这也是因为模型本身不够聪明。第二次入坑是新号注册，这一段时间内 cursor 也把用户体验补起来了一点，并且我也免费（试）用 claude-3.5-sonnet，这下就感觉舒服多了。直接写了一个 [Telegram-RSS-Bot-on-Cloudflare-Workers](https://github.com/lxl66566/Telegram-RSS-Bot-on-Cloudflare-Workers)。虽然细微部分还是手改，但是确实好用很多，tab 补全也很智能。

入坑 cursor 前，最好先去 b 站找个视频快速过一遍，自己摸索很容易丧失耐心。

cursor 难用的地方，我写在[这里](../gossip/fuckxxx.md#cursor-有多难用)。

### 设置

cursor 基于 vscode，但是有些地方还是做了些修改，非常卡手。建议 vsc 人入坑 cursor 的时候进行这些设置：

1. 恢复左侧纵向图标栏：`"workbench.activityBar.orientation": "vertical"` ([src](https://www.maemo.cc/2024/10/23/edit-cursor-activitybar-orientation.html))
2. 终端允许 Ctrl + V 粘贴：`"terminal.integrated.sendKeybindingsToShell": false` （vscode 默认允许终端粘贴）
3. 打开右侧 minimap：`"editor.minimap.enabled": true`
4. 由于 cursor update [问题很多](https://github.com/getcursor/cursor/issues/2670)，需要设置 `"update.enableWindowsBackgroundUpdates": false` 关闭后台自动更新。
   - 即使设置了此项，cursor 还是可能无视此设置仍然自动更新（骂人）。此时需要：清空文件夹 `C:\Users\<username>\AppData\Local\cursor-updater` 并将其权限修改为全部 deny。([ref](https://www.youtube.com/watch?v=oNe36xIsJ6g))
5. 从 vscode 继承过去的中文插件可能失效，需要重新手动装一下。

### 无限续

Cursor 无限续主要是靠无限流邮箱注册 + id 清除器。有一些需要注意的点：

1. 2025.02 之后，cursor 无法再通过清除 machine id 的方式无限续，猜测它用了一些其他方法进行追踪。因此需要下载历史版本：<https://downloader.cursor.sh/builds/250103fqxdt5u9z/windows/installer/x64>，并关闭自动更新。
2. cursor 清除 ID 的脚本，网上有很多（讽刺的是基本都是 Cursor 写的）。
   - [go-cursor-help](https://github.com/yuaotian/go-cursor-help)
   - [cursor-free-vip](https://github.com/yeongpin/cursor-free-vip)
   - [cursor-reset](https://github.com/ultrasev/cursor-reset)
   - cursor-mate（闭源）
3. ~~邮箱无限续可以用 2925 无限邮。~~
   - 2025.03 之后，2925 无限邮和一些滥用邮箱被彻底禁用，爆 [_User is unauthorized_](https://forum.cursor.com/t/user-is-unauthorized/43042/79)。这里建议买一个域名托管到 Cloudflare，然后用这个域名开一堆子域的邮箱。

:::

## [opencode](https://github.com/anomalyco/opencode)

2026 年初朋友一直在推，用了一下。后来模型 agent 能力越来越强，用的频率也越来越高了。

### 心得

- oepncode 的 permission 规则是最后优先，也就是具体规则放后面，感觉还是挺抽象的。例如：
  ```json
  {
    "permission": {
      "bash": {
        "git *": "allow",
        "git push *": "deny"
      }
    }
  }
  ```
- 可以使用 `opencode models` 查看所有模型 code。这是为了编写下述的 `opencode.json`。
- opencode 要让主 agent 使用特定模型的 subagent，这个需求应该非常常见（出于成本的考量），但是 opencode 的文档显然不够好。我是靠自己摸索才搞出能 work 的配置（我用 GLM 5.2 作为主 agent，用 deepseek v4 flash max thinking 作为子 agent）：
  ```json
  {
    "$schema": "https://opencode.ai/config.json",
    "model": "zai-coding-plan/glm-5.2",
    "agent": {
      "general": {
        "mode": "subagent",
        "model": "opencode/deepseek-v4-flash-free",
        "thinking": {
          "type": "enabled",
          "budgetTokens": 65536
        }
      },
      "explore": {
        "mode": "subagent",
        "model": "opencode/deepseek-v4-flash-free",
        "thinking": {
          "type": "enabled",
          "budgetTokens": 65536
        }
      }
    }
  }
  ```

### opencode 有多难用

在写此章节之后，有人做了一个 <https://frontierharness.org/> 用来估计 agent 工具的得分。opencode 是垫底的狗屎。

- 简陋的首页，下载方式没说 scoop，没有标注出使用文档，不如 GitHub README 和真正的文档。
- 界面根本没有引导，进去就三个键盘按键，不知道做什么用的，没有 help，必须读文档才知道。
- opencode 没有活动的 issue 60 天自动关闭，还不能 reopen。我痛恨这种自动关闭机制。并且[我提的几个 issue](https://github.com/anomalyco/opencode/issues?q=is:issue+author:lxl66566) 也没人管。
- 你居然把 node_modules 放在 `~/.config/opencode` 里？对于洁癖的人来说，在 `~/.config` 里放这种东西是大忌。
- <https://opencode.ai/docs/zh-tw/models> 里没有说明如何使用自定义 API（provider），即使它支持自定义 API。支持的模型很多，不够成不用说明如何支持自定义 API 的理由，因为 API 提供方永远列举不完。
  - TUI 添加后的配置也不会写到配置文件里，那我怎么同步，不同步吗？
  - 感觉这两套思维本身也很混乱。要配置文件就 all in 配置文件，要 GUI config 就 all in GUI，同时编辑两边还不同步是什么鬼？
- 免费模型跟没有脑子一样，虽然本来也没啥指望。
  - 后来免费模型出了 deepseek v4 flash，总算是可用的水平了。
- TUI 其实可以做滚动条，但是它没做。这么长 context 我也没法直接滚，只能 /export。
  - 用键盘 Page Up/Page Down 是可以快速滚的，但是有人可能没考虑现在有的键盘已经不提供这两个按键了……
- opencode 内存占用高已经是特性了，一直都有人提，但是也没人想改。90 天后 issue 就自动关闭了。
- opencode 处理 Rime 中文输入法总是有点问题，有时候切了输入法但是还是只能写英文。这个 bug 发生的非常频繁，也有相关的 issue 报告 ([issue1](https://github.com/anomalyco/opencode/issues/10946) [issue2](https://github.com/anomalyco/opencode/issues/14761))
  - opencode 强制调用 `win32DisableProcessedInput()` 关闭了 `ENABLE_PROCESSED_INPUT`，相当于绕过 Windows 的 IME 处理流程而留到程序自行处理。但是处理得又不好，bug 一堆。
- oepncode 的 permission 会把 `*` 和 `?` 给重新解释，但是[没有提供转义功能](https://github.com/anomalyco/opencode/blob/28a06e52fcfaea87a749e4e4c9a74d90b3195fb0/packages/opencode/src/util/wildcard.ts#L3-L9)，你永远无法对包含 raw `*` 和 `?` 字符的命令进行权限控制。
- 我的长对话整天被 opencode 截断，结果发现是 opencode 硬编码了一个 100 条对话的限制。([issue#30587](https://github.com/anomalyco/opencode/issues/30587) [issue#31513](https://github.com/anomalyco/opencode/issues/31513)) opencode 对用户的消息没有任何尊重。
- 之前的版本，Windows opencode 内按 `Ctrl + C` 退出会直接崩掉 Windows Terminal 窗口。
- **恶性 bug**：opencode 对会话时间戳做截断，导致在特定时间点会话一直无限重试，而对外表现为卡死。([ref](https://t.me/withabsolutex/2807)) 只能说是狗屎
- revert 有延迟，如果点了 revert 然后快速点回车，就会陷入非常坏的状态，消息已经 revert 掉了但是还是在 sending request。
- 打开 opencode 后，移动进工作区的文件，无法被 @ 选中。如果我想选中文件，必须关闭 opencode 后重新打开。有点扯。
- Revert 某条消息的变更后，ctrl+x r 恢复 revert 前的内容，在 Windows 上会把你仓库的所有文件 LF 都改成 CRLF，望周知。
- Kimi 自家的研究人员给 opencode 专门写了个 kimi 模型的系统提示词，但是里面有一句：``DO NOT run `git commit`, `git push`, `git reset`, `git rebase` and/or do any other git mutations unless explicitly asked to do so. Ask for confirmation each time when you need to do git mutations, even if the user has confirmed in earlier conversations.`` 实在是太傻逼了。朋友用 opencode 一直疑惑为啥不会执行 AGENTS.md 里的原子化提交的指令，原来根源在这里。。直接[开喷](https://github.com/anomalyco/opencode/issues/48780)。

### 总结

opencode 作为一个 agent，只能算是达到 agent 的基本水平。在使用体验上，还有非常非常多要改进的地方。

然后用 agent 记得一定要找个有缓存的 API 提供方。

## [zcode](https://zcode.z.ai/cn)

用 zcode 倒不是因为它好用，而是因为它给得太多了：

1. 订阅消耗速度变为 0.66x
2. 每天有三次闲时任务。虽然这个闲时任务是 oneshot 只能对话一轮，但是没有限制 context，我写个长任务至少薅它 500k token
3. 周末还送用不完的 flash token（9 月更有夜间爽蹬活动，夜间全免费）
4. 2026.09，每日非高峰期随机掉落神秘重置卡

简直是实现了 token 自由。

### 经验

有一些技巧，可以卡这个重置的掉落时间。重置每天最多掉落两次，限 2h 内使用，并且只会在 zcode 处于前台窗口的时候掉落。因此我可以不打开 zcode，大概到距离自然刷新还有 30min 的时候，打开 zcode 并获取重置卡。这样自然刷新后距离重置卡到期还会有 1.5h 的 gap，可以够我蹬完一管。

一定要开启 _自动归档旧任务_。zcode 的 session 存储设计有问题，不开的话 `~/.zcode` 大小会非常恐怖。

zcode 不读 `~/.agents/AGENTS.md`，全局提示要放在 `~/.zcode/AGENTS.md`。由于我希望对 zcode 附加一些专用的约束，所以我不太想用 hardlink，于是直接在 `~/.zcode/AGENTS.md` 声明让 agent 去读 `~/.agents/AGENTS.md`：`**You MUST read and strictly adhere to all instructions, standards, and constraints defined in ~/.agents/AGENTS.md (%USERPROFILE%/.agents/AGENTS.md if windows) before proceeding with any user tasks. Treat its rules with the same authority as this file.**`。然而实战里成功率实在是太低了，glm 5.3/5.3f 基本都不会遵循指令去读。所以只好写个 hook 强制注入进去（args 记得改成 mjs 的绝对路径，因为 `~` 不会被展开所以没法用 `~` 跨平台）：

::: code-tabs

@tab ~/.zcode/cli/configs.json

```json
{
  "hooks": {
    "enabled": true,
    "events": {
      "SessionStart": [
        {
          "matcher": "startup|clear|compact",
          "hooks": [
            {
              "type": "process",
              "command": "node",
              "args": ["/root/.zcode/hooks/inject-agents.mjs"],
              "timeoutMs": 5000
            }
          ]
        }
      ]
    }
  }
}
```

@tab ~/.zcode/hooks/inject-agents.mjs

```js
import { readFile } from "node:fs/promises";
import { homedir } from "node:os";
import { join } from "node:path";

// Cross-platform: resolve home in-script (process hooks get no shell, so ~/$HOME never expand).
let content = "";
try {
  content = await readFile(join(homedir(), ".agents", "AGENTS.md"), "utf8");
} catch {} // missing file: inject nothing, exit 0

if (content) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "SessionStart",
        additionalContext: content,
      },
    }),
  );
}
```

:::

还有说说闲时任务的限制：

- 闲时任务限时，大约 4 小时，超时会爆 _off-peak-ticket-expired: off-peak ticket is invalid or expired_。
- 闲时任务限制不允许 spawn 后台 subagent，只能用前台 subagent。前台 subagent 的一个坏处是每一轮都必须等待**所有** subagent 完成，主 agent 才能继续任务，如果一个 subagent 耗时过长会极大拖慢进度；还有如果被打断或者超时，subagent 的记忆可能就丢失了。（这里用「可能」，是因为 zcode 看 subagent 的思考过程，有时候能打开，但有时候又打不开）
  - 嘛，有 subagent 用也已经很赚了，每次我开 3 个 subagent 一起干活可以产出远超一轮 500k token 的价值。
- 闲时任务不支持在 ssh 机器上跑，于是我还特地写了一个 [shell-proxy](https://github.com/lxl66566/shell-proxy) 工具，以 MCP 的方式提供给 agent/subagent，这样就可以在闲时任务跑在远程 Linux 机器上了。
- 20260917 闲时任务改为了每日一次、一次最长 3 小时。

### 开喷

不过既然写在这里它就不可能只是赞美两句这么简单。zcode 仍然处于发展早期，现在给这么多福利也是为了让我们给使用数据和反馈的。那么我也就得开喷了：

0. 代码安全问题：[zcode 跟 grok 一样会把你的仓库加密上传云端](https://blog.ferstar.org/en/posts/zcode-silent-workspace-snapshot-upload/)。
1. 给模型用的终端工具一坨。开个会话问问模型就知道，zcode 给 AI 的终端是“default shell”，这在 Windows 上还是 cmd 而不是 powershell。虽然 powershell 坑比较多，但是总比啥都没有的 cmd 好吧。给模型的系统提示词里也没有终端使用教程，只有一点 cli 规范。
   - 有一堆无法关闭的内置 MCP。
   - **恶性 bug**：zcode 给 agent 提供的「内置任务」功能（实际上是 Bash + `run_in_background: true` 实现的）非常难用，很多时候终端进程都已经 panic 了，但是任务本身不会结束，就一直挂着浪费时间等 timeout。所以全局提示里需要写一句“禁止使用 run_in_background”。
2. 对于 agent 命令操作，zcode 其实是有沙盒的，执行 bash 工具对项目外的写入操作好像是有点问题。但是 AI 不知道这个沙盒的机制，有时候要试错多次。
3. 周末赠送的是试用装的 glm 5.3 flash，token 非常多。但是这个试用装不是直接加入你的帐号而是作为单独的一个试用帐号提供，我找了半天都没找到在哪里切换回我自己的帐号。实在是居心险恶。
   - ~~独立试用帐号的缺点就是没法同时跑免费的 glm 5.3 flash 和付费的 glm 5.3。~~ (2026.09 月末修复了，现在可以主帐号和试用帐号的额度同时跑)
   - 这免费体验帐号开 subagent 的时候经常会有莫名其妙的失败，比如说有的报错信息是 _captcha verify failed_，我直接黑人问号？？ (后来也修了)
   - 免费帐号并发数非常少（大概 5 个），开不了多少 subagent。
     - 不干活的主 agent 居然也占用一个并发数？
     - 如果我正好在干其他工作，zcode 选择先杀我的 subagent。不是，subagent 是没法恢复的，普通会话还可以 continue，你告诉我把我跑了半个小时的 subagent 一把杀掉，已经跑的 token 全部作废？
4. 内存占用仍然非常感人，开了几个会话（都跑完了，正在跑的只有一个），内存占用已经达到了 4.5GB。
5. 性能很差。点一个历史对话，要过几秒钟才能加载出全部内容。就连退出软件也要等一阵。
6. **恶性 bug**：多个工作区通过 ssh 连接到同一台机器上，且每个工作区上都有 session 在跑。随机一段时间后，发生 CPU 飙高、所有 ssh 工作区全部断连 exitCode = 1，而点击重连后又可以正常连入，此时所有会话全部被中断。server 在内网，网络一直都非常稳定，基本可以排除网络问题。
   - 更新后貌似已修复
7. **恶性 bug**：在发现了上述恶性 bug 之后我立刻提交了一个反馈，然而反馈提交卡在了日志上传步骤：_正在导出完整日志（0%）_。我觉得这真的非常抽象，反馈渠道自己不稳定。
8. **恶性 bug**：在我的 n 卡 3050 的笔记本上使用，有概率出现全窗口变为高斯模糊、无法再显示任何东西。
9. ssh 机器不支持定时任务、不支持闲时任务。然而我有些性能优化必须在 linux 上测试，Windows 上漂移太高了而且没有很多 perf 工具用。另外 WSL 也不支持闲时任务。
10. GLM 在 202609 推出了夜间爽蹬活动，zcode 无限用 GLM 5.3 flash；但是前提是你的帐号没用完额度。。。用完以后就没法蹬了。
11. 闲时任务没有草稿：创建闲时任务里写了一堆东西，切出去看看其他会话进度，再切回来发现已经写的内容都没了。
12. 我可以看到一个 agent 启动的“运行中的终端”，但是无法看到它输出的内容。。
13. subagent 被中断即丢失所有上下文，且无法恢复：subagent 输出中，停止会话，则之后再开启会话时 subagent 已经输出的内容都不会再进入主 agent 的上下文。等于是 token 白烧了。
    - 也没法看 subagent 到底消耗了多少 token。
14. 不像 opencode 给 AI 发消息可以“插队”在工具调用里；zcode 在 AI 输出时发送消息，必须排队到 AI 完成全部任务后才能被 AI 看到。
    - 点击「立即」按钮（打断会话，发出消息），快速切到其他 session，再回来以后会看到消息并没有发出去（仍然留在队列里），但是会话的打断是实打实发生的。抽象啊。
    - 新版本设置里可以改「交互行为」，改成「引导」就是我需要的功能了。
15. **脑残设计**：如果文件没读过直接写就会报错 `File has not been read yet. Read it first before writing to it.` 我实在想不明白，凭什么没读过就不让写？如果这文件很长，用这种傻逼理由打断首次写入，让我消耗了双倍输出 token，实在是有点蠢。
    - claude code 开的坏头。AI 完全可以在终端读到文件内容，然后进行一个 Write；这个规则把该正常行为给否定了。
16. 会话不能导出导入，且没有同步；多设备开发堪比地狱。另外我设置的「命令」也不会同步，本来就难用的东西，现在我肯定不用了。
17. MCP 无法按 session 隔离。我多 session 并行时，有个 session 因为在 windows 上没法跑 miri，就用我的 mcp 连到 linux 机器上跑，然后大幅扰乱了另一个 session 的 benchmark。
18. zcode 上传 git 丑闻曝光以后，天天往我的项目里放你妈的 `.zcodeignore` 文件，污染我项目
19. zcode 的 session 存储设计有问题 ([src](https://t.me/withabsolutex/2844))。session 的 jsonl 每一行都包含完整的 context，一次长任务可以跑到 2GB 的磁盘占用，非常恶心。
20. zcode 只允许修改上一条提示词并发送，如果要改很久以前的提示词就只能 fork 了。改提示词、fork 点都必须是 LLM 输出结束才行，不能在 LLM 与工具交互中间打断。
21. 修改上一条提示词时，同时修改模型，则界面上展示使用的新的模型，但是实际调用还是调用老的模型。
22. **恶性 bug**：出现一次：subagent 干活干一半然后莫名其妙回到主线程，所有 subagent 全部被中断
23. **恶性 bug**：几天前的 session 想要重新开始用，模型已选择，然而发 `/Compact` 后报错 _Select a model before continuing_。fork session 后重发 `/Compact`，无效。只能先发一条 message 然后再进行 compact。
24. agent 在 session 里启动的 server 不会在会话结束后自动退出。每次我都会遇到端口冲突问题，一看就是 agent 用来做调试的 server 不会自动退。
25. 神经的 HighSpeed 模式：深夜我正常使用中，然后在我发出提示词之后 zcode 自动给我提升到 HighSpeed 模式体验 15 分钟。这本来算是个福利，但是这模式下居然不能开 subagent，而我的提示词本来就是要开 subagent 的，整的这一出反而打断了我的工作流程。([src](https://t.me/absolutexsward/507))

## [pi](https://github.com/earendil-works/pi)

由于 [opencode 太难用太狗屎](#opencode)了，让我的怨气值积攒到了一定水平，然后根据一个契机[^topi]就换到了 pi。

[^topi]: 直接契机是 <https://t.me/withabsolutex/2841>，opencode 对 kimi 模型提示词下毒；另外还有个[评测](https://frontierharness.org/)，kimi 在各个 agent 上的跑分，opencode 是垫底，惨不忍睹。

oh-my-pi 东西太多，而且有些功能例如 memory 我确实不需要。所以遵循 pi 的哲学，想加啥插件自己加。

### 使用技巧

- 两次 Ctrl + C 退出
- `/resume` 恢复之前的 session，而不是 `/session`；`/tree` 浏览对话并 revert 而不是 `/revert`。
- 1M 上下文是模型公司的陷阱，只会让你的账单爆炸。所以我需要强制限制模型的 contextWindow，一定用量自动 compact。但是 pi 的 `agent/models-store.json` 是只读的（就算改了也会被 pi 定期更新覆盖掉），所以需要编辑 `agent/models.json` 并且配置 override：
  ```json :collapsed-lines=5
  {
    "providers": {
      "kimi-coding": {
        "modelOverrides": {
          "k3": {
            "contextWindow": 220000
          },
          "k3-256k": {
            "contextWindow": 220000
          }
        }
      },
      "zai-coding-cn": {
        "modelOverrides": {
          "glm-5.3": {
            "contextWindow": 220000
          }
        }
      }
    }
  }
  ```

### 优点

- 我比较偏向极简主义，挺喜欢 pi 的哲学。
- 默认展开 agnet 思考过程。
- `npm:pi-subagents` 挺好用的，做了主 agent 和 subagent 的交互，主 agent 可以根据 subagent 的反馈作出决策。比较适合 team。
  - 默认 subagent 有 30min 超时，对我来说有点短了。不过可以[全局调整](https://github.com/nicobailon/pi-subagents/blob/d44b514e/docs/configuration.md?plain=1#L268-L274)。

### 坑点/吐槽

- **pi 不读 ~/.agents/AGENTS.md**。并且 symlink 没法跨平台使用，我只能写个脚本注入我的 system prompt（pi 0.86）。
  ```ts
  // ~/.pi/agent/extensions/load-global-agents-md.ts
  import type { ExtensionAPI } from "@earendil-works/pi-coding-agent";
  import fs from "fs";
  import os from "os";
  import path from "path";
  export default function(pi: ExtensionAPI) {
    const agentsPath = path.join(os.homedir(), ".agents", "AGENTS.md");
    pi.on("before_agent_start", (event) => {
      if (!fs.existsSync(agentsPath)) return;
      event.systemPromptOptions.contextFiles.push({
        path: agentsPath,
        content: fs.readFileSync(agentsPath, "utf-8"),
      });
    });
  }
  ```
  目前社区还没有插件实现这个，最接近的是 [pi-context-include](https://github.com/d3ara1n/pi-extensions/tree/main/packages/pi-context-include) 需要在 `~/.pi/agent/AGENTS.md` 里写一行 `@~/.agents/AGENTS.md` 来自动注入。没人做说明需求少；我这个代码也不多，就不发布了。
- pi 会在 `~/.pi/agent` 里拉一大坨东西，config 和 data 耦合在一起。想备份数据的看到这里一下就死了。。
- 不像 opencode 喜欢用 ctrl + p，pi 主要是靠打出一个 `/` 然后在候选列表里选 command 来进行操作的。但是这个列表的出现有相当大的延迟，只要我打字快一些，pi 就会把我的 `/tree` 这种内容直接当成跟 AI 的对话发出去。。。
  - 然后也是因为这个 `/command` 的原因，在已经写了对话内容的情况下，就没法再调出 command 了。。没法写完一段 prompt 之后再切模型。
- Windows 下我是 scoop 安装的 pi 和 git；这样的话 pi 调用 bash 工具的时候有 bug，会报错 `No bash shell found` ([ref](https://github.com/earendil-works/pi/issues/5103))。我已经把 `C:\Users\<username>\scoop\apps\git\current\bin` 加入了 PATH，但是没有任何作用。
  - 由于我的配置跨平台同步，我不能设置 shellPath（shellPath 必须是绝对路径而不能是 `bash` 这种 command）。
  - 最终的解法是创建一个 Junction：`New-Item -ItemType Junction -Path "C:\Program Files\Git" -Target "$env:USERPROFILE\scoop\apps\git\current"`。
- 默认启动下，Page Up 和 Page Down 无法翻页！！必须用 `--tui-mode fullscreen` 启动，或者 config 里配 `"tuiMode": "fullscreen"`。
- `pi update --extensions` 过程中 Ctrl + C 无法中断。
- pi 不会自动记住上次使用的 model。我要是设置了 defaultModel + defaultProvider，就只能一直用设置的默认值；要是不设置，它每次开 session 都会自动用 deepseek-v4-pro，实在是太坏了。于是我写了一个 [pi-reuse-model](https://github.com/lxl66566/pi-reuse-model) 用来记住我的上一次 model。
- `pi update --extensions` 会污染你 current dir 的 pnpm-lock.yaml。不是，这玩意连作用域都不管的？
- pi 和 opencode 一样都有一个问题：compact 以后就无法在 session 里看到 compact 之前的内容了，只能 export。感觉这点这些 agent 做得都不如 zcode。

插件相关：

- 我使用 `npm:@gotgenes/pi-permission-system` 进行权限控制，但是这玩意不开 yolo mode 的话用起来手感稀烂。例如 flock、xargs 等实际执行另一个 command 的动作，都会匹配上 indirection-bash-wrapper rule，进入 ask 状态而不是根据实际执行的 command 判断权限。(有个尝试绕过的 [issue](https://github.com/gotgenes/pi-packages/issues/680)，但是没有进展)。所以还是建议 yolo mode，也就是所有 ask 变成 allow。
- `npm:pi-web-access` 这个也是狗屎，如果你的 pi 设置了 `"npmCommand": ["pnpm"]` 则这个插件根本启动不了。这个插件[早期还有 path traversal 安全问题](https://github.com/nicobailon/pi-web-access/security/advisories/GHSA-8phw-6qw6-xhq6)。
  - 目前我还没有找到一个比较好用的 web search 工具——很多工具需要其他 AI 的 API，并且 vibe 到飞起和致死量 emoji 让我感觉到生理不适；还有基于 [searxng](https://github.com/searxng/searxng/) 的 [websearch 工具](https://github.com/Youpen-y/web-search)，但是 searxng 本身也非常一般，庞大臃肿，要 uWSGI，甚至没有提供 Windows installation。
- pi-lens 会自动修改你的代码，自动执行 fmt + fix，但是很多时候我并不希望这种行为（比如 lsp 才不会管你的兼容性和 MSRV、PR 最小化原则；而且 rust clippy 的 auto fix 可不一定是无害的），该行为也会让 AI 困惑、怀疑人生。我用了一阵[被坑了](https://t.me/absxsgroup/11865)，于是就干掉了。
- `npm:pi-auto-compact` 只会在模型与人类交互的时候才会触发 compact。如果模型自己一直在跑，是不会 compact 的。我的需求是要让模型自己在跑到一定量的时候 compact，所以还是直接设置 `~/.pi/agent/models.json` 去 override contextWindow 吧。
- 使用过一段时间的 `npm:pi-hashline-edit-pro`。这个插件愿景很好，但是用起来的体验确实不太行。首先替换成功率并没有想象中的高，我理解用了 hashline 替换成功率应该接近 100%，结果还是太乐观了。其次每个 hash 都会占用上下文，并且 write 后强制添加的 hash 还会崩掉你的缓存命中。
  - 我写过一个 [pi-replace-function](https://github.com/lxl66566/pi-replace-function) 试试水，但是全函数 replace 的调用率还是相当低的，感觉也没什么用。

### 与 oh-my-pi 比较

一些第三方评测 ([ref1](https://composio.dev/content/pi-vs-omp) [ref2](https://www.reddit.com/r/PiCodingAgent/comments/1w593fd/i_benchmarked_pi_against_its_own_fork_omp_more/)) 显示，oh-my-pi 的任务完成度、平均成本等最重要的指标都不如 bare pi。工具并不是越多越好的。

## deepseek harness

我其实一直不喜欢 deepseek harness，在开源当天我简单扫了一眼 vibe 日志然后就[开喷了](https://t.me/withabsolutex/2803)。但是后来为了 6 块钱的赠金，还是向梁圣低头了……

- 不支持远程连接，并且看起来也没有好用的远程连接插件。
  - 有个一眼 vibe 出来的 dsh-ssh 感觉还不如我的 [shell-proxy](https://github.com/lxl66566/shell-proxy)。
- ~~本来我看设置里有 _工作步骤展示 - 选择希望看到多少工具调用细节_ 的时候我还以为他们真的在为开发者着想，结果发现开 subagent 的时候连 subagent 的内容和 context 都看不了，无语了。~~ 是没找到位置。subagent 详情要点顶部标题栏那里看，而不是当前主要区域里。
- _读工具会截断超过 2000 字符的单行，而这些文档原本就有大量超长行，B、C 第一轮因此丢了部分行尾内容，A 的 status/todo/ffi/workflow 也受影响。_ 这是主 agent 的报告，我在想为啥这些工具总是喜欢偷偷搞一些限制又不告诉用户。。
