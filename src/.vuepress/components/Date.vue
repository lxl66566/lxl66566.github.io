<template>
  <time :datetime="date">{{ date }}</time>
</template>

<script setup lang="ts">
defineProps<{
  date: string;
}>();
</script>
