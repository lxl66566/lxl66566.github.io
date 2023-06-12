export default ({
  Vue, // VuePress 正在使用的 Vue 构造函数
  router, // 当前应用的路由实例
}) => {
  const pangujs = document.createElement("script");
  pangujs.src = "./styles/pangu.min.js";
  pangujs.async = true;
  pangujs.defer = true;
  document.body.appendChild(pangujs);
  console.log("pangu installed");
};
