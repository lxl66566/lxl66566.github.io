---
description: coding
mode: primary
temperature: 0
---

# lxl66566.github.io — 基于 absolute-press 的个人博客

absolute-press 框架迁移已完成：构建、主题与渲染全部来自 absolute-press，本仓维护 markdown 内容、islands 与站点级样式。

## 禁区

以下文件禁止读取内容（会话中不要打开，构建流程自会处理）：

- src/hobbies/NSFW/video.md
- src/hobbies/NSFW/comic.md
- src/.vuepress/data/av.ts
- src/.vuepress/data/comic.ts
- src/articles/money.md

## 作业规范

- markdown 内容迁移/改写遵循 docs/conversion-spec.md（迁移期一次性脚本与历史记录文档已清理，见该文档头部说明）
- 列表页（galgame/books/anime/job/money/speedup）用站点 xlist island：TS 数据模块是 meta 列唯一数据源，markdown 只留 `@@@ <slot-key>` 插槽正文；增改条目两侧同步改，改完跑 `node utils/xlist-sync.mjs` 校验（详见 conversion-spec §9）
- island 注册与 frontmatter `icon` 一律用全称 key（如 `solid/code`、`brands/telegram`、`regular/snowflake`）；src/.vuepress/icons.ts 构建期扫描内容并校验，未注册的 key 直接构建失败
- 框架内置 island（ExpandableList/PasswordGate 等）无 `locale` prop，UI 文案按页面 `<html lang>` 前缀解析（`en-US` → 英文，未注册语言回退中文）；站点级 chrome 文案同理由各 locale 的 lang 决定
- 部署走 .github/workflows/deploy.yml
- 首页（src/index.md）是设计过的落地页，不照抄旧版 BlogHome：正文居中（迁移自 code 分支旧首页），`<HomeProfile />` 右栏占据 TOC 泳道——styles/site.css 用 `html:has(占位符)` 隐藏框架 TOC 与首页关联图，跨页导航自动恢复；`<HomeProjects />` 项目货架在正文末尾
- 首页右栏统计与分类/标签列表的数据来自 src/.vuepress/taxonomy.ts 构建期扫描（vite.config.ts 经 virtual:site-taxonomy 虚拟模块注入 island；dev 下改动 frontmatter 计数需重启）
- 首页项目货架唯一数据源是 src/.vuepress/data/projects.ts（迁移自 GitHub profile README）；分组图标映射在 islands/HomeProjects.tsx 的 GROUP_ICONS，增删项目只改数据模块；desc 支持行内 markdown（框架行内渲染器 heimu/mark/katex/强调/链接），vite.config.ts 构建期渲染经 virtual:project-desc-html 注入 island，dev 下改 desc 需重启
- 原子化提交。

## UX 偏好

- FA/SVG 图标不做任何动效，不加 bounce 或循环动画（hover 颜色过渡除外）
- 文章顶部 meta 不展示阅读时长，构建期统计保留在 payload 供其他展示处选用
- ExpandableList 必须保持表格样式、行可展开并有明确展开提示，不做凑数卡片
- xlist 排序入口在表头列：标题列（升→降→默认）与数值列（`scoreCell` 供 `sortValue`，如 galgame 四个评分列；降→升→默认，未评分沉底，复刻老 SortIndicator）点击循环排序；不做排序下拉，不做 全部展开/收起 按钮
- 关联图默认文字规模以「刚好展示」为准，宁小勿大
- navbar 下拉必须兼容超长条目：面板限高约半屏内部滚动，任何层级不得超出视口；任何交互状态下不得出现横向滚动条
- anchor 跳转目标标题保持高亮，直到用户主动滚动
- 图标与文字必须垂直对齐（meta 行、sidebar 条目、navbar 图标组等所有图文组合处）
- sidebar 由目录结构自动生成，列表长可接受；当前文章必须在 sidebar 可见：祖先自动展开，超出视口时自动滚动定位；宽度可拖拽调整（框架侧 resizer 实现）
- navbar 品牌区带 icon，并与内容区左缘对齐，不留空白
- 滚动条分级：页面主体保持原生；sidebar 用细滚动条；TOC 不出现滚动条
- TOC spy 高亮对齐视线处章节（观察区顶边贴导航栏，不能锚 20vh 滚动偏移，否则紧凑章节页如本日志页高亮超前数条）；高亮行被裁剪时即时最小滚动进可视区（scrollIntoView nearest + instant，刻意不用平滑滚动）；折叠组展开动画结束后由 transitionend 重瞄准（框架侧实现，设计档案见框架仓 `.agents/skills/toc-spy-reveal`）
- 关联图节点数超过阈值（related.twoHopNodeLimit）时只展示一度关联，否则展示两度；一度星型本身超过阈值时只保留互引最强的前 limit-1 个（阈值即全站关联图渲染节点数上限）
- 移动端顶栏仅一个汉堡按钮；抽屉按目录树分层折叠，默认只展示第一层，可无限展开并包含全部文章
- navbar 爱好下拉不分区域：用单一无标题 group 固定成员顺序，文件夹条目自然排在文章前（框架 slim 逻辑）
- 桌面端 footer 是内容列宽的紧凑两栏行：左侧 `footer.credit`（已填 2026 © lxl66566），右侧 Powered by 文案、链接只套在框架名上指向框架仓库（框架侧渲染）；不 sticky、不挤占 sidebar/TOC；移动端不出 footer，credit 放左上角三道杠抽屉的 footer 底部；不放社交图标与最后更新；评论区不加标题；不做上/下篇导航（由关联文章组件承担）；不做时间轴归档页
- navbar 栏目名可点直达板块 index（板块名即总览，框架侧文件夹行链接契约）；下拉首行总览行带「总览」badge 与分隔线（框架打 `ap-nav-index-row` 钩子，样式在 styles/site.css）
- 分区板块（我的文章/学习笔记/闲聊）的下拉分区与对应 index 页共用 src/.vuepress/data/ 下的同名数据模块（单一数据源）：ArticleCell 用 `<ArticleCell name="<板块>" />` 渲染，vite.config.ts 的 toSectionNavItems 构建期派生 navbar tweak items（框架校验链接、追加未覆盖成员、按链接回填 frontmatter 图标）；增删文章或分区只改数据模块，两侧自动同步
