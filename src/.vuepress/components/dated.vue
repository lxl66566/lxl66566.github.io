<template>
  <div>
    ——<time :datetime="formattedDate">{{ formattedDate }}</time>
  </div>
</template>

<script>
export default {
  props: {
    date: {
      type: String,
      required: true,
    },
  },
  computed: {
    formattedDate() {
      // 将输入日期字符串格式化为 "YYYY-MM-DD"
      return this.date.replace(/(\d{4})(\d{2})(\d{2})/, "$1-$2-$3");
    },
  },
};
</script>

<style scoped>
div {
  text-align: right;
  font-style: italic;
}
</style>
