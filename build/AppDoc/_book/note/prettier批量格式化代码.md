```
module.exports = {
  printWidth: 80, //设置prettier单行输出（不折行）的（最大）长度。
  semi: false, //在句末添加分号
  singleQuote: true, //使用单引号
  trailingComma: "es5", //尾逗号
  bracketSpacing: true, //括号空格
  jsxBracketSameLine: false, //jsx末尾
	arrowParens: "avoid", //尽量避免圆括号  " avoid " - 尽可能不添加圆括号，示例：x => x" always " - 总是添加圆括号，示例： (x) => x
  requirePragma: false, //按照注释格式化代码
  proseWrap: "preserve" //" always " - 当超出print width（上面有这个参数）时就折行 " never " - 不折行" perserve " - 按照文件原样折行 （v1.9.0 +）
};
```

### 安装prettier

在项目下运行`npm install --global prettier`, `prettier`是一个实用的代码格式化工具，具体使用方法可参考 [prettier.io](https://prettier.io/?spm=a2c4e.11153940.blogcont401194.7.11cb490c4cKtdf) 也是本文的主角。

### 运行格式化

安装好prettier后就可以进行整个项目的格式化了，首先命令行进入到项目的根目录,接着运行以下命令

```
prettier --single-quote --write "src/**/*.{js,jsx,json,css}"
```

命令运行完毕，整个项目代码js,jsx,css已经被重新格式化了，如果还需要格式其他文件，请参考prettier的使用文档。

# 结语

好像整个过程不只一行命令行，那么连起来就可以了

```
npm install --global  prettier && prettier --single-quote --write "src/**/*.{js,jsx,json,css}
```