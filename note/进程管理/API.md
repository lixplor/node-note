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
