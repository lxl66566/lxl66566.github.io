import type { ArticleCellBoxType } from "../definition/types.js";

const links: ArticleCellBoxType[] = [
  {
    field: "授课外",
    links: [
      { text: "双拼", url: "ulpb" },
      { text: "typst", url: "typst" },
      { text: "PS", url: "ps" },
      { text: "食物制作", url: "foods" },
    ],
  },
  {
    field: "语言",
    links: [
      { text: "日本語勉強", url: "japanese" },
      { text: "English learning", url: "english" },
      { text: "external:采样说", url: "https://t.me/moeyukiquq/98" },
    ],
  },
  {
    field: "大学课程",
    links: [
      { text: "大学物理下 - 电磁学，光学，相对论", url: "physics" },
      { text: "复变函数与积分变换", url: "complex_functions" },
      { text: "电路分析基础（少量）", url: "circuit_analysis" },
      { text: "模电", url: "analog_circuit" },
      { text: "信号与系统", url: "signals_and_systems" },
      { text: "概率论与数理统计", url: "Probab.Math.Stat" },
      { text: "数字系统设计（数电）", url: "dsp" },
      { text: "通信电子线路", url: "CEC" },
      { text: "数字信号处理", url: "dsp2" },
      { text: "计算机网络", url: "network" },
      { text: "通信原理", url: "PoC" },
      { text: "电磁场与电磁波", url: "electromagnetic_wave" },
      { text: "图像处理", url: "image_processing" },
      { text: "信息论", url: "information_theory" },
    ],
  },
];
export default links;
