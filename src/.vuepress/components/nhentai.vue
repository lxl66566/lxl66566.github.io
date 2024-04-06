<template>
  <a :href="generateLink()" target="_blank">{{ id }}</a>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  methods: {
    generateLink() {
      return `https://nhentai.net/g/${this.id}`;
    },
  },
};
</script>
