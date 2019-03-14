# 使用 ESLint && Prettier 规范代码格式



![Avatar](https://img.colabug.com/2017/06/noavatar_middle.gif)	[VINCE](https://www.colabug.com/author/3331/) 2018-05-15 本文共1964个字，预计阅读需要5分钟。

开始配置之前，先问个问题： [ESLint](https://www.colabug.com/goto/aHR0cHM6Ly9lc2xpbnQub3JnLw==)
和 [Prettier](https://www.colabug.com/goto/aHR0cHM6Ly9wcmV0dGllci5pby8=)
有什么不同？

之所以问这个问题是因为 [ESLint](https://www.colabug.com/tag/eslint/) 除了代码质量检查（比如有无声明但没有使用的变量）也提供了自动格式化代码的功能，比如，将双引号变为单引号，自定添加 trailing comma 等，既然如此，那干嘛还要再引入 Prettier？毕竟，Prettier 就是用于代码格式化的。

其实，在格式化代码方面， Prettier 确实和 ESLint 有重叠，但他们侧重点不同：ESLint 主要工作就是检查代码质量并给出提示，它所能提供的格式化功能很有限；而 Prettier 在格式化代码方面就强大的多。

关于 ESLint 可修复的 style 类目参考这个列表下标有扳手标记的项 [Stylistic Issues](https://www.colabug.com/goto/aHR0cHM6Ly9lc2xpbnQub3JnL2RvY3MvcnVsZXMvI3N0eWxpc3RpYy1pc3N1ZXM=)

## 举个例子：

```
methods: {
  async testURL() {
    let TEST = 11;
  },

},
```





在上面的例子中，

ESLint 可以

- 检查

1）TEST 是常量，应该用 const 声明；

2）TEST 声明后没有使用。

- 自动修改

1）将 let 声明改为 const 声明。

但 ESLint 也只能做什么多了，但倒数第二个空行，ESLint 就无能为力了。这时候， Prettier 就登场了：Prettier 可以自动删除倒数第二行的空行。

## 使用

因为 ESLint 和 Prettier 都可以格式化代码，如果他们对格式化代码执行不同规则，那就可能发生冲突，可以通过配置解决大部分冲突，但仍有一些是无法解决的，比如，Prettier 在 `function`
关键字后不允许有空格且不能自定义，那如果想避免 ESLint 不报错，只能配置 ESLint 允许 `function`
关键字后不带空格（主要针对匿名函数）。

这类不能配置的冲突很少，目前我只发现一例，所以，还是选择继续使用 Prettier，毕竟，更多的时候使用 Prettier 很方便，并且，后续 Prettier 版本可能会添加更多自定义选项。

关于 `function`
关键字后不带空格更多讨论可参考 [Space after function keyword – MOVED to #3847!](https://www.colabug.com/goto/aHR0cHM6Ly9naXRodWIuY29tL3ByZXR0aWVyL3ByZXR0aWVyL2lzc3Vlcy8xMTM5)

### 安装依赖

- eslint 相关

```
yarn add
  eslint babel-core babel-eslint eslint-config-airbnb
  eslint-plugin-import eslint-plugin-jsx-a11y eslint-plugin-react
-D
```





- prettier 相关

```
yarn add eslint-config-prettier eslint-plugin-prettier prettier -D
```





### 编写配置文件

配置 `.eslintrc.js`

```
module.exports = {
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true,
  },

  // extending airbnb config and config derived from eslint-config-prettier
  extends: ['airbnb', 'prettier'],

  // activating esling-plugin-prettier (--fix stuff)
  plugins: ['prettier'],

  // 自定义 eslint 检查规则
  rules: {
    // 自定义 prettier 规则 (实际上，可配置项非常有限)
    'prettier/prettier': [
      'error',
      {
        singleQuote: true,
        trailingComma: 'all',
      },
    ],

    // 其他 eslint 检查规则
    semi: ['error', 'always'], // 语句强制分号结尾
    camelcase: 'off', // 强制驼峰法命名
    'no-new': 'off', // 禁止在使用 new 构造一个实例后不赋值
    'space-before-function-paren': 'off', // 函数定义时括号前面不要有空格
    'no-plusplus': 'off', // 禁止使用 ++， ——
    'max-len': 'off', // 字符串最大长度
    'comma-dangle': ['error', 'always-multiline'], // 多行对象字面量项尾总是有逗号
    'func-names': 'off', // 函数表达式必须有名字
  },
};
```





### 编辑器配置

我主力编辑器是 VS Code，所以这里只有 VS Code 的配置。

因为我们的目的是根据 ESLint 规则自动格式化代码，这只需在 `preference -> setting -> user setting`
中添加下面配置即可：

```
// 点击保存时，根据 eslint 规则自定修复
"eslint.autoFixOnSave": true,

// 为了避免和编辑器自带格式化冲突，关闭编辑器保存自动格式化功能；如果需要，手动使用编辑器自带格式化功能
"editor.formatOnSave": false,
```