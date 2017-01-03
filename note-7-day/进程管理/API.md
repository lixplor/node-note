# API

## Process

* `process`是一个内置对象, 不是模块, 不用引用就可以直接使用
* `child_process`模块, 用于创建和控制子进程. 
    - `.spawn`: 创建子进程
* `cluster`模块是对`child_process`模块的进一步封装, 专门用于解决单进程Node Web服务器无法充分利用多核CPU的问题. 该模块可简化多进程服务器程序的开发, 让每个核上运行一个工作进程, 并统一通过主进程监听端口和分发请求.

## 应用

### 获取命令行参数

```javascript
console.log(process.argv.slice(2));
```

执行脚本:

```shell
$ node argv.js hello world
[ 'hello', 'world' ]
```

### 退出程序

* `0`是正常退出的状态码
* 其他数字是异常退出

```javascript
process.exit(0);  // 正常退出
process.exit(1);  // 异常退出
```

### 控制输入/输出

* `process.stdin`: 标准输入流, 只读数据流
* `process.stdout`: 标准输出流, 只写数据流
* `process.stderr`: 标准错误流

```javascript
// 标准输入流实现console.log功能
function log() {
    process.stdout.write(util.format.apply(util, arguments) + '/n');
}
```

### 降权

* *nix系统中, 1024以下端口权限只能由具有root权限监听, 在完成端口监听后, 继续运行在root权限存在安全隐患, 因此可以通过降权来限制某些操作
* 注意:
    - 如果是通过`sudo`获取root权限, 运行程序的用户的UID和GID保存在环境变量`SUDO_UID`和`SUDO_GID`里, 如果是通过`chmod +s`方式获取root权限, 运行程序的用户的UID和GID可直接通过`process.getuid`和`process.getgid`方法获取
    - `process.setuid`和`process.setgid`方法只接受`number`类型的参数
    - 降权时必须先降GID再降UID, 否则顺序反过来的话就没权限修改程序的GID了

```javascript
http.createServer(callback).listen(80, function () {
    var env = process.env,
        uid = parseInt(env['SUDO_UID'] || process.getuid(), 10),
        gid = parseInt(env['SUDO_GID'] || process.getgid(), 10);

    process.setgid(gid);
    process.setuid(uid);
});
```

### 创建子进程

* `.spawn(exec, args, options)`
    - 参数`exec`: 执行文件路径, 可以是执行文件的相对或绝对路径, 也可以是根据PATH环境变量能找到的执行文件名
    - 参数`args`: 命令行参数的数组
    - 参数`options`: 配置子进程的执行环境和行为

### 进程间通信

* *nix系统下, 进程可以通过`信号`互相通信
    - `.kill`是父进程向子进程发送`SIGTERM`信号
* 如果父子进程都是Node进程, 可以通过IPC双向传递数据

```javascript
// parent.js
var child = child_process.spawn('node', ['child.js']);
child.kill('SIGTERM');

// child.js
process.on('SIGTERM', function() {
    cleanUp();
    process.exit(0);
});
```

IPC双向通信

* 父进程
    - `options.stdio`通过`ipc`开启一条IPC通道, 之后可以监听子进程对象的`message`事件接收来自子进程的消息
    - `.send`给子进程发送消息
* 子进程
    - 在`process`对象监听`message`事件接收来自父进程的消息, 通过`.send`向父进程发送消息
* 数据在传递过程中, 现在发送端使用`JSON.stringify`方法序列化, 接收端使用`JSON.parse`方法反序列化


```javascript
// parent.js
var child = child_process.spawn('node', ['child.js'], {
    stdio:[0, 1, 2, 'ipc']
});
child.on('message', function(msg) {
    console.log(msg);
});
child.send({hello:'hello'});

// child.js
process.on('message', function(msg) {
    msg.hello = msg.hello.toUpperCase();
    process.send(msg);
});
```

### 守护子进程

* 守护进程一般用于监控工作进程的运行状态, 在工作进程不正常退出时重启工作进程, 保障工作进程不间断运行

```
// daemon.js
function spawn(mainModule) {
    var worker = child_process.spawn('node', [mainModule]);
    worker.on('exit', function(code) {
        if (code !== 0) {
            spawn(mainModule);
        }
    });
}
spawn('worker.js');
```

