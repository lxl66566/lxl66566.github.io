<template>
  <a :href="generateLink()" target="_blank">{{ id }}</a><span v-if="bak"> | <a :href="bak">bak</a></span>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
    bak: {
      type: String,
      default: false,
    }
  },
  methods: {
    generateLink() {
      return `https://nhentai.net/g/${this.id.toString()}`;
    },
  },
};
</script>
