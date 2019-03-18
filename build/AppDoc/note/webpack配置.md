## mini-css-extract-plugin
这个插件将CSS解压到单独的文件中。它为每个包含CSS的JS文件创建一个CSS文件。extract-text-webpack-plugin该插件在webpack4中不再建议使用
npmjs：https://www.npmjs.com/package/mini-css-extract-plugin

示例
  new MiniCssExtractPlugin({
    filename: 'css/[name].css',
    chunkFilename: 'css/common.css'
  }),

## @babel/preset-env 会根据环境自动切换是否转换为ES5 @babel/preset-react 转换react的语法 
-  webpack配置需要全局使用babel-env

```
"presets": [
		[
			"@babel/preset-env",
			{
				"targets": {
					"uglify": true //支持uglify插件 在打包时候转换为ES5语法  已被弃用
				},
        {
				"forceAllTransforms": true//强制转换为ES5
        }
			}
		],
		"@babel/preset-react"
	],

  module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				forceAllTransforms: process.env === 'production',//切换为js模式  判断当前环境 如果为生产环境 则转换为ES5
			},
		],
		'@babel/preset-react',
	],
	plugins: [
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true,
			},
		],
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-class-properties',
		[
			'import',
			{
				libraryDirectory: 'es',
				libraryName: 'antd',
				style: true,
			},
		],
	],
} 
```