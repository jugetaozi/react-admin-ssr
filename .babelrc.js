module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				forceAllTransforms: process.env === 'production',
			},
		],
		'@babel/preset-react',
	],
	plugins: [
		[
			'@babel/plugin-proposal-decorators',
			{
				legacy: true,
			},//装饰器
		],
		'@babel/plugin-transform-runtime',
		// '@babel/plugin-proposal-object-rest-spread',//polyfill替代
		// '@babel/plugin-syntax-dynamic-import',//polyfill替代
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
