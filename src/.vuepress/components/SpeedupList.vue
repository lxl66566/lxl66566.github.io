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
    names: ["空に刻んだパラレログラム", "玉响未来", "NEKOPARA"],
    valid_name: "krkr_xp3",
    engine: "krkr",
    save_format: "xp3",
    speedupable: true,
  },
  {
    names: ["樱之刻", "FLIP * FLOP 系列", "终之空Remake"],
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
  {
    names: ["廢村少女~誘惑迷離的籠之鄉~", "戦巫＜センナギ＞ ―穢れた契りと神ころも―"],
    valid_name: "escude",
    engine: "escude",
    save_format: "bin",
    speedupable: true,
  },
  {
    names: ["旭光のマリアージュ"],
    valid_name: "unity",
    engine: "unity",
    save_format: "dat",
    speedupable: true,
  },
  {
    names: ["千の刃涛、桃花染の皇姫", "ジュエリー・ハーツ・アカデミア", "大图书馆的牧羊人", "大图书馆的牧羊人 -Dreaming Sheep-"],
    valid_name: "bgi",
    engine: "bgi",
    save_format: "arc",
    speedupable: true,
  },
  {
    names: ["きまぐれテンプテーション", "Butterfly Seeker"],
    valid_name: "silky",
    engine: "Silky’s engine",
    save_format: "arc",
    speedupable: true,
  },
  {
    names: ["想要传达给你的爱恋"],
    valid_name: "softpal",
    engine: "SOFTPAL ADV SYSTEM",
    save_format: "pac",
    speedupable: true,
  },
  {
    names: ["装甲恶鬼村正"],
    valid_name: "npa",
    engine: "Nitro+",
    save_format: "npa",
    speedupable: true,
  },
  {
    names: ["まほ×ろば -Witches spiritual home-"],
    valid_name: "AKABEiSOFT3",
    engine: "Yaneurao/unknown",
    save_format: "dat",
    speedupable: false,
  },
  {
    names: ["無限煉姦～恥辱にまみれし不死姫の輪舞～"],
    valid_name: "LCSE",
    engine: "LC-ScriptEngine",
    save_format: "lst,_",
    speedupable: true,
  },
  {
    names: ["心之形心之色心之声"],
    valid_name: "krkr_xp3_enc",
    engine: "krkr",
    save_format: "xp3(encrypted)",
    speedupable: true,
  },
];
</script>

<style scoped lang="scss">
td {
  text-align: center;
  vertical-align: middle;
}
</style>
