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
```
