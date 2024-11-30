<template>
  <details v-if="textLength > +props.fold">
    <summary>{{ alt }}</summary>
    <span ref="slotContainer">
      <slot></slot>
    </span>
  </details>
  <span v-else ref="slotContainer">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch, computed } from "vue";

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

const props = defineProps({
  alt: {
    type: String,
    required: false,
    default: "点击展开",
  },
  text: {
    type: String,
    required: false,
  },
  fold: {
    type: Number,
    required: false,
    default: 20,
  },
});
</script>
