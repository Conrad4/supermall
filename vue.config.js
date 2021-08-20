const path = require("path"); //引入path模块
function resolve(dir) {
  return path.join(__dirname, dir); //path.join(__dirname)设置绝对路径
}

//  另一种写法： const resolve = (dir) => path.join(__dirname, dir);
module.exports = {
  configureWebpack: {
    // 别名配置
    resolve: {
      alias: {
        //'src': '@', 默认已配置
        assets: "@/assets",
        common: "@/common",
        components: "@/components",
        network: "@/network",
        views: "@/views",
      },
    },
    // 使用前面可加~
  },
};
