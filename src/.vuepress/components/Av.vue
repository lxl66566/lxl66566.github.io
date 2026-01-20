<template>
  <a :href="generateLink" target="_blank">{{ formattedText }}</a>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  /**
   * bangumi，番号
   */
  bg: {
    type: String,
    required: true,
  },
  /**
   * 是否 uncensored-leak
   */
  u: {
    type: Boolean,
    required: false,
    default: false,
  },
});

const generateLink = computed(() =>
  `https://missav.ai/${props.bg}${props.u ? "-uncensored-leak" : ""}`
);
const formattedText = computed(() => props.bg.toUpperCase());
</script>
