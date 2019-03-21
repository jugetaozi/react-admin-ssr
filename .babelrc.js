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
			},
		],
		'@babel/plugin-transform-runtime',
		'@babel/plugin-proposal-object-rest-spread',
		'@babel/plugin-syntax-dynamic-import',
		'@babel/plugin-proposal-class-properties',
		'react-hot-loader/babel', // Enables React code to work with HMR.
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
