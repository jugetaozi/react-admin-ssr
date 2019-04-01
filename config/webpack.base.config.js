'use strict'

const autoprefixer = require('autoprefixer')
const path = require('path')
const webpack = require('webpack')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ProgressBarPlugin = require('progress-bar-webpack-plugin') //引入进度条插件
const HappyPack = require('happypack')
const PostcssFlexbugsFixes = require('postcss-flexbugs-fixes')
const os = require('os')
const HappyPackThreadPool = HappyPack.ThreadPool({
	size: os.cpus().length,
})

const isProdMode = process.env.NODE_ENV === 'production'

const srcResolve = function(file) {
	if (file) {
		return path.join(__dirname, '..', 'src', file)
	} else {
		return path.join(__dirname, '..', 'src')
	}
}

const distResolve = function(file) {
	return path.join(__dirname, '..', 'build', 'static', file)
}

module.exports = {
	entry: {
		index: [
			'@babel/polyfill', //垫片库
			srcResolve('index.js'),
		],
		// admin: srcResolve('admin.js'),//多页应用配置项
	},

	output: {
		path: distResolve(''),
		filename: 'js/[name].js',
	},
	module: {
		rules: [
			// {
			//   test: /\.(js|jsx|mjs)$/,
			//   enforce: 'pre',
			//   use: [
			//     {
			//       options: {
			//         formatter: eslintFormatter,
			//         eslintPath: require.resolve('eslint'),

			//       },
			//       loader: require.resolve('eslint-loader'),
			//     },
			//   ],
			//   include: srcResolve(),
			// },
			{
				test: /\.(js|jsx|mjs)$/,
				// include: srcResolve(),  //所有的都转换为ES5
				// loader: require.resolve('babel-loader'), //换为happypack打包输出
				loader: 'happypack/loader?id=js', //
				//不能再这里加option 否则会覆盖.babelrc
			},
			{
				// "oneOf" will traverse all following loaders until one will
				// match the requirements. When no loader matches it will fall
				// back to the "file" loader at the end of the loader list.
				oneOf: [
					// "url" loader works like "file" loader except that it embeds assets
					// smaller than specified limit in bytes as data URLs to avoid requests.
					// A missing `test` is equivalent to a match.
					{
						test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
						loader: require.resolve('url-loader'),
						options: {
							limit: 10000,
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
					{
						test: /\.(css|less)$/,
						include: srcResolve(),
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									modules: true, //开启css 模块化
									localIdentName: '[local]_[hash:base64:5]',
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									// https://github.com/facebookincubator/create-react-app/issues/2677
									ident: 'postcss',
									plugins: () => [
										PostcssFlexbugsFixes,
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9', // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009',
										}),
									],
								},
							},
							{
								loader: require.resolve('less-loader'),
								options: { javascriptEnabled: true },
							},
						],
					},
					{
						test: /\.(css|less)$/,
						exclude: srcResolve(),
						use: [
							{
								loader: MiniCssExtractPlugin.loader,
							},
							{
								loader: 'happypack/loader?id=css',
								loader: require.resolve('css-loader'),
								options: {
									importLoaders: 1,
									// modules: true,//开启css 模块化
									// localIdentName: '[path][name]__[local]--[hash:base64:5]'
								},
							},
							{
								loader: require.resolve('postcss-loader'),
								options: {
									// Necessary for external CSS imports to work
									// https://github.com/facebookincubator/create-react-app/issues/2677
									ident: 'postcss',
									plugins: () => [
										PostcssFlexbugsFixes,
										autoprefixer({
											browsers: [
												'>1%',
												'last 4 versions',
												'Firefox ESR',
												'not ie < 9', // React doesn't support IE8 anyway
											],
											flexbox: 'no-2009',
										}),
									],
								},
							},
							{
								loader: require.resolve('less-loader'),
								options: { javascriptEnabled: true },
							},
						],
					},
					{
						exclude: [/\.(js|jsx|mjs)$/, /\.html$/, /\.json$/],
						loader: require.resolve('file-loader'),
						options: {
							name: 'static/media/[name].[hash:8].[ext]',
						},
					},
				],
			},
			// ** STOP ** Are you adding a new loader?
			// Make sure to add the new loader(s) before the "file" loader.
		],
	},
	resolve: {
		// modules: ['node_modules', paths.appNodeModules].concat(
		//   process.env.NODE_PATH.split(path.delimiter).filter(Boolean)
		// ),
		// extensions: ['.web.js', '.mjs', '.js', '.json', '.web.jsx', '.jsx'],
		alias: {
			'react-native': 'react-native-web',
			'~': path.resolve(__dirname, '../'),
			api: path.resolve(__dirname, '../src/api'),
			assets: path.resolve(__dirname, '../src/assets'),
			components: path.resolve(__dirname, '../src/components'),
			layouts: path.resolve(__dirname, '../src/layouts'),
			pages: path.resolve(__dirname, '../src/pages'),
			store: path.resolve(__dirname, '../src/store'),
			router: path.resolve(__dirname, '../src/router'),
			utils: path.resolve(__dirname, '../src/utils'),
		},
		// plugins: [
		//   new ModuleScopePlugin(paths.appSrc, [paths.appPackageJson]),
		// ],
	},
	plugins: [
		new ProgressBarPlugin(),
		new HappyPack({
			id: 'js',

			loaders: [{ loader: 'babel-loader', include: srcResolve() }],
			threads: HappyPackThreadPool.size,
			//允许 HappyPack 输出日志
			verbose: true,
		}),
		// new HappyPack({
		// 	id: 'css',
		// 	loaders: [
		// 		{
		// 			loader: MiniCssExtractPlugin.loader,
		// 		},
		// 		{
		// 			loader: 'css-loader',
		// 			options: {
		// 				importLoaders: 1,
		// 			},
		// 		},
		// 		{
		// 			loader: 'postcss-loader',
		// 			options: {
		// 				// Necessary for external CSS imports to work
		// 				// https://github.com/facebookincubator/create-react-app/issues/2677
		// 				ident: 'postcss',
		// 				plugins: () => [
		// 					PostcssFlexbugsFixes,
		// 					autoprefixer({
		// 						browsers: [
		// 							'>1%',
		// 							'last 4 versions',
		// 							'Firefox ESR',
		// 							'not ie < 9', // React doesn't support IE8 anyway
		// 						],
		// 						flexbox: 'no-2009',
		// 					}),
		// 				],
		// 			},
		// 		},
		// 		{
		// 			loader: 'less-loader',
		// 			options: { javascriptEnabled: true },
		// 		},
		// 	],
		// 	threads: HappyPackThreadPool.size,
		// 	//允许 HappyPack 输出日志
		// 	verbose: true,
		// }),

		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: 'css/[name].css',
			chunkFilename: 'css/common.css', //非入口文件的依赖
		}),
	],
	optimization: {
		splitChunks: {
			// 打包 node_modules里的代码
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: 'vendor',
					chunks: 'all',
				},
			},
		},
		// runtimeChunk: true, // 打包 runtime 代码
	},
}
