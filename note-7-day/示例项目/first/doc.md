# 第一次迭代

## 设计

流程图

```shell
           +---------+   +-----------+   +----------+
request -->|  parse  |-->|  combine  |-->|  output  |--> response
           +---------+   +-----------+   +----------+
```

* 服务器首先分析URL, 得到请求的文件路径和类型(MIME)
* 服务器读取请求的文件, 并按顺序合并文件内容
* 服务器返回响应, 返程对一次请求的处理
* 服务器读取文件时需要有个根目录, 监听的HTTP端口也需要可配置


