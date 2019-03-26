// const config = {

// 	port: 8888,
// 	secretkey: '4b32f3166d1de8fd8f89e775aee33f255adf443d9ceefda4f576987b7486d37fdf46f73086cf28846024475d066ea048', //密钥
// 	database: {
// 		DATABASE: 'xcentz',
// 		USERNAME: 'google',
// 		PASSWORD: 'Xcentz_1', //Xcentz_1
// 		PORT: '3306',
// 		HOST: '47.88.50.243'//47.88.50.243
// 	}
// }

// const config = {
// 	port: 8080,//生产环境
// 	secretkey:
// 		'4b32f3166d1de8fd8f89e775aee33f255adf443d9ceefda4f576987b7486d37fdf46f73086cf28846024475d066ea048', //密钥
// 	database: {
// 		DATABASE: 'xcentz',
// 		USERNAME: 'root',
// 		PASSWORD: 'Xcentz!@#$%12345', //Xcentz_1
// 		PORT: '3306',
// 		HOST: '47.88.50.243', //47.88.50.243
// 	},
// 	excelHeader: [
// 		'YLNum',
// 		'sku',
// 		'asin',
// 		'name',
// 		'supplier',
// 		'category',
// 		'subcategory',
// 		'state',
// 		'color',
// 		'quantity',
// 		'WireLength',
// 		'TerminalMaterial',
// 		'ExternalMaterial',
// 		'mouths',
// 		'Technology',
// 		'capacity',
// 		'AdapterType',
// 	],
// }

const config = {
	port: 8885,
	secretkey:
		'4b32f3166d1de8fd8f89e775aee33f255adf443d9ceefda4f576987b7486d37fdf46f73086cf28846024475d066ea048', //密钥
	database: {
		DATABASE: 'xcentz',
		USERNAME: 'userroot',
		PASSWORD: '1qaz2wsx!@#',
		PORT: '3306',
		HOST: '10.10.1.60',
	},
		excelHeader: [
			'YlNum',
			'sku',
			'asin',
			'name',
			'supplier',
			'category',
			'subcategory',
			'state',
			'color',
			'quantity',
			'WireLength',
			'TerminalMaterial',
			'ExternalMaterial',
			'mouths',
			'Technology',
			'capacity',
			'AdapterType',
		],
}

// const config = {
// 	port: 8888,

// 	database: {
// 		DATABASE: 'xcentz_local',
// 		USERNAME: 'root',
// 		PASSWORD: 'Aa123456',
// 		PORT: '3306',
// 		HOST: 'localhost',
// 	},
// 	excelHeader: [
// 		'YLNum',
// 		'sku',
// 		'asin',
// 		'name',
// 		'supplier',
// 		'category',
// 		'subcategory',
// 		'state',
// 		'color',
// 		'quantity',
// 		'WireLength',
// 		'TerminalMaterial',
// 		'ExternalMaterial',
// 		'mouths',
// 		'Technology',
// 		'capacity',
// 		'AdapterType',
// 	],
// }

module.exports = config
