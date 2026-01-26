<template>
  <figure class="custom-figure" :class="{ 'has-mask': mask }">
    <!-- 图片容器，处理点击事件和遮罩样式 -->
    <div
      class="image-wrapper"
      :class="{ 'is-obscured': isObscured }"
      :style="containerStyle"
      @click="toggleMask"
    >
      <img
        :src="src"
        :alt="alt"
        loading="lazy"
        class="main-img"
      />

      <!-- 遮罩层提示 (仅在遮罩开启且未展开时显示) -->
      <div v-if="isObscured" class="mask-overlay">
        <span>点击查看</span>
      </div>
    </div>

    <!-- 图注 -->
    <figcaption v-if="alt">{{ alt }}</figcaption>
  </figure>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from "vue";

interface Props {
  src: string;
  alt?: string;
  scale?: string | number;
  mask?: boolean;
}

// 使用带有默认值的 Props 定义
const props = withDefaults(defineProps<Props>(), {
  scale: "60%",
  mask: false,
  alt: "",
});

// 内部状态：是否处于“模糊/遮挡”状态
// 如果 props.mask 为 true，初始状态为 true (看不见)，否则为 false
const isObscured = ref(props.mask);

// 监听 prop 变化，如果外部动态关闭 mask，内部状态也要同步
watch(() => props.mask, (newVal) => {
  isObscured.value = newVal;
});

// 点击切换遮罩状态
const toggleMask = () => {
  if (props.mask) {
    isObscured.value = false;
  }
};

const containerStyle = computed(() => {
  let widthString = "60%"; // 默认值

  if (typeof props.scale === "number") {
    // 如果是小数 0.6 -> 转为 60%
    widthString = `${props.scale * 100}%`;
  } else if (typeof props.scale === "string") {
    // 如果本来就是 "60%" 或 "60"
    if (props.scale.includes("%")) {
      widthString = props.scale;
    } else {
      // 尝试解析纯数字字符串 "0.6"
      const num = parseFloat(props.scale);
      if (!isNaN(num)) {
        // 如果是 "0.6" -> 60%，如果是 "60" -> 这种通常不会出现，但为了保险可以根据大小判断，这里假设用户传的是比例
        widthString = num <= 1 ? `${num * 100}%` : `${num}%`;
      }
    }
  }

  return {
    width: widthString,
    // 不需要 max-width calc 了，因为 width: 60% 永远是父容器实际宽度的 60%
  };
});
</script>

<style lang="scss" scoped>
.custom-figure {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 1rem auto;
  max-width: 100%;

  figcaption {
    margin-top: 0.5rem;
    color: #666;
    font-size: 0.9em;
    text-align: center;
  }
}

.image-wrapper {
  position: relative;
  width: 100%;
  border-radius: 4px; // 稍微圆角，更美观
  overflow: hidden; // 保证遮罩不溢出
  transition: all 0.3s ease;

  // 只有在开启遮罩模式时，鼠标才变成手型
  .custom-figure.has-mask & {
    cursor: zoom-in;
  }

  // 展开后（或者不需要遮罩时），如果是遮罩模式下的展开，鼠标变成 zoom-out
  .custom-figure.has-mask &:not(.is-obscured) {
    cursor: zoom-out !important;
  }

  .main-img {
    width: 100%;
    height: auto;
    display: block;
    transition: filter 0.1s ease, transform 0.1s ease;
  }

  // 遮挡状态下的样式
  &.is-obscured {
    background-color: #f0f0f0;

    .main-img {
      filter: blur(12px) brightness(0.9); // 模糊处理
      transform: scale(1.02); // 稍微放大防止模糊边缘漏白
    }
  }
}

// 遮罩层文字/图标样式
.mask-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2;

  span {
    background: rgba(0, 0, 0, 0.6);
    color: #fff;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 500;
    pointer-events: none; // 点击穿透，保证触发 wrapper 的 click
    backdrop-filter: blur(4px);
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  }
}
</style>
