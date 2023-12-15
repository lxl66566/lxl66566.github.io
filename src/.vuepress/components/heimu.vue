<template>
  <span :title="alt">
    <slot></slot>
  </span>
</template>

<script>
export default {
  props: {
    alt: {
      type: String,
      required: false,
      default: "你知道的太多了",
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: inherit;
}

span,
span a,
a span,
span a.new {
  background-color: #404040;
  color: #404040;
  text-shadow: none;
}

span:hover,
span:active,
span:hover span,
span:active span {
  color: white !important;
}

span:hover a,
a:hover span,
span:active a,
a:active span {
  color: lightblue !important;
}

span:hover span.new,
span span.new:hover,
span.new:hover span,
span:active span.new,
span span.new:active,
span.new:active span {
  color: #ba0000 !important;
}
</style>
