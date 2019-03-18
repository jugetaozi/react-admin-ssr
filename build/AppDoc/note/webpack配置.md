## purifycss-webpack
- 打包编译时，可剔除页面和js中未被使用的css，这样使用第三方的类库时，只加载被使用的类，大大减小css体积

## mini-css-extract-plugin
这个插件将CSS解压到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。extract-text-webpack-plugin该插件在webpack4中不再建议使用
npmjs：https://www.npmjs.com/package/mini-css-extract-plugin

示例
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/common.css'
  }),

