<template>
  <a :href="link" target="_blank">{{ id }}</a>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps({
  id: {
    type: String,
    required: true,
  },
});

const link = computed(() => `https://nhentai.net/g/${props.id}`);
</script>
