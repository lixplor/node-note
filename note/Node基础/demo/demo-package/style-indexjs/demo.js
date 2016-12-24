var cat = require('./cat');  // 因为cat包中有index.js, 所以直接引用包目录路径即可

var c = cat.create('index.js');
console.log('My name is ' + c.name);
