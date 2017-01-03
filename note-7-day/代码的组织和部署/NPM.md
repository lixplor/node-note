# NPM

* NPM即`Nodejs Package Manager`, 是与Node一起安装的包管理工具
    - 允许用户从NPM服务器下载别人编写的三方包到本地使用
    - 允许用户从NPM服务器下载并安装别人编写的命令行程序到本地使用
    - 允许用户将自己编写的包或命令行程序上传到NPM服务器供别人使用

## 下载三方包

* 先确定三方包的名称 (Google, 百度)
* 在[npmjs.org](http://npmjs.org)中搜索
* 使用`npm`命令下载
    - `$ npm install argv`: 将三方包下载到工程目录的`node_modules`目录中
    - `$ npm install argv@0.0.1': 指定要下载三方包的版本
    - 使用`package.json`批量下载
        - 如果项目引入的三方包比较多, 一个一个安装则很不方便
        - 在`package.json`文件中加入`"dependencies":{ "包名1":"版本", "包名2":"版本" }`
        - 在命令行执行`npm install`即可全部安装依赖的三方包
* 在项目中引用三方包: `require('argv');` , 不用填写路径

## 安装命令行程序

```shell
$ npm install node-echo -g
```

* `-g`表示全局安装, 会被安装到系统默认位置:

```shell
- /usr/local/               # *nix系统下
    - lib/node_modules/
        + node-echo/
        ...
    - bin/
        node-echo
        ...
    ...
```

## 发布代码

* 注册账号: 终端执行`npm adduser`按照提示操作
* 编辑`package.json`文件, 填写相关内容
* 终端执行: `npm publish`发布

```json
{
    "name": "node-echo",           # 包名，在NPM服务器上须要保持唯一
    "version": "1.0.0",            # 当前版本号
    "dependencies": {              # 三方包依赖，需要指定包名和版本号
        "argv": "0.0.2"
      },
    "main": "./lib/echo.js",       # 入口模块位置
    "bin" : {
        "node-echo": "./bin/node-echo"      # 命令行程序名和主模块位置
    }
}
```

## 版本号

* NPM使用语义版本号管理代码, 即`X.Y.Z`
    - X: 主版本号. 大变动, 向下不兼容
    - Y: 次版本号. 新增功能, 向下兼容
    - Z: 不定版本号. 修复bug

* 版本号可以依赖于某个范围
    - 如`"argv":"0.0.x"`, 表示依赖于`0.0.x`系列的最新版`argv`

## 小知识

* `npm install`: 安装
* `npm publish`: 发布
* `npm help`: 查看帮助
* `npm help <command>`: 查看某个命令的帮助
* 在`package.json`所在目录下执行`npm install . -g`可以现在本地安装当前命令行程序, 用于发布前本地测试
* `npm update <package>`: 将当前目录下的`node_modules`子目录中对应模块更新至最新版本
* `npm update <package> -g`: 把全局安装的对应命令行程序更新至最新版
* `npm cache clear`: 清空NPM本地缓存, 用于对付使用相同版本号发布新版本代码的人
* `npm uppublish <package>@<version>`: 撤销发布的某个版本代码
