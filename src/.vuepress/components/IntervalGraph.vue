<template>
  <div>
    <div style="text-align: center">
      <p id="average" style="font-size: 10px">{{ calculateAverage }}</p>
    </div>
    <LinePlot :data="transformDateArray" :para="para" />
  </div>
</template>

<script>
import LinePlot from "./LinePlot.vue";

export default {
  props: {
    dateArray: {
      type: Array,
      required: true,
    },
  },
  components: {
    LinePlot,
  },
  data() {
    return {
      data: [],
    };
  },
  computed: {
    transformDateArray() {
      const dateArray = this.dateArray;
      if (dateArray.length < 2) {
        console.error("Input dateArray should have at least two dates.");
        return [];
      }

      const calculateDateInterval = (startDate, endDate) => {
        const oneDay = 24 * 60 * 60 * 1000;
        const startTimestamp = new Date(startDate).getTime();
        const endTimestamp = new Date(endDate).getTime();
        const daysDifference = Math.round(Math.abs((startTimestamp - endTimestamp) / oneDay));
        return daysDifference;
      };

      const data = [];
      for (let i = 1; i < dateArray.length; i++) {
        const currentDate = dateArray[i];
        const previousDate = dateArray[i - 1];
        const interval = calculateDateInterval(previousDate, currentDate);
        data.push({
          date: currentDate,
          interval: interval,
        });
      }
      return data;
    },
    calculateAverage() {
      const temp = this.transformDateArray;
      const totalInterval = temp.reduce((acc, item) => acc + item.interval, 0);
      const average = totalInterval / temp.length;
      return `average: ${average.toFixed(6)}`;
    },
    para() {
      return {
        xField: "date",
        yField: "interval",
      };
    },
  },
};
</script>
