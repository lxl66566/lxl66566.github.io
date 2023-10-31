<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>番号</th>
          <th>颜</th>
          <th>演</th>
          <th>番名</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sortedRows" :key="row.id">
          <td v-if="!row.otherlink">
            <av :bg="row.id" :u="row.u" />
          </td>
          <td v-if="row.otherlink">
            <a :href="row.otherlink">{{ row.id }}</a>
          </td>
          <td>{{ row.aScore }}</td>
          <td>{{ row.bScore }}</td>
          <td>
            <details v-if="row.name">
              <summary>点击展开</summary>
              {{ row.name }}
            </details>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import av from "./av.vue";
export default {
  name: "SortableTable",
  components: { av },
  props: {
    rows: {
      type: Array,
      required: true,
    },
  },
  computed: {
    sortedRows() {
      // 同分则颜值分优先
      return this.rows.sort((a, b) => {
        const aScore = a.aScore + a.bScore;
        const bScore = b.aScore + b.bScore;
        return bScore - aScore || b.aScore - a.aScore;
      });
    },
  },
};
</script>
