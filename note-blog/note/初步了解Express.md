# 初步了解Express

## 初始化项目

* 步骤
    - 创建一个目录
    - 在目录下执行`npm init`创建一个`package.json`文件
    - 安装Express: `npm i express@4.14.0 --sava`

* 使用Express

```javascript
// 导入express
var express = require('express');
// 创建express实例
var app = express();
// 设置根路径的响应方法
app.get('/', function(req, res) {
    res.send('hello, express');
});
// 开始监听端口
app.listen(3000);
```

## supervisor动态更新代码

* 当修改代码后, 为了免去重启服务器的繁琐, 使用`supervisor`实现动态更新
* 安装: `npm i -g supervisor`
* 使用supervisor启动程序: `supervisor --harmony index.js`
    - supervisor会监听当前目录下的`.node`和`.js`后缀的文件, 当文件变动时会自动重启程序


## 路由

* `req`对象
    - `req.query`: 解析url中的querystring, 如`?name=Tom`
    - `req.params`: 解析url中的占位符, 如`/:name`
    - `req.body`: 解析请求体

```javascript
// 监听根路径
app.get('/', function(req, res) {
    res.send('hello, express');
});
// 监听/user/用户名
app.get('/user/:name', function(req, res) {
    res.send('hello, ' + req.params.name);
});
```

### express.Router

* 为了便于管理路由, 可以在项目目录下创建`routes`目录, 根据不同路由创建不同的js文件, 处理不同的路由逻辑
* [官方文档](http://expressjs.com/en/4x/api.html#router)

```shell
- index.js      # 统一分配给routes下不同的文件处理
- routes/
    - index.js  # 专门处理根路径的逻辑
    - users.js  # 专门处理/users路径的逻辑
```

```javascript
// index.js
var express = require('express);
var app = express();
// 导入不同路由处理文件
var indexRouter = require('./routes/index');
var userRouter = require('./routes/users');
// 使用路由文件处理不同的路由
app.use('/', indexRouter);
app.use('/users', userRouter);


// routes/index.js
var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
  res.send('hello, express');
});

module.exports = router;


// routes/users.js
var express = require('express');
var router = express.Router();

router.get('/:name', function(req, res) {
  res.send('hello, ' + req.params.name);
});

module.exports = router;
```
