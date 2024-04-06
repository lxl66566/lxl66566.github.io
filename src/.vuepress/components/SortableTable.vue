<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>番号</th>
          <th>颜</th>
          <th>演</th>
          <th>备注</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in sortedRows" :key="row.id">
          <td v-if="!row.otherlink">
            <av :bg="row.id" :u="row.u" />
          </td>
          <td v-else>
            <a :href="row.otherlink">{{ row.id.toUpperCase() }}</a>
          </td>
          <td>{{ row.aScore }}</td>
          <td>{{ row.bScore }}</td>
          <td>
            <dtlslong v-if="row.name" :text="row.name" noshort="20" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import av from "./av.vue";
import dtlslong from "./dtlslong.vue";
export default {
  name: "SortableTable",
  components: { av, dtlslong },
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
