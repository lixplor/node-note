# MongoDB的安装和使用

## MongoDB

* [MongoDB](http://mongodb.com/)
MongoDB是NoSQL数据库

* 安装方法
    - homebrew安装
    - 下载tar包安装

Homebrew安装MongoDB

```shell
# 先升级homebrew
brew update

# 安装MongoDB
brew install mongodb                 # Normal   
brew install mongodb --with-openssl  # TLS/SSL support
brew install mongodb --devel         # Development release
```

将mongo加入环境变量

```shell
# 查看mongo安装位置
which mongo

# 添加入环境变量, 以mac下.bash_profile为例
export PATH=${PATH}:/usr/bin/local/mongo

# 使环境变量生效
source .bash_profile
```

运行mongo

```shell
# 创建数据目录, 默认/data/db
mkdir /-p /data/db

# 设置数据目录的权限, 要有读写权限
sudo chmod 777 /data
sudo chmod 777 /data/db

# 运行mongo
mongod

# 设置开机启动
brew services start mongodb
```

## 安装MongoDB的GUI客户端

客户端有多种选择:
* Robomongo
* Mongochef
* MongoBooster

我最终安装的是MongoBooster


## 遇到的问题

* brew update报错

```shell
➜  ~ brew update
Error: /usr/local must be writable!
```

Mac OS X 10.12中`/usr/local`默认不可写, 需要修改权限:

```shell
➜  ~ sudo chown -R $(whoami) /usr/local
```

或者更新一下Homebrew, `brew upgrade`, 新版Homebrew不再需要`/usr/local`


* brew update报错2

```shell
➜  ~ brew update
/usr/local/Library/Homebrew/cmd/update.sh: line 13: /usr/local/Library/ENV/scm/git: No such file or directory
/usr/local/Library/Homebrew/cmd/update.sh: line 13: /usr/local/Library/ENV/scm/git: No such file or directory
/usr/local/Library/Homebrew/cmd/update.sh: line 13: /usr/local/Library/ENV/scm/git: No such file or directory
/usr/local/Library/Homebrew/cmd/update.sh: line 13: /usr/local/Library/ENV/scm/git: No such file or directory
/usr/local/Library/Homebrew/cmd/update.sh: line 13: /usr/local/Library/ENV/scm/git: No such file or directory
Error: update-report should not be called directly!
```

[stackOverFlow](http://stackoverflow.com/questions/38410020/homebrew-error-update-report-should-not-be-called-directly)

先`brew upgrade`, 然后`brew update`
