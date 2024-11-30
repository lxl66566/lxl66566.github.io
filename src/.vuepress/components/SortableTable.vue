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
        <tr v-for="row in props.rows" :key="row.id">
          <td v-if="!row.otherlink">
            <av :bg="row.id" :u="row.u" />
          </td>
          <td v-else>
            <a :href="row.otherlink">{{ row.id.toUpperCase() }}</a>
          </td>
          <td>{{ row.aScore }}</td>
          <td>{{ row.bScore }}</td>
          <td>
            <dtlslong v-if="row.name">{{ row.name }}</dtlslong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import av from "./av.vue";
import dtlslong from "./dtlslong.vue";
import type { AvItemType } from "../definition";

const props = defineProps({
  rows: {
    type: Array<AvItemType>,
    required: true,
  },
})

</script>
