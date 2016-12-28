# API


## HTTP

* [官方文档](http://nodejs.org/api/http.html)
* `http`模块的2种使用方式
    - 作为服务端, 创建一个HTTP服务器, 监听客户端请求并返回响应
    - 作为客户端, 发起一个HTTP客户端请求, 获取服务器响应
* 方法
    - `.createServer()`: 创建服务器对象
    - `.listen(port)`: 监听端口
* 对象
    - `request`: 请求对象
    - `response`: 响应对象


```javascript
// 作为服务端
var http = require('http');

http.createServer(function(request, response) {
    var body = [];
    console.log(request.method);
    console.log(request.headers);
    request.on('data', function(chunk) {
        body.push(chunk);
    });
    request.on('end', function() {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
}).listen(80);

// 作为客户端
var options = {
    hostname:'www.example.com',
    port:80,
    path:'/upload',
    method:'POST',
    headers:{
        "Content-Type':'application/x-www.form-urlencoded'
    }
};
var request = http.request(options, function(response) {
    console.log(response);
};
request.write("Hello world');

// 客户端获取流
http.get('http://www.baidu.com/', function(response) {
    var body = [];
    console.log(response.statusCode);
    console.log(response.headers);
    response.on('data', function(chunck) {
        body.push(chunk);
    });
    response.on('end', function() {
        body = Buffer.concat(body);
        console.log(body.toString());
    });
});
```

## HTTPS

* `HTTPS`与`HTTP`的区别是需要处理`SSL`证书
* Node支持`SNI`技术, 可以根据HTTPS客户端请求使用的域名动态使用不同的证书, 因此同一个HTTPS服务器可以使用多个域名提供服务
* 如果目标服务器使用的SSL证书是自制的, 不是颁发机构购买的, 默认`https`模块会拒绝连接, 提示证书有安全问题.
    - `options`中添加`rejectUnauthorized:false`可以禁用对证书有效性的检查

```javascript
// 创建HTTPS服务器
var https = require('https');
var options = {
    key:fs.readFileSync('./ssl/default.key'),
    cert:fs.readFileSync('./ssl/default.cert')
};
var server = https.createServer(options, function(request, response) {

}).listen(8124);

// 添加多组证书
server.addContext('foo.com', {
    key: fs.readFileSync('./ssl/foo.com.key'),
    cert: fs.readFileSync('./ssl/foo.com.cer')
});

server.addContext('bar.com', {
    key: fs.readFileSync('./ssl/bar.com.key'),
    cert: fs.readFileSync('./ssl/bar.com.cer')
});

// 创建HTTPS客户端
var options = {
        hostname: 'www.example.com',
        port: 443,
        path: '/',
        method: 'GET'
    };

var request = https.request(options, function (response) {});

request.end();
```

## URL

* `URL`模块用来解析, 生成, 和拼接URL
    - `.parse(url)`: 解析URL字符串为URL对象, 不完整的URL也可以解析
    - `.parse(url, isParseToQueryString, allowNoProtocol)`: 第二个参数boolean, 是否将查询参数解析为`QueryString`对象; 第三个参数boolean, 是否解析没有协议头的URL, 如`//www.baidu.com`
    - `format(urlObj)`: 将URL对象转换为URL字符串

完整的URL组成部分如下:

```shell
                           href
 -----------------------------------------------------------------
                            host              path
                      --------------- ----------------------------
 http: // user:pass @ host.com : 8080 /p/a/t/h ?query=string #hash
 -----    ---------   --------   ---- -------- ------------- -----
protocol     auth     hostname   port pathname     search     hash
                                                ------------
                                                   query
```

URL字符串转换为URL对象:

```javascript
var url = require('url');

function parseUrlToObject(urlStr) {
    return url.parse(urlStr);
}

var testUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
console.log(parseUrlToObject(testUrl));
```

执行脚本:

```javascript
$ node parseUrl.js
Url {
  protocol: 'http:',
  slashes: true,
  auth: 'user:pass',
  host: 'host.com:8080',
  port: '8080',
  hostname: 'host.com',
  hash: '#hash',
  search: '?query=string',
  query: 'query=string',
  pathname: '/p/a/t/h',
  path: '/p/a/t/h?query=string',
  href: 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash' }
```

URL对象转换为字符串:

```javascript
var url = require('url');

function parseUrlToObj(urlObj) {
    return url.format(urlObj);
}

var urlObj = {
    protocol:'http:',
    host:'www.baidu.com',
    pathname:'/s',
    search:'wd=s'
};

console.log(parseUrlToObj(urlObj));
```

执行脚本:

```shell
$ node parseUrlObjToStr.js
http://www.baidu.com/s?wd=s
```
