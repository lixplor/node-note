var cat = require('./cat'); // 会通过cat目录下的package.json寻找入口模块

var c = cat.create('package.json');
console.log('My name is ' + c.name);
