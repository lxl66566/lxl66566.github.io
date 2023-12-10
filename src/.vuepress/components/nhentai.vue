<template>
  <a :href="generateLink()" target="_blank">{{ id }}</a>
</template>

<script>
export default {
  props: {
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    generateLink() {
      return `https://nhentai.net/g/${this.id.toString()}`;
    },
  },
};
</script>
