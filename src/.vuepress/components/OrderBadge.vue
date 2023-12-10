<template>
  &thinsp;
  <Badge :text="order.toString()" :type="getColor()" vertical="top" />
</template>

<script>
export default {
  props: {
    order: {
      type: Number,
      required: true,
    },
  },
  methods: {
    getColor() {
      switch (+this.order) {
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
    },
  },
};
</script>
