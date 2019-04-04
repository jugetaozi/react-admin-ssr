```
io.on('connect', onConnect);

function onConnect(socket){

  // 只发给sender。 sending to the client
  socket.emit('hello', 'can you hear me?', 1, 2, 'abc');

  // 发给所有人，除了sender。 sending to all clients except sender
  socket.broadcast.emit('broadcast', 'hello friends!');

  // 发给game房间所有人，除了sender。 sending to all clients in 'game' room except sender
  socket.to('game').emit('nice game', "let's play a game");

  // 发给game1和/或game2所有人，除了sender。 sending to all clients in 'game1' and/or in 'game2' room, except sender
  socket.to('game1').to('game2').emit('nice game', "let's play a game (too)");

  // 发给game房间所有人，包含sender。 sending to all clients in 'game' room, including sender
  io.in('game').emit('big-announcement', 'the game will start soon');

  // 发给域名myNamespacs所有人，包含sender。 sending to all clients in namespace 'myNamespace', including sender
  io.of('myNamespace').emit('bigger-announcement', 'the tournament will start soon');

  // 发给域名myNamespace里room房间的所有人，包含sender。 sending to a specific room in a specific namespace, including sender
  io.of('myNamespace').to('room').emit('event', 'message');

  // 发给某一个人 sending to individual socketid (private message)
  io.to(`${socketId}`).emit('hey', 'I just met you');

  // WARNING: `socket.to(socket.id).emit()` will NOT work, as it will send to everyone in the room
  // named `socket.id` but the sender. Please use the classic `socket.emit()` instead.

  // sending with acknowledgement
  socket.emit('question', 'do you think so?', function (answer) {});

  // sending without compression
  socket.compress(false).emit('uncompressed', "that's rough");

  // sending a message that might be dropped if the client is not ready to receive messages
  socket.volatile.emit('maybe', 'do you really need it?');

  // specifying whether the data to send has binary data
  socket.binary(false).emit('what', 'I have no binaries!');

  // sending to all clients on this node (when using multiple nodes)
  io.local.emit('hi', 'my lovely babies');

  // sending to all connected clients
  io.emit('an event sent to all connected clients');

};
```

## Socket.io 基本应用

socket.io提供了基于事件的实时双向通讯，它同时提供了服务端和客户端的API。

服务端

服务端socket.io必须绑定一个`http.Server`实例，因为WebSocket协议是构建在HTTP协议之上的，所以在创建WebSocket服务时需调用HTTP模块并调用其下`createServer()`方法，将生成的server作为参数传入socket.io。

```
var httpServer = require('http').createServer();
var io = require('socket.io')(httpServer);
httpServer.listen(3000);
```

绑定`http.Server`可使用隐式绑定和显式绑定

- 隐式绑定

socket.io内部实例化并监听`http.Server`，通过实例化时传入端口或者在实例化后调用`listen`或`attach`函数进行隐式绑定。

```
// 实例化时传入端口
require('socket.io')(3000)

// 通过listen或attach函数绑定
let io = require('socket.io')
io.listen(3000);
// io.attach(3000);
```

- 显式绑定

```
// 实例化时绑定
let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);

//通过listen或attach绑定
let httpServer = require('http').Server();
let io = require('socket.io')();
io.listen(httpServer);
// io.attach(httpServer);
httpServer.listen(3000);
```

Express框架中使用

```
let app = require('express');

let httpServer= require('http').Server(app);
let io = require('socket.io')(httpServer);

app.listen(3000);
```

KOA框架中使用

```
let app = require('koa')();

let httpServer = require('http').Server(app.callback());
let io = require('socket.io')(httpServer);

app.listen(3000);
```

建立连接

当服务端和客户端连接成功时，服务端会监听到`connection`和`connect`事件，客户端会监听到`connect`事件，断开连接时服务端对应到客户端的socket与客户端均会监听到`disconcect`事件。

```
/*客户端*/
<script src="http://cdn.socket.io/stable/socket.io.js"></script>
<script>
// socket.io引入成功后，可通过io()生成客户端所需的socket对象。
let socket = io('http://127.0.0.0:3000');

// socket.emmit()用户客户端向服务端发送消息，服务端与之对应的是socket.on()来接收信息。
socket.emmit('client message', {msg:'hi, server'});

// socket.on()用于接收服务端发来的消息
socket.on('connect',  ()=>{
  console.log('client connect server');
});
socket.on('disconnect', ()=>{
  console.log('client disconnect');
});
</script>

/*服务端*/
// 服务端绑定HTTP服务器实例
let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);

// 服务端监听连接状态：io的connection事件表示客户端与服务端成功建立连接，它接收一个回调函数，回调函数会接收一个socket参数。
io.on('connection',  (socket)=>{
  console.log('client connect server, ok!');

  // io.emit()方法用于向服务端发送消息，参数1表示自定义的数据名，参数2表示需要配合事件传入的参数
  io.emmit('server message', {msg:'client connect server success'});

  // socket.broadcast.emmit()表示向除了自己以外的客户端发送消息
  socket.broadcast.emmit('server message', {msg:'broadcast'});

  // 监听断开连接状态：socket的disconnect事件表示客户端与服务端断开连接
  socket.on('disconnect', ()=>{
    console.log('connect disconnect');
  });
  
  // 与客户端对应的接收指定的消息
  socket.on('client message', (data)=>{
    cosnole.log(data);// hi server
  });

  socket.disconnect();
});
```

传输数据

服务端和客户端的socket是一个关联的`EventEmitter`对象，客户端socket派发的事件可以通过被服务端的socket接收，服务端socket派发的事件也可以被客户端接收。基于这种机制，可以实现双向交流。

```
# 模拟：客户端不断发送随机数，当随机数大于0.95时，服务端延迟1s后向客户端发送警告以及警告次数。
/*客户端*/
<script src="http://cdn.socket.io/stable/socket.io.js"></script>
<script>
let socket = io('http://127.0.0.1:3000');

let interval = setTimeInterval(()=>{
  socket.emit('random', Math.random());
}, 500);

socket.on('warn', count=>{
  console.log('warning count : '+count);
});

socket.on('disconnect', ()=>{
  clearInterval(interval);
});
</script>


/*服务端*/
let httpServer = require('http').Server();
let io = require('socket.io')(httpServer);
httpServer.listen(3000);

io.on('connection', socket=>{
  socket.on('random', value=>{
    console.log(value);
    if(value>0.95){
      if(typeof socket.warnign==='undefined'){
        socket.warning = 0;// socket对象可用来存储状态和自定义数据
      }
      setTimeout(()=>{
        socket.emit('warn', ++socket.warning);
      }, 1000);
    }
  });
});
```

Socket.IO内置了一些默认事件，我们在设计事件的时候应该避开默认的事件名称，并灵活运用这些默认事件。
服务器端事件：
io.sockets.on(‘connection’, function(socket) {})：socket连接成功之后触发，用于初始化
socket.on(‘message’, function(message, callback) {})：客户端通过socket.send来传送消息时触发此事件，message为传输的消息，callback是收到消息后要执行的回调
socket.on(‘anything’, function(data) {})：收到任何事件时触发
socket.on(‘disconnect’, function() {})：socket失去连接时触发（包括关闭浏览器，主动断开，掉线等任何断开连接的情况）
客户端事件：
connect：连接成功
connecting：正在连接
disconnect：断开连接
connect_failed：连接失败
error：错误发生，并且无法被其他事件类型所处理
message：同服务器端message事件
anything：同服务器端anything事件
reconnect_failed：重连失败
reconnect：成功重连
reconnecting：正在重连
在这里要提下客户端socket发起连接时的顺序。当第一次连接时，事件触发顺序为：connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。
