<template>
  <div>
    <table v-for="items in chunkedItems">
      <thead>
        <tr>
          <th v-for="item in items">{{ item.text }}</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td v-for="item in items">
            <img :src="item.src" :alt="item.alt ?? item.text" class="medium-zoom-image" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      required: true,
    },
  },
  computed: {
    chunkedItems() {
      const chunkSize = 4;
      const result = [];
      for (let i = 0; i < this.items.length; i += chunkSize) {
        result.push(this.items.slice(i, i + chunkSize));
      }
      return result;
    },
  },
};
</script>

<style scoped>
img {
  width: 180px;
  height: 250px;
  object-fit: cover;
}

div {
  justify-content: center;
  align-items: center;
  width: inherit;
  overflow: auto;
}

table {
  margin: 0;
  width: 740px;
  border-collapse: collapse;
}

th,
td {
  margin: 0;
  text-align: center;
  overflow: auto;
  width: 180px;
  height: auto;
  max-height: 274px;
  padding: 0;
}
</style>
