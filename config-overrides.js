// 复写脚手架配置
const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy,
  addWebpackAlias,
} = require("customize-cra");

// 引入path模块， nodejs的一个内置模块，用于解析路径
// resolve用于转换路径
const { resolve } = require("path");
// 加工路径：相对路径==> 绝对路径
function resolvePath(path) {
  return resolve(__dirname, "src", path);
}

module.exports = override(
  // 配置antd样式的按需引入
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true,
  }),
  // 配置antd的自定义主题
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: {
      "@primary-color": "#1DA57A",
    },
  }),
  // 用于支持装饰器语法
  addDecoratorsLegacy(),
  // 用于支持路径提示的设置
  addWebpackAlias({
    "@": resolvePath("./"),
  })
);
