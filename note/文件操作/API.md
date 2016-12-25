# API

## Buffer (数据块)

* [文档](http://nodejs.org/api/buffer.html)
* JS在ES6之前只有字符串数据类型, 没有二进制数据类型, 因此Node提供了与`String`对等的全局构造函数`Buffer`来提供对二进制数据的操作
* `Buffer`可以通过2种方式得到实例
    - 读取文件
    - 直接构造
* `Buffer`与字符串类似的属性和操作
    - `buffer.length`: 获取字节长度
    - `buffer[index]`: 获取指定索引位置的字节
* `Buffer`可以和`String`相互转换
    - `buffer.toString('编码');`: Buffer转String
    - `new Buffer('字符串', '编码');`: String转Buffer
* `Buffer`与字符串的区别
    - 字符串是只读的, 修改字符串后会得到一个新的字符串, 原字符串不变
    - Buffer类似于C语言的数组
        - 可以用`[index]`访问和修改某个位置的字节
        - `.slice()`方法调用后, 修改会作用于原Buffer, 而不是创建新的Buffer
        - `.copy()`方法用于将原Buffer赋值到新的Buffer中, 相当于申请一块新的内存 

```javascript
// 构造方法直接创建Buffer
var bin = new Buffer([0x68, 0x65, 0x6c, 0x6c, 0x6f]);

// 通过索引获取指定位置的字节
bin[0];  // 0x68

// Buffer转换为String
var str = bin.toStrng('utf-8'); // "hello"

// String转换为Buffer
var bin = new Buffer('hello', 'utf-8'); // <Buffer 68 65 6c 6c 6f>

// Buffer的slice方法作用于原Buffer自身
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var sub = bin.slice(2);

sub[0] = 0x65;
console.log(bin); // => <Buffer 68 65 65 6c 6f>

// Buffer的复制
var bin = new Buffer([ 0x68, 0x65, 0x6c, 0x6c, 0x6f ]);
var dup = new Buffer(bin.length);

bin.copy(dup);
dup[0] = 0x48;
console.log(bin); // => <Buffer 68 65 6c 6c 6f>
console.log(dup); // => <Buffer 48 65 65 6c 6f>
```

## Stream (数据流)

* 用于处理数据流, 边读边处理
* `Stream`基于事件机制工作, 继承于`EventEmitter`

```javascript
// 复制大文件, 这种方式不完善
var rs = fs.createReadStream(pathname);

rs.on('data', function(chunk) {
    doSomething(chunk);  // 该回调方法会一直被回调, 无论doSomething()方法是否处理的过来
});

rs.on('end', function() {
    cleanUp();
});

// 改造上面的代码
var fs = fs.createReadStream(pathname);

rs.on('data', function(chunk) {
    rs.pause();  // 当回调时暂停流的读取
    doSomething(chunk, function() {
        rs.resume();  // 当执行完毕后恢复流的读取1
    });
});

rs.on('end', function() {
    cleanUp();
});
```

```javascript
// 复制大文件, 另一种边读边写的方法
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function(chunk) {
    ws.write(chunk);  // 读到就写, 这种方式也不好, 如果写入速度比读取速度慢, 还是可能会内存溢出
});

rs.on('end', function() {
    ws.end();
});

// 改造上面的代码
var rs = fs.createReadStream(src);
var ws = fs.createWriteStream(dst);

rs.on('data', function(chunk) {
    if (ws.write(chunk) === false) {
        rs.pause(); // 当没有写完时, 暂停读取
    }
});

rs.on('end', function() {
    ws.end();
});

ws.on('drain', function() {
    rs.resume();  // 当写入完成后, 恢复读取
});

// 实际上使用pipe()即可
```

## File System (文件系统)

* `fs`模块提供对文件的操作
* `fs`模块所有异步API都有同步版本, 一般方法末尾都会带上`Sync`单词
* 该模块的API基本可分为3种类型:
    - 文件属性读写
        - `fs.stat`
        - `fs.chmod`
        - `fs.chown`
    - 文件内容读写
        - `fs.readFile`
        - `fs.readdir`
        - `fs.writeFile`
        - `fs.mkdir`
    - 底层文件操作
        - `fs.open`
        - `fs.read`
        - `fs.write`
        - `fs.close`

```javascript
// 异步
fs.readFile(pathname, function(err, data) {
    if(err) {
        // 处理错误
    } else {
        // 处理数据
    }
});

// 同步
try {
    var data = fs.readFileSync(pathname);
    // 处理数据
} catch(err) {
    // 处理错误
}
```

## Path (路径)

* `path`模块用于简化路径的相关操作
* 常见API
    - `path.normalize`: 将传入路径转换为标准路径, 解析`.`, `..`, 去掉多余斜杠
        - 注意, 标准化后的斜杠, 在windows下是`\`, 在*nix系统下是`/`. 如果想在任何系统下都使用`/`作为路径分隔符, 需要使用`.replace(/\\/g, '/')`替换
    - `path.join`: 将传入的多个路径拼接为标准路径, 并能在不同系统下正确使用相应的路径分隔符 
    - `path.extname`: 获取文件扩展名

```javascript
// path.normalize
var cache = {};
function store(key, value) {
    cache[path.normalize(key)] = value;  // 标准化路径
}
store('foo/bar', 1);
store('foo//baz//../bar', 2);
console.log(cache); // {"foo/bar":2}

// path.join
path.join('foo/', 'baz/', '../bar'); // "foo/bar"

// path.extname
path.extname('foo/bar.js'); // ".js"
```
