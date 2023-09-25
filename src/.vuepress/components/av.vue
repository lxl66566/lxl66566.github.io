<template>
  <a :href="generateLink()">{{ formatText() }}</a>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      required: true,
    },
  },
  methods: {
    generateLink() {
      return `https://missav.com/${this.bg}`;
    },
    formatText() {
      return this.bg.toUpperCase();
    },
  },
};
</script>
