<template>
  <div ref="container" style="width: 100%; height: 260px"></div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
    },
    para: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      data: [],
      linePlot: null,
    };
  },
  mounted() {
    this.generatePlot();
  },
  watch: {
    data: "generatePlot",
  },
  methods: {
    async generatePlot() {
      try {
        // 使用动态import来导入模块，否则 build 报错
        const { Line } = await import("@antv/g2plot");
        const temp = this.data;
        console.log(temp);
        console.log(this.para);
        this.linePlot = new Line(this.$refs.container, {
          temp,
          ...this.para,
          useDeferredLabel: true,
          connectNulls: false,
          legend: {
            position: "top",
          },
          slider: {
            start: 0,
            end: 1,
          },
        });

        this.linePlot.render();
      } catch (error) {
        console.error("Error loading @antv/g2plot:", error);
      }
    },
  },
};
</script>

<style>
body {
  background-color: white;
  color: black;
}

@media (prefers-color-scheme: dark) {
  body {
    background-color: #22272e;
    color: white;
  }
}
</style>
