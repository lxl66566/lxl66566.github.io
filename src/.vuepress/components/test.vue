<template>
  <LinePlot :para="para" />
</template>

<script>
import LinePlot from './LinePlot.vue';
const para = {
  data: [{ x: "0", y: "0" }, { x: "1", y: "1" }, { x: "2", y: "2" }],
  xField: "x",
  yField: "y",
};
export default {
  components: {
    LinePlot,
  },
  computed: {
    para() {
      return para;
    },
  }
};
</script>