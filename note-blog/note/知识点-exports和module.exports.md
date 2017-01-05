# exports和module.exports

* 两者用于导出代码
* 区别
    - `module.exports`初始值为`{}`空对象
    - `exports`是指向`module.exports`的引用
    - require返回的是`module.exports`

```javascript
exports = module.exports = {...}
// 等价于
module.exports = {...}
exports = module.exports;
```
