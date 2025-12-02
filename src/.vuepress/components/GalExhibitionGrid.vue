<template>
  <div>
    <table v-for="items in chunkedItems">
      <thead>
        <tr>
          <th v-for="item in items">
            <a :href="item.lnk" target="_blank">{{ item.text }}</a>
          </th>

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

<script lang="ts" setup>
import { computed } from "vue";

type ExhibitionItemType = { src: string; alt: string; text: string; lnk: string };

const props = defineProps({
  items: {
    type: Array<ExhibitionItemType>,
    required: true,
  },
});

const chunkedItems = computed(() => {
  const chunkSize = 4;
  const result: ExhibitionItemType[][] = [];
  for (let i = 0; i < props.items.length; i += chunkSize) {
    result.push(props.items.slice(i, i + chunkSize));
  }
  return result;
});
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
