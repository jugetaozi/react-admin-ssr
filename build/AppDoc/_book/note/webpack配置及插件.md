# mini-css-extract-plugin

这个插件将 CSS 解压到单独的文件中。它为每个包含 CSS 的 JS 文件创建一个 CSS 文件。extract-text-webpack-plugin 该插件在 webpack4 中不再建议使用
npmjs：https://www.npmjs.com/package/mini-css-extract-plugin

示例
new MiniCssExtractPlugin({
filename: 'css/[name].css',
chunkFilename: 'css/common.css'
}),

## @babel/preset-env 会根据环境自动切换是否转换为 ES5 @babel/preset-react 转换 react 的语法

- webpack 配置需要全局使用 babel-env

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

# clean-webpack-plugin

在 webpack 中 clean-webpack-plugin 这也是一款很常用的插件。看字面的意思，我们就知道它是用来做什么的，没错，它就是用来删除文件夹的，确切的说是删除 webpack 打包后的文件夹以及文件

### 为什么要删除文件？

我们之前讨论过 output 里面的三个属性

- hash 工程项目级别，如果修改了项目中的一个文件，对，就是一个文件，打包后，所有文件的 hash 码全部更新并且一致，如下图所示

![img](https:////upload-images.jianshu.io/upload_images/4736463-61a1b2aa36cccfb8.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/950/format/webp)

image

- chunkhash 文件级别，如果修改了项目中的一个文件，那么只有这个文件和于这个文件相关联的打包文件的 hasn 码变化，其他的不变，如下图所示

![img](https:////upload-images.jianshu.io/upload_images/4736463-4337ff178e0b9dcc.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/950/format/webp)

image

- contenthash 在分离 css 文件时需要使用 contenthash，js 文件里引用了 css（less，scss 也是同理），这时候需要用 contenthash，以保证 css 文件修改后，打包过后的 hash 码变化

### 关于 hash 多说几句

#### 打包为什么添加 hash？

如果不加 hash 码，每次打包出来的文件名都是一样的，然而用户设备里是存在缓存的，除非用户清除缓存（这显然不现实）所以添加 hash 码保证文件的唯一性，文件不被用户缓存。

#### 有 hash 就够了，为什么还要用 chunkhash

是的，只用 hash 完全能够满足需要，hash 是工程级别的，如果项目里但凡有一个文件有改动，打包后的 hash 码就会更新，所有文件的 hash 码都会更新，而且都是一样的 hash 码，所以问题来了，如果我们的项目很大，我们只是修改了一个 bug 或是一个页面，却需要用户重新更新所有文件，用户体验大大降低了。

这时候 chunkhash 出现了，他是文件级别的，一般我们在 output 的 chunkFilename 中使用它，在 outpput 的 filename 中使用 hash，在 css 分离的时候使用 contenthash，当然事无绝对，我们应该见机行事，如果担心写错了，可以全部用 hash 代替，就是牺牲一些用户体验罢了，牺牲多少呢？项目越大，牺牲越大
关于 hash 的具体介绍参见我之前的文章[从零搭建 webpack4 之 output 输出](https://www.qdtalk.com/2018/11/12/0webpack4/)

言归正传 ，为什么要删除文件呢？
我们在打包的 output 中使用了 hash 码，使文件名是唯一的，然后我们的开发会继续，开发不息，打包不止，看图
第一次打包

![img](https:////upload-images.jianshu.io/upload_images/4736463-56b208582c405115.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/928/format/webp)

image

更改了一下页面，进行第二次打包

![img](https:////upload-images.jianshu.io/upload_images/4736463-7e2ae32f69774619.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/906/format/webp)

image

又一次修改页面，进行第三次打包

![img](https:////upload-images.jianshu.io/upload_images/4736463-0fa5d5c487da2ee4.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/896/format/webp)

image

。。。

dist 文件夹会越来越大，当然你可以选择手动删除，但是在服务器上呢？手动删除来得及吗？手动删除不觉得很 low 吗？

### clean-webpack-plugin 如何使用

使用起来相当简单了
明确一点，这个插件实在打包的时候使用的
看代码片段

```
//部分代码省略
const CleanWebpackPlugin = require('clean-webpack-plugin')
module.exports = {
    plugins: [
new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      dry: false // 启用删除文件
    }),
    ]
}
//无关代码省略
```

这是最简单也是最常用的配置
实例化 CleanWebpackPlugin 有两个参数，
第一个是填写要删除的路径，格式是个数组，我们看一下[官网](https://www.npmjs.com/package/clean-webpack-plugin)的例子

```
[
  'dist',         // removes 'dist' folder删除dist文件夹
  'build/*.*',    // removes all files in 'build' folder删除build文件夹下的所有文件
  'web/*.js'      // removes all JavaScript files in 'web' folder删除web文件件下的所有技术文件
]
```

第二个参数是对象类型的配置，继续看官网的例子

```
{
  // Absolute path to your webpack root folder (paths appended to this)
  // Default: root of your package
  root: __dirname,

  // Write logs to console.
  verbose: true,

  // Use boolean "true" to test/emulate delete. (will not remove files).
  // Default: false - remove files
  dry: false,

  // If true, remove files on recompile.
  // Default: false
  watch: false,

  // Instead of removing whole path recursively,
  // remove all path's content with exclusion of provided immediate children.
  // Good for not removing shared files from build directories.
  exclude: [ 'files', 'to', 'ignore' ],

  // allow the plugin to clean folders outside of the webpack root.
  // Default: false - don't allow clean folder outside of the webpack root
  allowExternal: false

  // perform clean just before files are emitted to the output dir
  // Default: false
  beforeEmit: false
}
```

#### root

root：绝对路径，就是要根据这个 root 去找要删除的文件夹，默认是这个 webpack 配置文件所在额目录也就是\_\_dirname,关于路径问题，我们之前在[从零搭建 webpack4（mode 和 entry）](https://www.qdtalk.com/2018/11/11/%E4%BB%8E%E9%9B%B6%E6%90%AD%E5%BB%BAwebpack4%EF%BC%88mode%E5%92%8Centry%EF%BC%89/)讨论过，简单复习一下，

![img](https:////upload-images.jianshu.io/upload_images/4736463-9a14c015fe0e823a.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/446/format/webp)

image

webpack 的配置文件时 webpack.config.js,它在 build 目录下，也就是说 webpack.config.js 的路径是\_\_dirname，要找到 dist 目录即

```
path.resolve(__dirname, '..')
```

root 的默认值就是\_\_dirname

#### verbose

verbose 这个没什么说的了，昨天说 happypack 的时候提过这个，就是控制台打印日志，默认是 true

#### dry

这是主要功能了，为 false 是删除文件夹的，为 true 是不删除的，默认值是 false

#### watch

watch 在编译的时候删除打包文件，就是在你 npm start 或者 npm run dev，等跑本地服务的时候，删除之前的打包文件，
感觉这个功能好鸡肋啊，没啥大用

#### exclude

排除不删除的目录，主要用于避免删除公用的文件
这个 exclude 不常用，我本地跑 demo 如下，
看一下 dist 目录结构

![img](https:////upload-images.jianshu.io/upload_images/4736463-64b742e509472f78.png?imageMogr2/auto-orient/strip%7CimageView2/2/w/636/format/webp)

image

代码如下

```
//部分代码省略
new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '..'),
      exclude: ['assets'],
      verbose: true,
      dry: false
    }),
```

可以排除 assets 文件夹不被删除,也就是说可以排除 dist 的下一级目录不被删除，想 assets，index.html(排除这个只是为了测试)，
但是想要保留 assets/images，就不能这样来实现了，但是可以“曲线救国”,代码如下，

```
 new CleanWebpackPlugin(['dist/assets/js', 'dist/index.html'], {
      root: path.resolve(__dirname, '..'),
      verbose: true,
      dry: false
    }),
```

#### allowExternal

允许插件清理 webpack 根目录之外的文件夹。默认:false -不允许清除 webpack 根目录之外的文件夹

#### beforeEmit

在文件被发送到输出目录之前执行 clean 操作,默认值:false

## 总结

clean-webpack-plugin 功能不少，但是在实际生产中，我们经常用到的就那么两个，掌握这几个，基本可以无障碍使用 clean-webpack-plugin 了

- root，配置要删除的路径
- dry，是否要删除
  今天就到这里，明天不见不散
  昨日回顾
  [ webpack4 两个常用的 plugin 之 happypack 和 mini-css-extract-plugin](https://www.qdtalk.com/2018/11/16/webpack4plugin-2/)

# happypack

多线程执行任务，加快编译速度

```
const HappyPack = require('happypack');
const os = require('os');
const happyThreadPool = HappyPack.ThreadPool({ size: os.cpus().length });

//plugin
  new HappyPack({
    id: 'less',
    threadPool: happyThreadPool,
    loaders: [{
      loader: 'less-loader',
      options:{}
    }]
  }),
```

# compression-webpack-plugin 
- 压缩减少50%以上 部分浏览器原生支持 

const CompressionWebpackPlugin = require('compression-webpack-plugin') //压缩文件

new CompressionWebpackPlugin({
			filename: '[path].gz[query]', //asset不被支持 改为filename =>目标资产名称。文件被替换为原始资产。路径将替换为原始资产的路径并使用查询进行查询 默认:[path].gz[query]
			algorithm: 'gzip', //可以是（缓冲区，cb）=> cb（缓冲区），或者如果使用了{String}，则该算法取自zlib` 默认gzip
			test: new RegExp('\\.(js|css)$'), //所有匹配此{RegExp}的资产都会被处理
			// threshold: 1024, //只处理大于此大小的资产。以字节为单位
			// minRatio: 0.8, //只有压缩率小于这个比率的资产才能被处理
			// deleteOriginalAssets: true, //是否删除原始资产
		}),
