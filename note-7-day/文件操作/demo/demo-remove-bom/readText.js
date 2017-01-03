// 读取文本文件时去除BOM
var fs = require('fs');

function readText(pathname) {
    var bin = fs.readFileSync(pathname);
    if(bin[0] === 0xEF && bin[1] === 0xBB && bin[2] === 0xBF) {
        bin = bin.slice(3);
    }
    return bin.toString('utf-8');
}

var text = readText('./word.js');
console.log(text);
