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


# 运行mongo
mongod
```

