> nodejs一般是当成一条命令执行的，当用户断开session，nodejs也就停止了运行。如何让nodejs持续在后台运行呢？

# 最简单粗暴的方法是使用Linux本身后台执行的特性

------

使用&符号后台执行，并利用nohup命令实现进程禁止挂起

```
nohup node app.js &
```

# 使用forever让node.js持久运行

------

```
npm install forever -g   #安装
forever start app.js  #启动应用
forever stop app.js  #关闭应用
forever restartall  #重启所有应用

#输出日志和错误
forever start -l forever.log -o out.log -e err.log app.js   

# 指定forever信息输出文件，当然，默认它会放到~/.forever/forever.log
forever start -l forever.log app.js  

# 指定app.js中的日志信息和错误日志输出文件，  
# -o 就是console.log输出的信息，-e 就是console.error输出的信息
forever start -o out.log -e err.log app.js 

# 追加日志，forever默认是不能覆盖上次的启动日志，  
# 所以如果第二次启动不加-a，则会不让运行  
forever start -l forever.log -a app.js

# 监听当前文件夹下的所有文件改动（不太建议这样）  
forever start -w app.js  

# 显示所有运行的服务 
forever list  

######停止操作

# 停止所有运行的node App  
forever stopall  
  
# 停止其中一个node App  
forever stop app.js  

# 当然还可以这样  
# forever list 找到对应的id，然后：  
forever stop [id]

# 开发环境下  
NODE_ENV=development forever start -l forever.log -e err.log -a app.js  
# 线上环境下  
NODE_ENV=production forever start -l ~/.forever/forever.log -e ~/.forever/err.log -w -a app.js
#上面加上NODE_ENV为了让app.js辨认当前是什么环境用的
```





# [forever](https://link.jianshu.com?t=https://www.npmjs.com/package/forever)监控程序运行，出现问题自动重新启动

## forever安装

记得加-g，forever要求安装到全局环境下
 `sudo npm install forever -g`

## 基本用法

1. 简单的启动

```
forever start app.js
```

1. 指定forever信息输出文件，当然，默认它会放到`~/.forever/forever.log`: `forever start -l forever.log app.js` 
2. 指定app.js中的日志信息和错误日志输出文件，
    `-o` 就是console.log输出的信息，`-e` 就是console.error输出的信息:`forever start -o out.log -e err.log app.js` 
3. 追加日志，forever默认是不能覆盖上次的启动日志，所以如果第二次启动不加`-a`，则会不让运行:`forever start -l forever.log -a app.js` 
4. 监听当前文件夹下的所有文件改动，并自动重启:`forever start -w app.js` 
5. 显示所有运行的服务:`forever list` 
6. 停止所有运行的node App：`forever stopall` 
7. 停止其中一个node App：`forever stop app.js`
    当然还可以这样：forever list 找到对应的id，然后：`forever stop [id]` 
8. 启动所有`forever restartall` 
9. json配置文件(支持多应用启动)

```
    [
  {
    // 支持注释编写
    "uid": "app1",
    "append": true,
    "watch": true,
    "script": "index.js",
    "sourceDir": "/home/myuser/app1"
  },
  {
    // App2
    "uid": "app2",
    "append": true,
    "watch": true,
    "script": "index.js",
    "sourceDir": "/home/myuser/app2",
    "args": ["--port", "8081"]
  }
]
```

- 启动命令：`forever config.json` 

## 实际使用

### 环境变量的使用

- 开发环境下：`NODE_ENV=development forever start -l forever.log -e err.log -a app.js` 
- 线上环境下`NODE_ENV=production forever start -l ~/.forever/forever.log -e ~/.forever/err.log -w -a app.js` 

上面加上NODE_ENV为了让app.js辨认当前是什么环境用的。

有可能你需要使用unix下的crontab（定时任务）
 这个时候需要注意配置好环境变量。
 SHELL=/bin/sh
 PATH=/usr/local/sbin:/usr/local/bin:/sbin:/bin:/usr/sbin:/usr/bin

### Forever实现服务程序

我们要让Forever自动运行，先在/etc/init.d目录创建一个文件node，内容如下：

```
#!/bin/bash
#
# node      Start up node server daemon
#
# chkconfig: 345 85 15
# description: Forever for Node.js
#
PATH=/home/node/0.8.9/bin
DEAMON=/home/ftp/1520/weizt-20120918-tKx/weizt.com/app.js
LOG=/home/hosts_log
PID=/tmp/forever.pid

case "$1" in
    start)
        forever start -l $LOG/forever.log -o $LOG/forever_out.log -e $LOG/forever_err.log --pidFile $PID -a $DEAMON
        ;;
    stop)
        forever stop --pidFile $PID $DEAMON
        ;;
    stopall)
        forever stopall --pidFile $PID
        ;;
    restartall)
        forever restartall --pidFile $PID
        ;;
    reload|restart)
        forever restart -l $LOG/forever.log -o $LOG/forever_out.log -e $LOG/forever_err.log --pidFile $PID -a $DEAMON
        ;;
    list)
        forever list
        ;;
    *)
        echo "Usage: /etc.init.d/node {start|stop|restart|reload|stopall|restartall|list}"
        exit 1
        ;;
esac
exit 0
```

以上代码是我在本地虚拟机的配置，根据实际情况修改相关参数，主要是DEAMON的路径参数，赋予该文件可执行权限，并运行chkconfig添加自动运行：

```
chmod 755 /etc/init.d/node
chkconfig /etc/init.d/node on
```