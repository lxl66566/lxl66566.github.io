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

前端技术栈里，我最熟悉的肯定就是 vue 了[^1]，这两年折腾博客不是白折腾的。但是之前主要学习的还都是 Vue2 语法，并且伴随着摸索的痛苦。现在由于一些契机，我开始较为系统地学习前端，因此有了这一篇文章。

[^1]: 我变心了，现在我最熟的是 JSX based 的框架了。Vue 的缺点比较明显，关键字太多很难记、有很多响应式和隐式假设的坑，心智负担比较重。

## Vue 2 与 Vue 3

Vue 当前版本迭代到 Vue 3。但是如果在 2024 年左右上网问 GPT，给出的答案基本全是 Vue 2 的答案。真正用过 Vue 3 以后才知道好用，因此后来本博客的组件全部迁移了 Vue 3，并且我强烈建议所有项目迁移 Vue 3，不要再写 Vue 2 了。

### 迁移到 Vue 3

Vue3 的所有函数和导出全部写在 `setup()` 里，一般都使用 `<script setup>` 语法糖，免去两层嵌套和手动导出。

Vue2 使用大量的 `this.$set` 进行组件状态更新和重新渲染；Vue 3 只需要把变量声明为 `ref`/`reactive` 即可。

Vue3 本来还有个 `$ref()` 的语法糖可以将 ref 的 `.value` 给省掉，但是后来在 Vue3.4 废弃了。

- 关于 props 修改：Vue2 的 `props` 可以整个直接复制到 Vue3 的 `defineProps()` 括号里。调用时，需要把 `this.` 改为 `props.`。

## 组件解析

每个 `.vue` 组件由 template, script, style 三部分组成。

### template

- 在标签区域里使用 `:` (v-bind) 进行表达式调用，例如 `a="root"` 表示给 a 赋值为字符串 `"root"`，而 `:a="root"` 表示给 a 赋值为名为 root 的变量的值。
  - vue2 中，只写函数名则只调用，不拿返回值；加了括号是拿返回值。

### style

请务必使用 `<style scoped>`！避免 css 污染其他样式。更常用的是 `<style lang="scss" scoped>`，可以同时使用 scss 语法。

style scoped 里的样式默认会穿透到子组件里。

### script

使用 `<script lang="ts">` 可以指定 ts 语法。vue 3 里一般使用 `<script lang="ts" setup>`，setup 是一个语法糖。

## vue 类型与方法

### ref

最基础的响应式，不多说了。用的时候需要 `.value`（在 template 和某些地方会自动解包，不需要写 `.value`，不过写了也没啥问题）。

ref 是浅层的变更追踪，类似于浅拷贝的概念。如果需要达到类似深拷贝的效果，需要 reactive。

### reactive

reactive 主要用于各种对象与容器，不能用于基本类型，是深层变更追踪。reactive 对象本身是一个 proxy（理解为套了一层壳）而不是原先的类型。

如果一个 ref 被赋给 reactive object 的属性，则其会自动解包；如果被赋给 reactive container（Array, Map 等） 则不会自动解包。

### computed

Vue2 与 Vue3 中都有 computed。我最开始以为是在编译期就计算出结果（），结果不是，computed 是用于追踪数据变化的。

`computed()` 接受一个闭包，这个闭包一般会捕获外部变量。当此捕获变量被改变时，该闭包就会重新计算，看着挺像 React 的 useEffect。它可以维护数据之间的依赖关系，而 computed 属性的计算顺序是基于依赖关系的树状结构。

类似的函数还有 watch，区别：

| **特性**     | **computed**                           | **watch**                                     |
| ------------ | -------------------------------------- | --------------------------------------------- |
| **用途**     | 计算派生值                             | 处理副作用                                    |
| **返回值**   | 返回一个值（通常是状态）               | 不返回值，只执行逻辑                          |
| **自动更新** | 是（缓存结果）                         | 不会自动缓存，逻辑每次都会执行                |
| **触发时机** | 依赖项的值改变时，且使用时才会重新计算 | 依赖项的值改变时立即执行                      |
| **性能**     | 高效（有缓存，不会重复计算）           | 相对低效（每次变化都会触发回调）              |
| **适合场景** | 简单值的派生计算                       | 异步操作、手动 DOM 操作、记录日志等副作用逻辑 |

- **使用 `computed`**：
  当你需要一个依赖其他响应式数据的 **值**，比如展示在模板中。
- **使用 `watch`**：
  当你需要在数据变化时执行一些 **逻辑操作**（如 API 调用、写日志、DOM 更新等）。

比起 ref，computed 还可以单独控制 setter 与 getter，更加精细。[src](https://cn.vuejs.org/api/reactivity-core#computed)

### 组件间传值

#### props

props 定义了组件的传入参数。

vue2 中是 export default 中的 `props` object，到了 Vue3 就是 `defineProps`。不过在 template 里引用的值不加 `props.` 前缀也可以。

TS 和 JS 使用 `defineProps` 的方法不同，TS 是写在泛型参数里的：还有关于默认值的处理方式不同。

::: code-tabs

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

在最佳实践中，不应该修改 props 中的值，如果有修改需求需要将其存入响应式容器再修改；如果期望父组件内某个响应式变量变化后子组件能够接收到此变化，就可以向 props 传入 ref/reactive。

#### provide + inject

provide 和 inject 用于跨越多层组件传值，属于祖先组件向后代组件传值的范畴。可以想象成一个 kv store，每个值用一个 key 做索引。

```ts
import { provide } from "vue";
const theme = 123;
provide("theme", theme); // 第一个参数为 key，第二个参数为要提供的值
provide("theme", () => theme); // 或者使用函数
// 子组件中：
const theme = inject("theme"); // 使用 inject 来接收祖先组件提供的值
```

#### emit

emit 用于子组件向父组件传值。

```ts
// 子组件：
const emit = defineEmits(["customClick"]); // 定义可以触发的事件
const handleClick = () => {
  emit("customClick", "Hello from Child!"); // 第一个参数是事件名称，后面的参数是要传递的数据
};
// 父组件：
// <template>
// <ChildComponent @customClick="parentFun" />
// ...
// </template>
const parentFun = (data) => {
  message.value = data;
};
```

### [slots](https://cn.vuejs.org/guide/components/slots)

我们也可以将标签作为 DOM 节点传入组件。组件调用时的“子元素”区域的内容会被插入 `<slot></slot>` 插槽。

我个人的理解，插槽的出现是为了解决 Vue 相对于 react JSX/TSX 的痛点，不能把一个 Node 当成对象随意进行构造与使用。props 传 js object 还行，一旦要传 Node 就费劲了。虽然有 `import { h } from 'vue'` 的这种构造方法，但还是非常麻烦的。

#### Named Slots

我们也可以在组件里声明多个 slot 插槽，此时需要给每个插槽名字，成为具名插槽。在插入时，使用 template + v-slot 来将 DOM 插入指定的插槽。

::: code-tabs

@tab 子组件 Child.vue

```vue
<template>
  <slot :name="props.item.name"></slot>
  <template></template>
</template>
```

@tab 父组件

```vue
<template>
  <Child>
    <template v-slot:[get_valid_name(item)]>
      <div>这是我要插入的内容</div>
    </template>
  </Child>
</template>
```

:::

这里在父组件里使用了动态插槽名，方括号内可以是一个**不带空格**的表达式。

#### 处理插槽

如果使用 div ref 在 slot 外面包一层来获取插槽，需要在 onMounted 中获取：

```vue
<template>
  <div ref="slotContainer">
    <slot></slot>
  </div>
</template>
<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
const slotContainer = ref<HTMLDivElement | null>(null);
const textLength = ref(0);
const calculateTextLength = () => {
  if (slotContainer.value) {
    textLength.value = slotContainer.value.textContent?.length || 0;
  }
};
onMounted(() => {
  calculateTextLength();
});
watch(slotContainer, calculateTextLength);
</script>
```

上述例子中是可以使用 `computed` 代替 `onMounted` 的，但是在本博客的 dtlslong 组件里不行，因为 textLength 会影响 slot，所以可能出现交替无限变化的情况。

还有一种方法是 `useSlots()`，可以直接 `useSlots()[slot_name]` 拿到插槽内容。

#### 跨组件插槽

假设我有父、子、孙三个组件，父组件提供内容，要插入到孙组件的 slot 里。这时候需要在子组件里做一次中转，也就是在子组件里是类似这样 template 包 slot 的写法：

```vue
<template>
  <Grandson>
    <template v-slot:[slot_name]>
      <slot :name="slot_name"></slot>
    </template>
  </Grandson>
</template>
```

### components

由于 Vue 分离了 html 和 js，没有 jsx 那么灵活，所以如果我们需要动态标签时，Vue 提供了 `<components>` 标签。这相当于一个万能标签，只要给它一个 `:is="'xxx'"`，它就可以变成那个标签。因此我们可以在遍历数据时再决定使用哪个标签。

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
