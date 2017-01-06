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

## ejs模板引擎

* 模板引擎是将页面模板和数据结合起来, 生成html的工具
* ejs是模板引擎的一种
* [官方文档](https://www.npmjs.com/package/ejs#tags)

安装ejs

```shell
npm i ejs --save
```

设置模板引擎

```javascript
var express = require('express');
var app = express();

// 设置存放模板文件的目录
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎框架为ejs
app.set('view engine', 'ejs');
```

创建模板引擎文件
* `<% code %>`: 运行JS代码, 不输出html页面. 可以将JS代码和HTML混合编写, 类似jsp写法
* `<%- code %>`: 显示原始HTML内容, 即渲染后的HTML页面
* `<%= code %>`: 显示转义后的HTML内容, 即HTML原始代码

```html
<!DOCTYPE html>
<html>
  <head>
    <style type="text/css">
      body {padding: 50px;font: 14px "Lucida Grande", Helvetica, Arial, sans-serif;}
    </style>
  </head>
  <body>
    <h1><%= name.toUpperCase() %></h1>
    <p>hello, <%= name %></p>
  </body>
</html>
```

使用模板文件渲染页面
* `res.render(template, data)`
    - template: 模板名称
    - data: 模板的数据

```javascript
router.get('/:name', function(req, res) {
  res.render('users', {
    name: req.params.name
  });
});
```

使用`include`引入其他模板文件
* 用于拆分模板, 提高复用性, 减少重复代码, 使模板结构清晰
* `<%- include('模板名称') %>`

```js
<%- include('header') %>
  <h1><%= name.toUpperCase() %></h1>
  <p>hello, <%= name %></p>
<%- include('footer') %>
```


## express浅析

### 中间件

* `中间件(middleware)`是用来处理请求的
* `next()`
    - 一个中间件处理完, 可以通过`next()`方法, 将请求传递给下一个中间件
    - 当没有调用`next()`方法时, 请求不会向下传递
    - `next(error)`可以停止传递请求到下一个中间件, 并返回一个错误
* `app.use()`加载中间件

```javascript
app.use(function(req, res, next) {
  console.log('1');
  next();
});

app.use(function(req, res, next) {
  console.log('2');
  res.status(200).end();
});
```

### 错误处理

* 4个参数

```javascript
//错误处理
app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});
```
