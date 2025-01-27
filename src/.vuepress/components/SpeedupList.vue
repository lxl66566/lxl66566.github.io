<template>
  <div>
    <table>
      <thead>
        <tr>
          <th v-for="h in '游戏名 游戏引擎 存档格式 成功拆包加速'.split(' ')">{{ h }}</th>
        </tr>
      </thead>
      <tbody>
        <ExpandableListItem v-for="item in data" :expandable="useSlots()[item.valid_name] != undefined">
          <template #list-content>
            <td>
              <span v-for="(name, index) in item.names">
                {{ name }}
                <br v-if="index < item.names.length - 1" />
              </span>
            </td>
            <td>{{ item.engine ?? "-" }}</td>
            <td>{{ item.save_format ?? "-" }}</td>
            <td>{{ item.speedupable ? "✅" : "❌" }}</td>
          </template>
          <template #expanded-content>
            <slot :name="item.valid_name"></slot>
          </template>
        </ExpandableListItem>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import { useSlots } from "vue";
import ExpandableListItem from "./ExpandableListItem.vue";

type SpeedupItemType = {
  names: string[];
  /**
   * 插槽唯一标识
   */
  valid_name: string;
  engine?: string;
  save_format?: string;
  speedupable: boolean;
};

const data: SpeedupItemType[] = [
  {
    names: ["空に刻んだパラレログラム"],
    valid_name: "krkr_xp3",
    engine: "krkr",
    save_format: "xp3",
    speedupable: true,
  },
  {
    names: ["樱之刻"],
    valid_name: "Artemis",
    engine: "Artemis Engine",
    save_format: "pfs",
    speedupable: true,
  },
  {
    names: ["五彩斑斓的世界(HD 4K重置版)"],
    valid_name: "favorite",
    engine: "FPV",
    save_format: "bin",
    speedupable: true,
  },
  {
    names: ["魔法使之夜(remake, steam)"],
    valid_name: "WOH",
    engine: "",
    save_format: "hfa",
    speedupable: false,
  },
  {
    names: ["アンレス テルミナリア"],
    valid_name: "ypf",
    engine: "Yu-Ris",
    save_format: "ypf",
    speedupable: false,
  },
];
</script>

<style scoped lang="scss">
td {
  text-align: center;
  vertical-align: middle;
}
</style>
