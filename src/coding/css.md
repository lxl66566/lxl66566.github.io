---
date: 2024-12-13
icon: brands fa-css
category:
  - 编程
tag:
  - 前端
---

# CSS

本人是 CSS 超级苦手，甚至以前都只会写 nocss 页面。但是如果要给别人做东西用，nocss 肯定不太行。当今所有主流 GUI 框架中没一个打得过前端设计，我也想在前端领域玩玩，因此学习一点 CSS 是有必要的。

## 预处理器

css 本身不带逻辑，处理嵌套也麻烦。因此有各种各样的预处理器可以允许我们写更强大、更有意思的扩展语法，然后由它们在编译器改成标准 css。

- scss：sass 3.0 的别名，我觉得最泛用的。
- [less](https://lesscss.org/)，朋友的公司在用

上面两个预处理器都兼容原生 css。

## 盒模型

前端基础概念了。

- 标准盒模型：`box-sizing: content-box`，content = size；border 和 padding 向外扩展
- IE 盒模型：`box-sizing: border-box`，content = size - border - padding，可以从外部统一大小。

<div style="position: relative; width: 400px">
  <!-- Margin Layer -->
  <div style="background-color: #e8f4f8; padding: 20px; text-align: center; border: 2px dashed #a8d1dc">
    <div
      style="
        position: absolute;
        top: 0px;
        left: 50%;
        transform: translateX(-50%);
        background-color: white;
        padding: 2px 8px;
        border-radius: 4px;
        font-size: 14px;
      "
    >
      margin
    </div>
    <!-- Border Layer -->
    <div style="background-color: #ffb6b6; padding: 20px">
      <div
        style="
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          background-color: white;
          padding: 2px 8px;
          border-radius: 4px;
          font-size: 14px;
        "
      >
        border
      </div>
      <!-- Padding Layer -->
      <div style="background-color: #e6ffe6; padding: 20px">
        <div
          style="
            position: absolute;
            top: 40px;
            left: 50%;
            transform: translateX(-50%);
            background-color: white;
            padding: 2px 8px;
            border-radius: 4px;
            font-size: 14px;
          "
        >
          padding
        </div>
        <!-- Content Layer -->
        <div style="background-color: #fff2e6; padding: 20px; text-align: center">Content Area</div>
      </div>
    </div>
  </div>
</div>

## 定位

| Position | 描述                                                             |
| -------- | ---------------------------------------------------------------- |
| static   | 默认值                                                           |
| relative | 元素相对于其正常位置进行偏移。不影响文档流                       |
| absolute | 元素相对于最近的已定位（非 static）祖先元素进行定位              |
| fixed    | 元素相对于浏览器窗口进行定位                                     |
| sticky   | 元素在跨越特定阈值前（屏幕内）表现为相对定位，之后表现为固定定位 |

## 自适应布局

### flex

flex 布局是自适应的绝佳实践，而且对于前端初学者来说，flex 也非常符合界面直觉。

关于版本：flex [有多个版本](https://www.cnblogs.com/xiaohuochai/p/5323146.html)。2024 年了，不需要考虑 flex 兼容性，可以假定所有浏览器都支持最新版本 flex。

无脑 flex：

1. 想要让内部的玩意水平垂直居中，可以直接无脑 flex：`display: flex; align-items: center; justify-content: center;`
2. 想要让某个元素占满空间，可以给父元素设为 flex（不要设 align-items & justify-content），然后该元素设为 `flex: 1`。

flex 基础：

1. 主轴与交叉轴：主轴是元素排布的方向，交叉轴是与主轴垂直的方向。
2. basis, [grow and shrink](https://juejin.cn/post/6844904016439148551)
   - basis 是每个元素的基础长度。默认为 0，此时使用元素 width （或 height）。
   - grow 是当所有元素填不满 flex 时，对于剩下的空间的瓜分策略。实际上就是按 grow 比例瓜分。
   - shrink 是当所有元素超出 flex 时，对所有元素的压缩策略。每个元素被压缩的空间也是按 shrink 比例压缩。
3. 对齐：
   - 主轴：`justify-content`。一般常用的有 `center`, `space-between`, `space-around`, `space-evenly`
   - 交叉轴：一旦使用了 flex，所有元素就会在交叉轴上被拉到最大（由默认值 `align-items: stretch;` 控制），非常直觉。
4. 超出自动换行：`flex-wrap: wrap;`；换行后又会引入行间对齐 `align-content`。

### grid

有时候，flex 并不能解决所有问题，特别是在有换行的情况下。例如我要做一个展示橱窗，有 9 个元素需要在当前区域 `justify-content: space-between;` 放置。其中五个元素在上面，四个元素被换行到下面。那么单纯用 flex 会导致上下不对齐，非常难受。

这时候就要用到 grid，grid 可以保证所有元素在自适应布局的同时还是对齐的。

## 框架

虽说写原生 CSS 也不是不行，但是有框架为什么不用呢。

大多数框架都喜欢将 “写 css” 变为 “写 class”，免去了 html 和 css 之间切来切去的烦恼，用得熟练的话确实可以加快开发速度；特别是对基于 JSX 的前端框架非常有用。而写 vue 的话，css 框架对于初学者来说就是多了查文档的时间，如果文档烂的话还是挺烦人的。

- [UnoCSS](https://unocss.dev/)：新一代完全自定义化的 css 框架。
- [tailwindcss](https://tailwindcss.com/)：一套预设的 class。目前广泛使用。
- Bootstrap：老一辈预设的 class，目前算是被 tailwindcss 取代了吧(?)

### TailwindCSS

[配色](https://tailwindcss.com/docs/customizing-colors)

- TailwindCSS 只能写静态类名。所以不能写出 `bg-${color}-500` 这种插值，否则编译的时候不会编出这个 style，样式就丢失了。
- 只有 `flex: 1` 可以写为 `flex-1`。其他 `flex: x` 要写为 `flex-[x]`。

#### 插件

- [tailwind-scrollbar-hide](https://github.com/reslear/tailwind-scrollbar-hide)：隐藏 scrollbar

## external

1. [学习 CSS 布局](https://zh.learnlayout.com/)
