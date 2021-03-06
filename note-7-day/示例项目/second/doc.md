# 第二次迭代

## 设计

* `map`换为`for`循环
* 耗时
    - 第一版代码最大的性能问题, 是依次把请求的文件读取到内存中后, 再合并数据和输出响应. 这会导致:
        - 当请求的文件较多较大时, 串行读取文件会比较耗时, 从而拉长服务端响应的等待时间
            - 不能简单的从串行改为并行, 因为机械硬盘只有一个磁头, 并行读取文件只会造成磁头频繁抖动, 降低IO效率. 对于固态硬盘, 已经在做并行IO了, 所以再将单个请求分为并行IO没有太多意义
            - 正确的做法是, 边读文件边输出响应, 把响应输出时机提前至读取第一个文件的时刻
        - 由于每次响应输出的数据都需要先完整的缓存在内存中, 当服务器请求并发数较大时, 会有较大内存开销

```shell
发送请求       等待服务端响应         接收响应
---------+----------------------+------------->
         --                                        解析请求
           ------                                  读取a.js
                 ------                            读取b.js
                       ------                      读取c.js
                             --                    合并数据
                               --                  输出响应
```

边读边输出响应的优化结果

```shell
发送请求 等待服务端响应 接收响应
---------+----+------------------------------->
         --                                        解析请求
           --                                      检查文件是否存在
             --                                    输出响应头
               ------                              读取和输出a.js
                     ------                        读取和输出b.js
                           ------                  读取和输出c.js
```
