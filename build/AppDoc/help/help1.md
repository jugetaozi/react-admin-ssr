# Xcentz 系统使用帮助


## 企业知识库
- 企业知识库使用帮助  http://gitbook.zhangjikai.com/
- 插件介绍  http://www.itboth.com/d/b6ZZje

## Xcentz 系统启动方式
```
npm i
配置config // 填写mysql数据库配置
npm init //数据库初始化 DOC初始化
npm run dev //启动服务侧 客户侧 打开浏览器
打开 http://localhost:8888/
```

## cnpm使用说明

你可以使用我们定制的 [cnpm](https://github.com/cnpm/cnpm) (gzip 压缩支持) 命令行工具代替默认的 `npm`:

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
```

或者你直接通过添加 `npm` 参数 `alias` 一个新命令:

```bash
alias cnpm="npm --registry=https://registry.npm.taobao.org \
--cache=$HOME/.npm/.cache/cnpm \
--disturl=https://npm.taobao.org/dist \
--userconfig=$HOME/.cnpmrc"

# Or alias it in .bashrc or .zshrc
$ echo '\n#alias for cnpm\nalias cnpm="npm --registry=https://registry.npm.taobao.org \
  --cache=$HOME/.npm/.cache/cnpm \
  --disturl=https://npm.taobao.org/dist \
  --userconfig=$HOME/.cnpmrc"' >> ~/.zshrc && source ~/.zshrc
```

### 安装模块

从 [registry.npm.taobao.org](http://registry.npm.taobao.org/) 安装所有模块. 当安装的时候发现安装的模块还没有同步过来, 淘宝 NPM 会自动在后台进行同步, 并且会让你从官方 NPM [registry.npmjs.org](http://registry.npmjs.org/) 进行安装. 下次你再安装这个模块的时候, 就会直接从 淘宝 NPM 安装了.

```bash
$ cnpm install [name]
```

### 同步模块

直接通过 `sync` 命令马上同步一个模块, 只有 `cnpm` 命令行才有此功能:

```bash
$ cnpm sync connect
```

当然, 你可以直接通过 web 方式来同步: [/sync/connect](http://npm.taobao.org/sync/connect)

```bash
$ open https://npm.taobao.org/sync/connect
```

### 其它命令

支持 `npm` 除了 `publish` 之外的所有命令, 如:

```bash
$ cnpm info connect
```