# 第四次迭代

## 设计

* 一般程序在服务器上有一个固定的部署目录, 每次程序有更新后, 都重新发布到部署目录中
* 完成部署后, 也可以通过固定的服务控制脚本来启动和停止服务


设计程序部署目录:

```shell
- deploy/
    - bin/                # 控制脚本
        startws.sh
        killws.sh
    + conf/               # 配置文件
        config.json
    + lib/                # 服务器代码
        daemon.js
        server.js
```
