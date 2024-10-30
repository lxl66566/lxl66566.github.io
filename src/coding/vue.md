---
date: 2024-10-18
icon: brands fa-vuejs
category:
  - 编程
tag:
  - 框架
  - 前端
---

# Vue.js

## 前言

前端技术栈里，我最熟悉的肯定就是 vue 了，这两年折腾博客不是白折腾的。但是之前主要学习的还都是 Vue2 语法，并且伴随着摸索的痛苦。现在由于一些契机，我开始较为系统地学习前端，因此有了这一篇文章。

在了解了其他框架后，我发现 Vue 关键字太多很难记这一点确实是对的。

## Vue 2 与 Vue 3

Vue 当前版本迭代到 Vue 3。但是如果上网问 GPT，给出的答案基本全是 Vue 2 的答案。截至 2024.10 的现在，本博客的所有组件仍然是 Vue 2 写成的。

Vue 3 基本上兼容 Vue 2 的写法。当我尝试了一下 Vue 3 语法后我感觉确实不错，比 Vue 2 要灵活多了。

### 迁移到 Vue 3

Vue3 的所有函数和导出全部写在 `setup()` 里，也可以使用 `<script setup>` 语法糖，免去两层嵌套和手动导出。

Vue2 使用大量的 `this.$set` 进行组件状态更新和重新渲染；Vue 3 只需要把变量声明为 `ref`/`reactive` 即可。具体用法和 android 差不多，ref 必需取 `.value`，是浅层的变更追踪；reactive 主要用于各种对象与容器，是深层变更追踪，reactive 对象本身是一个 proxy 而不是原先的类型。

Vue3 本来还有个 `$ref()` 的语法糖可以将 ref 的 `.value` 给省掉，但是后来在 Vue3.4 废弃了。

- 关于 props 修改：Vue2 的 `props` 可以整个直接复制到 Vue3 的 `defineProps` 里。调用时，需要把 `this.` 改为 `props.`。

## 组件解析

每个 `.vue` 组件由 template, script, style 三部分组成。

### template

- template 里使用 `:` (v-bind) 进行函数调用。只写函数名则只调用，不拿返回值；加了括号是拿返回值。

### style

请务必使用 `<style scoped>`！避免 css 污染其他样式。

### script

使用 `<script lang="ts">` 可以指定 ts 语法。

## vue 类型与方法

### computed

Vue2 与 Vue3 中都有 computed。我最开始以为是在编译期就计算出结果（），结果不是，computed 是用于追踪数据变化的。

`computed()` 接受一个闭包，这个闭包一般会捕获外部变量。当此捕获变量被改变时，该闭包就会重新计算。它可以维护数据之间的依赖关系，而 computed 属性的计算顺序是基于依赖关系的树状结构。

### props

props 定义了组件的传入参数。

vue2 中是 export default 中的 `props` object，到了 Vue3 就是 `defineProps`。不过在 template 里引用的值不加 `props.` 前缀也可以。

TS 和 JS 使用 `defineProps` 的方法不同，TS 是写在泛型参数里的：还有关于默认值的处理方式不同。

::: tabs

@tab TS

```ts
const props = withDefaults(
  defineProps<{
    boxData: Box[];
    columnWidth: number;
  }>(),
  {
    columnWidth: 20,
  },
);
```

@tab js

```js
const props = defineProps({
  boxData: Array,
  columnWidth: {
    type: Number,
    required: false,
    default: 20,
  },
});
```

:::

### slot

我们也可以将标签作为 DOM 节点传入组件。组件中需要在 template 区域使用 `<slot></slot>` 调用。更多插槽的特性和用法可以看[文档](https://cn.vuejs.org/guide/components/slots)。

### 双向绑定

双向绑定指的是改值会影响页面渲染，用户操作页面也会影响值。`v-model` 是用于双向绑定的语法。

举个例子，我希望一个 checkbox 和某个值建立联系，我改值可以控制 box 的 check 状态，用户点击 checkbox 也可以修改值，我就可以

```vue
<script>
const opendirectly = ref(false);
</script>
<input type="checkbox" value="newsletter" v-model="opendirectly" />
```

此博客里的[背词器](../farraginous/reciter.md)就是这么写的。

v-model 本质上是 v-bind + v-on 的语法糖，等于是建立了两个单向绑定。

### 动态样式

1. 我们可以将 DOM 元素整个绑定到 ref 上，然后手动修改样式，这样是非响应式的。
   ```vue
   <template>
     <div ref="myElement">非响应式</div>
   </template>
   <script setup>
   import { ref } from "vue";
   const myElement = ref(null);
   const changeStyle = () => {
     if (myElement.value) {
       myElement.value.style.padding = "20px";
     }
   };
   </script>
   ```
2. 我们也可以将某个值绑定到 ref，这样是响应式的。
   ```vue
   <template>
     <div :style="{ width: val + 'px' }">响应式</div>
   </template>
   <script setup>
   import { ref } from "vue";
   const val = ref(20);
   const increaseWidth = () => {
     val.value += 10;
   };
   </script>
   ```