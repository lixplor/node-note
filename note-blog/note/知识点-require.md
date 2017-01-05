# require

* require可以加载`.js`, `.json`, `.node`文件
* require过程是同步的, 异步导出文件只能获得`{}`空对象
* require的查找机制:
    - 如果目录下有`package.json`文件, 并指定了`main`字段, 则使用之
    - 如果没有`package.json`文件, 则依次尝试加载目录下的`index.js`和`index.node`
* require加载的文件会被加载到缓存中, 多次require同一个模块, 不会造成重复加载
* 判断是否是程序的入口文件有两种方式
    - `require.main === module` 推荐
    - `module.parent === null`

```javascript
// 不能异步导出对象
setTimeout(() => {
    module.exports = {a:'hello'};
}, 0);
```

## 循环引用

* a require b, b require a. 或者a require b, b require c, c require a.
* 循环引用不会报错, 但会造成require结果是空对象`{}`
    - 原因是, b require a, 那么a初始化时需要require b, 但是b初始化也需要require a, 都没有初始化好, 所以为空对象
* 2种解决方法
    - 分离共用代码到另一个文件
    - 不在最外层require, 而是在用到的地方require, 通常在函数的内部
