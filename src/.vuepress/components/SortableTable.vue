<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>番号</th>
          <th>颜值</th>
          <th>演技</th>
          <th>番名</th>
          <th>评价</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in props.rows" :key="row.id">
          <td v-if="!row.otherlink">
            <Av :bg="row.id" :u="row.u" />
          </td>
          <td v-else>
            <a :href="row.otherlink">{{ row.id.toUpperCase() }}</a>
          </td>
          <td>{{ row.aScore }}</td>
          <td>{{ row.bScore }}</td>
          <td>
            <dtlslong v-if="row.name">{{ row.name }}</dtlslong>
          </td>
          <td>
            <dtlslong v-if="row.say">{{ row.say }}</dtlslong>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { AvItemType } from "../definition";
import Av from "./Av.vue";
import dtlslong from "./dtlslong.vue";

const props = defineProps({
  rows: {
    type: Array<AvItemType>,
    required: true,
  },
});
</script>
