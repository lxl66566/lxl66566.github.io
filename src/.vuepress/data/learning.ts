/**
 * 「学习笔记」分区唯一数据源：/learning/ 页 ArticleCell 分区与 navbar
 * 「学习笔记」下拉分区都从这里派生（约定同 data/article.ts）。url 是
 * 相对 /learning/ 的页面链接；外链由 ArticleCell 新窗口打开。
 */
import type { ArticleSection } from './article';

const sections: ArticleSection[] = [
  {
    field: '授课外',
    links: [
      { text: '双拼', url: './ulpb.html' },
      { text: 'typst', url: './typst.html' },
      { text: 'PS', url: './ps.html' },
      { text: '食物制作', url: './foods.html' },
    ],
  },
  {
    field: '语言',
    links: [
      { text: '日本語勉強', url: './japanese.html' },
      { text: 'English learning', url: './english.html' },
      { text: 'external:采样说', url: 'https://t.me/moeyukiquq/98' },
    ],
  },
  {
    field: '大学课程',
    links: [
      { text: '大学物理下 - 电磁学，光学，相对论', url: './physics.html' },
      { text: '复变函数与积分变换', url: './complex_functions.html' },
      { text: '电路分析基础（少量）', url: './circuit_analysis.html' },
      { text: '模电', url: './analog_circuit.html' },
      { text: '信号与系统', url: './signals_and_systems.html' },
      { text: '概率论与数理统计', url: './Probab.Math.Stat.html' },
      { text: '数字系统设计（数电）', url: './dsp.html' },
      { text: '通信电子线路', url: './CEC.html' },
      { text: '数字信号处理', url: './dsp2.html' },
      { text: '计算机网络', url: './network.html' },
      { text: '通信原理', url: './PoC.html' },
      { text: '电磁场与电磁波', url: './electromagnetic_wave.html' },
      { text: '图像处理', url: './image_processing.html' },
      { text: '信息论', url: './information_theory.html' },
    ],
  },
  {
    field: '工作',
    links: [{ text: '计算机网络（专业）', url: './network_biz.html' }],
  },
];

export default sections;
