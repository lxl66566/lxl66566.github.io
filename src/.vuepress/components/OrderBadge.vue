<template>
  &thinsp;
  <Badge :text="text ?? order.toString()" :type="color" vertical="top" />
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  order: {
    type: Number,
    required: true,
  },
  text: {
    type: String,
    required: false,
  },
});

const color = computed(() => {
  switch (+props.order) {
    case 1:
      return "tip";
    case 2:
      return "warning";
    case 3:
      return "danger";
    case 4:
      return "info";
    default:
      return "note";
  }
});
</script>
