# blog项目


## 初始化项目目录

* 创建目录`myblog`
* `npm init`初始化`package.json`文件


## 创建目录结构

* MVC结构
    - M: models/
    - V: views/
    - C: routes/


```shell
- models/                    # 存放模型, 即操作数据库的文件
      user.js                # 注册用户      
- views/                     # 存放模板文件
      header.ejs             # 页面头部模板
      body.ejs               # 页面主体模板
      footer.ejs             # 页面脚部模板
    - components/            # 存放小组件模板
          nav.ejs            # 导航栏模板
          nav-setting.ejs    # 导航栏设置按钮模板
          notification.ejs   # 通知条模板
- routes/                    # 存放路由文件
      index.js               # 根路径路由处理文件
      posts.js               # 文章相关路由
      signin.js              # 登录路由
      signout.js             # 登出路由
      signup.js              # 注册路由
- middlewares/               # 存放自定义中间件
      check-user.js          # 检查用户状态的中间件
- lib/                       # 操作库
      mongo.js               # 操作mongodb
- logs/                      # 存放日志
- public                     # 存放静态文件
    - css/                   # css
          style.css          # 样式
    + img/                   # 图片
- config/                    # 存放配置文件
      default.js             # 默认配置文件
+ node_modules               # 第三方依赖包
  index.js                   # 程序主文件
  package.json               # 项目信息文件
  .gitignore           # git忽略文件
```


## 安装依赖模块

* `express`: web框架
* `express-session`: session中间件
* `connect-mongo`: 将session存储于mongodb, 结合express-session使用
* `connect-flash`: 页面通知提示中间件, 结合session实现
* `ejs`: 模板引擎
* `express-formidable`: 接收表单及文件的上传中间件
* `config-lite`: 读取配置文件
* `marked`: markdown解析
* `moment`: 时间格式化
* `mongolass`: mongodb驱动
* `objectid-to-timestamp`: 根据ObjectId生成时间戳
* `sha1`: sha1加密, 用于密码加密
* `winston`: 日志
* `express-winston`: 基于winston的用于express的日志中间件

```shell
# 安装依赖
npm i config-lite connect-flash connect-mongo ejs express express-formidable express-session marked moment mongolass objectid-to-timestamp sha1 winston express-winston --save

# 安装完毕后所有的依赖包如下
├─┬ config-lite@1.5.0
│ ├─┬ chalk@1.1.3
│ │ ├── ansi-styles@2.2.1
│ │ ├── escape-string-regexp@1.0.5
│ │ ├─┬ has-ansi@2.0.0
│ │ │ └── ansi-regex@2.0.0
│ │ ├── strip-ansi@3.0.1
│ │ └── supports-color@2.0.0
│ ├─┬ js-yaml@3.7.0
│ │ ├─┬ argparse@1.0.9
│ │ │ └── sprintf-js@1.0.3
│ │ └── esprima@2.7.3
│ ├── merge-descriptors@1.0.1
│ ├─┬ optimist@0.6.1
│ │ ├── minimist@0.0.10
│ │ └── wordwrap@0.0.3
│ └── resolve@1.1.7
├── connect-flash@0.1.1
├─┬ connect-mongo@1.3.2
│ ├── bluebird@3.4.7
│ └─┬ mongodb@2.2.19
│   ├── es6-promise@3.2.1
│   ├─┬ mongodb-core@2.1.4
│   │ └─┬ require_optional@1.0.0
│   │   ├── resolve-from@2.0.0
│   │   └── semver@5.3.0
│   └─┬ readable-stream@2.1.5
│     ├── buffer-shims@1.0.0
│     ├── core-util-is@1.0.2
│     ├── inherits@2.0.3
│     ├── isarray@1.0.0
│     ├── process-nextick-args@1.0.7
│     ├── string_decoder@0.10.31
│     └── util-deprecate@1.0.2
├── ejs@2.5.5
├─┬ express@4.14.0
│ ├─┬ accepts@1.3.3
│ │ ├─┬ mime-types@2.1.13
│ │ │ └── mime-db@1.25.0
│ │ └── negotiator@0.6.1
│ ├── array-flatten@1.1.1
│ ├── content-disposition@0.5.1
│ ├── content-type@1.0.2
│ ├── cookie@0.3.1
│ ├── cookie-signature@1.0.6
│ ├─┬ debug@2.2.0
│ │ └── ms@0.7.1
│ ├── depd@1.1.0
│ ├── encodeurl@1.0.1
│ ├── escape-html@1.0.3
│ ├── etag@1.7.0
│ ├─┬ finalhandler@0.5.0
│ │ ├── statuses@1.3.1
│ │ └── unpipe@1.0.0
│ ├── fresh@0.3.0
│ ├── methods@1.1.2
│ ├─┬ on-finished@2.3.0
│ │ └── ee-first@1.1.1
│ ├── parseurl@1.3.1
│ ├── path-to-regexp@0.1.7
│ ├─┬ proxy-addr@1.1.2
│ │ ├── forwarded@0.1.0
│ │ └── ipaddr.js@1.1.1
│ ├── qs@6.2.0
│ ├── range-parser@1.2.0
│ ├─┬ send@0.14.1
│ │ ├── destroy@1.0.4
│ │ ├─┬ http-errors@1.5.1
│ │ │ └── setprototypeof@1.0.2
│ │ └── mime@1.3.4
│ ├── serve-static@1.11.1
│ ├─┬ type-is@1.6.14
│ │ └── media-typer@0.3.0
│ ├── utils-merge@1.0.0
│ └── vary@1.1.0
├─┬ express-formidable@1.0.0
│ └── formidable@1.0.17
├─┬ express-session@1.14.2
│ ├── crc@3.4.1
│ ├── on-headers@1.0.1
│ └─┬ uid-safe@2.1.3
│   ├── base64-url@1.3.3
│   └── random-bytes@1.0.0
├─┬ express-winston@2.1.2
│ ├─┬ chalk@0.4.0
│ │ ├── ansi-styles@1.0.0
│ │ ├── has-color@0.1.7
│ │ └── strip-ansi@0.1.1
│ └── lodash@4.11.2
├── marked@0.3.6
├── moment@2.17.1
├─┬ mongoose@4.7.6          # 注意这里最初安装的mongoose, 后来改为mongolass
│ ├─┬ async@2.1.4
│ │ └── lodash@4.17.4
│ ├── bson@1.0.3
│ ├── hooks-fixed@1.2.0
│ ├── kareem@1.2.0
│ ├─┬ mongodb@2.2.16
│ │ └── mongodb-core@2.1.2
│ ├── mpath@0.2.1
│ ├── mpromise@0.5.5
│ ├─┬ mquery@2.0.0
│ │ ├── bluebird@2.10.2
│ │ └── sliced@0.0.5
│ ├── ms@0.7.2
│ ├── muri@1.1.1
│ ├── regexp-clone@0.0.1
│ └── sliced@1.0.1
├── objectid-to-timestamp@1.3.0
├─┬ sha1@1.1.1
│ ├── charenc@0.0.2
│ └── crypt@0.0.2
└─┬ winston@2.3.0
  ├── async@1.0.0
  ├── colors@1.0.3
  ├── cycle@1.0.3
  ├── eyes@0.1.8
  ├── isstream@0.1.2
  └── stack-trace@0.0.9
```


## 创建配置文件

* 配置文件用于配置服务器监听的端口号, session, mongodb连接等
* 创建`/config/`目录, 在其中创建`default.js`文件, 添加如下配置代码
    - `port`: web服务器监听端口号
    - `session`: express-session的配置信息
    - `mongodb`: mongodb的地址, 地址最后为db名称
    
```javascript
// 默认配置文件
module.exports = {
    port:3000,                                 // web服务器监听端口
    session:{                                  // session设置
       secret:'nblog',
       key:'nblog',
       maxAge:1000 * 60 * 60 * 1
    },
    mongodb:'mongodb:localhost:27017/nblog'    // mongodb连接配置
};
```


## 功能和路由设计

目前的页面是由服务器渲染的, 浏览器只能通过GET和POST表单获取和提交数据, 所以api设计并不是RESTful的. 如果前端通过Ajax与服务器交互, 则可以设计为RESTful API, 如删除用DELETE, 更新用PUT

* 注册
    - 访问注册页面: `GET /signup`
    - 提交注册信息: `POST /signup`
* 登录
    - 访问登录页面: `GET /signin`
    - 提交登录信息: `POST /signin`
* 登出
    - 登出页面: `GET /signout`
* 查看文章
    - 查看文章列表页面: `GET /posts`
    - 查看指定用户文章: `GET /posts?author=xxx`
    - 查看指定文章: `GET /posts/:postId`
* 发表文章
    - 访问发表文章页面: `GET /posts/create`
    - 提交要发表的文章: `POST /posts`
* 编辑文章
    - 访问编辑文章页面: `GET /posts/:postId/edit`
    - 提交修改后的文章: `POST /posts/:postId/edit`
* 删除文章
    - 删除指定文章: `/posts/:postId/delete`
* 评论
    - 创建指定文章的评论: `POST /posts/:postId/comment`
    - 删除指定文章的指定评论: `/posts/:postId/comment/:commentId/delete`


### session

* HTTP是无状态的协议, 所以在服务端需要记录用户状态时, 需要用到一种机制来识别用户
    - `cookie`: 存储在浏览器, 有大小限制, 可以在客户端被修改, 并不安全
    - `session`: 存储在服务端, 没有大小限制. 实现方式基于cookie, 即session id存储在浏览器的cookie中
* 使用`express-session`中间件实现session的支持
    - session中间件会在req上添加session对象
        - 最初`req.session`为`{}`空对象
        - 当用户登录后, 设置`req.session.user=用户信息`
        - 返回浏览器的头信息中会带上`set-cookie`, 将session id写入浏览器的cookie中
        - 此后该用户所有的请求中都会通过带有的cookie中的session id让服务端查找到该用户, 保持用户的状态

```javascript
app.use(session(options));
```


### 页面通知

* 页面操作成功, 失败, 或其他情况, 需要显示通知提示
* `connect-flash`中间件可以实现该功能
    - 它通过设置初始值`req.session.flash = {}`, 通过`req.flash(name, value)`设置该对象的字段和值, 通过`req.flash(name)`获取值, 同时删除该字段


### 权限控制

* 登录/未登录用户的操作权限需要区分
* 权限控制的实现方式
    - 将用户状态检查封装为一个中间件, 在每个需要权限控制的路由加载该中间件

```javascript
// 从session中获取用户信息
req.session.user

// 用户信息不存在
!req.session.user

// 重定向页面
res.redirect('路由');  // 重定向到指定路由
res.redirect('back');  // 重定向返回到前一个页面

// 调用下一个中间件
next();
```


### 创建路由文件

* express的相关方法
    - `var app = express();`: 创建express对象
    - `app.METHOD(path, callback [, callback ...])`: HTTP方法
    - `app.use([path,] function [, function...])`: 为指定路径加载中间件方法
    - `express.Router([options])`: 创建路由对象
    - `res.send()`: 发送响应
* 注意
    - 在特定路由文件中, 方法中的路径根目录是以当前路由文件开始的. 如`/posts.js`路由中, 操作`/posts/:postId`路径时只需要写`/:postId`即可
* 疑问
    - `app.get('/')`和`router.get('/')`区别?
    app是express对象, `/`是主机根路径; router是当前路由文件, `/`相对于当前路由路径


### 创建入口文件

* express的相关方法
    - `app.set(name, value)`: 为指定字段设置值, name是app设置表中的字段
    - `express.static(root, [options])`: express中唯一内置中间件. 用于静态文件
* `__dirname`: node内置变量, 指向当前文件所在目录的绝对路径
* `__filename`: node内置变量, 指向当前文件的绝对路径


## 页面设计


### 页面切分

主页:   
![主页](https://github.com/nswbmw/N-blog/raw/master/book/img/4.5.12.png)   

文章页:   
![文章页](https://github.com/nswbmw/N-blog/raw/master/book/img/4.5.13.png)


### 模板拆分

* 根据UI图, 将模板文件拆分为多个部分, 然后使用`<%- include('模板名') %>`引入
* 模板中引用了一些变量, 这些变量是在`index.js`中设置的, 通过`app.locals`和`res.locals`两个变量
* express中有两个对象可用于模板的渲染, 两者基本相同, 但在使用习惯上略有区别
    - `app.locals`: 通常挂载常量信息(如博客名, 描述, 作者)
    - `res.locals`: 通常挂载变量信息, 即每次请求的值可能不一样(如用户信息)

```javascript
// 设置模板全局常量, 使用app.locals
app.locals.blog = {
    title:pkg.name,
    description:pkg.description
};

// 添加模板必须的三个变量, 使用res.locals
app.use(function(req, res, next) {
    res.locals.user = req.session.user;
    res.locals.success = req.flash('success').toString();
    res.locals.error = req.flash('error').toString();
    next();
});
```


## 连接数据库

```javascript
var config = require('config-lite');
var Mongolass = require('mongolass');
var mongolass = new Mongolass();

// 连接数据库
mongolass.connect(config.mongodb);
```


## 实现注册功能


### 用户模型设计

* 用户信息
    - 用户名
    - 用户密码(sha1)
    - 头像(上传文件, 但保存文件路径到数据库)
    - 性别
    - 个人介绍


### 注册页面

* `form`表单在上传文件时需要添加`enctype="multipart/form-data"`属性
* `res.render()`可以返回渲染后的模板文件


### 注册与上传文件

* `express-formidable`中间件用于处理form表单及文件上传
* 获取表单数据
    - `req.fields.HTML标签name属性值`: 获取标签value
    - `req.files.HTML标签name属性值.path`: 获取文件路径
        - 然后再`.split(path.sep).pop()`获取文件名


## 登出和登录

### 登出

* 登出就是将session中的用户信息清空
    - `req.session.user = null`

### 登录

* 登录就是查询用户名是否存在, 密码是否匹配. 如果存在且匹配, 则将用户信息保存到session中(不存密码)



## 文章


### 文章模型设计

* 文章模型
    - author: 作者id
    - title: 标题
    - content: 文章内容
    - pv: 浏览量

### 发表文章

* 获取提交的文章插入数据库

### 文章列表页和文章详情页

* 查找数据库循环显示在内容模板中

### 编辑与删除文章

* 通过postId在数据库中查找记录
* 通过author查找是否是该文章作者, 以确定权限
* 编辑=update, 删除=delete


## 评论

### 评论模型设计

* 评论
    - 作者
    - 评论内容
    - 被评论的帖子id 

### 显示评论

* 评论数即某个postId下评论的count总和
* 通过author判断是否具有删除评论的权限

### 创建和删除评论



## 404页面

* 访问不存在的路径时的友好显示
* `res.headersSent`: 是否发送了响应, 如果没法送则使用404模板


## 错误页面

* 当服务器出现错误时显示友好页面, 而不要把错误显示出来, 主要是为了安全


## 忽略文件

* 上传空目录而不上传其中文件的方法:

```shell
# Ignore everything in this directory
*
# Except this file
!.gitignore
```
