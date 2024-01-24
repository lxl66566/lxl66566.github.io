<template>
  <ExhibitionTable :items="data">
  </ExhibitionTable>
</template>

<script>
import ExhibitionTable from './ExhibitionTable.vue';


export default {
  components: {
    ExhibitionTable,
  },
  computed: {
    data() {
      return data;
    },
  },
};

const data = [
  { text: "矛盾", alt: "水葬銀貨のイストリア", src: "/images/hobbies/galgame/suisouginka.jpg" },
  { text: "命运", alt: "ISLAND", src: "/images/hobbies/galgame/island.jpg" },
  { text: "苦痛", alt: "euphoria", src: "/images/hobbies/galgame/euphoria.jpg" },
  { text: "幻梦", alt: "冥契的牧神节", src: "/images/hobbies/galgame/meikeinoruperukaria.jpg" },
  { text: "意义", alt: "秽翼的尤斯蒂娅", src: "/images/hobbies/galgame/Aiyoku_no_Eustia.jpg" },
]

</script>
