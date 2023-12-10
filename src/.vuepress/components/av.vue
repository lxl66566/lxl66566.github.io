<template>
  <a :href="generateLink()" target="_blank">{{ formatText() }}</a>
</template>

<script>
export default {
  props: {
    bg: {
      type: String,
      required: true,
    },
    u: {
      type: Boolean,
      required: false,
      default: false,
    }
  },
  methods: {
    generateLink() {

      return `https://missav.com/${this.bg}${this.u ? "-uncensored-leak" : ""}`;
    },
    formatText() {
      return this.bg.toUpperCase();
    },
  },
};
</script>
