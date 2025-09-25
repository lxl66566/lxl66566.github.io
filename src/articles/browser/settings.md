---
date: 2023-12-03
icon: gears
category:
  - 教程
tag:
  - 浏览器
  - 桌面端
---

# 浏览器设置

## 缓存位置

我使用 [RAMDisk](../ramdisk.md)，拿到浏览器都会修改缓存位置。

一般的 chromium 内核浏览器都能通过加 `--disk-cache-dir="Z:\123"` 启动参数更改缓存位置([ref](https://www.bilibili.com/read/cv12675669/))。Edge 浏览器也可以改注册表。firefox 修改设置项即可。

## 垂直标签栏

在 firefox 下我使用 [Sidebery](https://addons.mozilla.org/en-US/firefox/addon/sidebery/) 扩展作为垂直标签栏。虽然稳定性差点，偶尔会闪退，但是总的来说我还是满意的。

而 chromium 系下没有这个插件，我需要寻找新的垂直标签栏插件。

- [Side Space](https://chromewebstore.google.com/detail/side-space-vertical-tab-m/ipcmlnjbpgmnpahkkboglidcbkndekjj)，[Vertical Tabs](https://chromewebstore.google.com/detail/vertical-tabs/efobhjmgoddhfdhaflheioeagkcknoji)，[tabVertikal](https://chromewebstore.google.com/detail/tabvertikal-垂直选项卡/aahjeignibghcnabifeoclpebaleldkj)，[Tab Shelf](https://chromewebstore.google.com/detail/tab-shelf-side-panel-vert/gkiobnohamhihbaipacecjfljepjjlmg?hl=zh-CN)，[Thready](https://chromewebstore.google.com/detail/thready-vertical-tabs/aihcofnnndflfjbmlekiegncnahgmaik?hl=zh-CN&utm_source=ext_sidebar)：全部否决，太宽了。这些都是用的 chromium 侧边栏 api，但是这 api 就是**纯纯的脑瘫**，有 min width 限制。[相关讨论](https://groups.google.com/a/chromium.org/g/chromium-extensions/c/xuk4ZuWTsBk)，反正我没看出什么诚意。
- [Polychrome](https://chromewebstore.google.com/detail/polychrome-vertical-tab-g/pcdogalliibjgamnojnpbmbabghfijak?hl=zh-CN&utm_source=ext_sidebar)则是用的浮动窗口，更捞了。

## 下载器

详见[下载器横评](../downloaders.md)。

## firefox

20230214，我从 edge 用户转为了 firefox 用户。edge 并不是不满足我的需求，甚至更加贴合我的个人需求（纵向标签栏，firefox 没有内置此功能），换浏览器大约只是我的心血来潮而已。为此我花了很多功夫设置 firefox。然而我还是于 20230304 换回了 edge。

在朋友推荐下，我使用 [Firefox Developer Edition](https://www.mozilla.org/en-US/firefox/developer/)（蓝狐狸）而不是原始 Firefox。

- 优点：
  - firefox 在 bilibili 等网站的表现较差，放开权限后子页面仍无法读取 cookies。Firefox Developer Edition 无此问题。
  - > 只有这个可以安装 ruffle —— Asuka Minato（虽然这不是我的刚需）

设置步骤如下：

1. 迁移书签与历史记录。此方面 firefox 有专门的接口，可以一键导入。
2. 迁移扩展与扩展数据。具体地：
   - 由于 chrome 系扩展与 mozilla 系扩展不兼容，扩展需要手动迁移。
     - 包括所有扩展的数据（例如设置项）都需要手动处理。
   - Tampermonkey 脚本迁移：_Dashboard - Utilities - File Export & Import from file_
   - 有的脚本可能有自己的设置项，需要手动导出。
3. _about:config_
   - 设置中文：将 `intl.multilingual.enabled`、`intl.multilingual.downloadEnabled` 设为 true，然后就能在设置中选择中文。
   - 更改缓存位置到 RAMDisk [src](https://blog.csdn.net/freedom_wbs/article/details/38415315)：将 `browser.cache.disk.parent_directory` 设为字符串值，绝对路径。
   - 使用系统滚轮设置：把 `mousewheel.system_scroll_override.enabled` 改成 `false`。
4. [垂直标签栏](#垂直标签栏)
5. 隐藏标题栏，书签栏，标签栏：
   - 在 `about:config` 中，将 `toolkit.legacyUserProfileCustomizations.stylesheets` 改为 true。（为了允许 firefox 加载自定义 css）
   - 在 `about:support` 中，点击 _配置文件夹 -> 打开文件夹_（_Profile Folder -> Open Folder_），在此目录下新建名为 `chrome` 的文件夹，在新文件夹下新建 `userChrome.css`，写入[此处代码](https://github.com/MrOtherGuy/firefox-csshacks/blob/master/chrome/autohide_toolbox.css)。
6. `adons.mozilla.org` 对中国用户屏蔽了广告拦截扩展，因此我使用一个第三方的[扩展商店](https://www.crxsoso.com/firefox/category/extensions) 进行安装。
7. [强制硬件加速](https://support.mozilla.org/zh-CN/kb/performance-settings)

## edge

1. _设置 - 隐私、搜索和服务 - 安全性_，关闭 _阻止可能不需要的应用_
2. [关闭部分快捷键](https://learn.microsoft.com/en-us/answers/questions/2360286/disable-keyboard-shortcuts-in-edge?forum=microsoftedge-all&referrer=answers)。sb 微软各种没用的东西占用我的快捷键，真忍不了。
   ```reg
   [HKEY_LOCAL_MACHINE\SOFTWARE\Policies\Microsoft\Edge]
   "ConfigureKeyboardShortcuts"="{\"disabled\":[\"paste_and_go\",\"send_feedback\",\"focus_inactive_notification\"]}"
   ```

## kiwi browser

1. _无障碍 - 强制启用缩放功能_
