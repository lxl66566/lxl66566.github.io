<template>
  <IntervalGraph :dateArray="data" />
</template>

<script>
import IntervalGraph from "./IntervalGraph.vue";

const dateArray = ["2020-01-01", "2020-01-02", "2020-01-04", "2020-01-08", "2020-01-10", "2020-01-12"];
export default {
  components: {
    IntervalGraph,
  },
  computed: {
    data() {
      return dateArray;
    },
  },
};
</script>
