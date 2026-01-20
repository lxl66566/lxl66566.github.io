import { DateCompare, JobItemInputType } from "../definition/index.js";

const job_list_2024_autumn: JobItemInputType[] = [
  {
    name: "字节",
    job: "测开（开发者服务）",
    by: "内推",
    time: "2024-09-04",
    result: "一面挂",
  },
  {
    name: "上海海隆",
    job: "赴日开发",
    by: "学校招聘会",
    time: "2024-10-10",
    result: "二面",
    offer: true,
  },
  {
    name: "凌极",
    job: "全栈",
    by: "学校招聘会",
    time: "2024-10-10",
    result: "面试",
  },
  {
    name: "华为",
    job: "智驾部门 测试",
    by: "学校招聘会",
    time: "2024-10-11",
    result: "二面 + 主管面挂",
  },
  {
    name: "小米",
    job: "软件研发工程师",
    by: "官网",
    time: "2024-10-14",
    result: "笔试",
  },
  {
    name: "ベース株式会社",
    job: "赴日开发",
    by: "BOSS",
    time: "2024-10-17",
    result: "一面",
    offer: true,
  },
  {
    name: "拼多多",
    job: "服务端研发工程师",
    by: "BOSS转内推",
    time: "2024-10-24",
    result: "三面 + HR 面",
    offer: true,
  },
  {
    name: "小红书",
    job: "运维开发",
    by: "官网",
    time: "2024-10-25",
    result: "一面",
  },
  {
    name: "双隆投资",
    job: "量化系统",
    by: "BOSS",
    time: "2024-11-01",
    result: "电话交流",
  },
  {
    name: "伴芯科技",
    job: "C++",
    by: "BOSS",
    time: "2024-11-26",
    result: "二面",
  },
  {
    name: "新凯来",
    job: "软件开发",
    by: "BOSS 转官网",
    time: "2024-11-27",
    result: "笔试 + 测评",
  },
  {
    name: "欢乐互娱",
    job: "后端",
    by: "BOSS",
    time: "2024-12-02",
    result: "一面挂",
  },
  {
    name: "上海猎户旋臂",
    job: "Python 后端",
    by: "BOSS",
    time: "2024-12-16",
    result: "二面",
    offer: true,
  },
  {
    name: "源语真解",
    job: "Rust 后端",
    by: "BOSS",
    time: "2024-12-17",
    result: "电话交流 *2，终止",
  },
];

const job_list_2024_spring: JobItemInputType[] = [
  {
    name: "腾讯",
    job: "PC 客户端",
    by: "网站",
    time: "2024-03-07",
    result: "一面 + 笔试",
  },
  {
    name: "拼多多",
    job: "客户端其他",
    by: "牛客转网站",
    time: "2024-03-08",
    result: "测评 + 笔试挂",
  },
  {
    name: "达坦科技",
    job: "Rust 分布式存储",
    by: "牛客",
    time: "2024-03-09",
    result: "面试 + 笔试",
    offer: true,
  },
];

job_list_2024_spring.sort((x, y) => DateCompare(x.time, y.time));
job_list_2024_autumn.sort((x, y) => DateCompare(x.time, y.time));

export { job_list_2024_autumn, job_list_2024_spring };
