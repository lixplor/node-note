// 导入相关包
var fs = require('fs'),
    path = require('path'),
    http = require('http');

// 声明文件类型
var MIME = {
    '.css':'text/css',
    '.js':'application/javascript'
};

// 组合文件
function combineFiles(pathnames, callback) {
    var output = [];  // 保存数据的数组
    (function next(i, len) {
        if(i < len) {
            fs.readFile(pathnames[i], function(err, data) {
                if(err) {
                    callback(err);
                } else {
                    output.push(data);  // 拼接数据到同一个数组
                    next(i + 1, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));
        }
    }(0, pathnames.length));
}

// 主要逻辑, 读取配置, 解析URL, 拼接文件
function main(argv) {
    // 读取配置, 使用JSON格式解析
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',  // 根目录根据配置, 或默认当前目录
        port = config.port || 80;   // 端口根据配置, 或默认80

    // 创建服务器
    http.createServer(function(request, response) {
        var urlInfo = parseURL(root, request.url);  // 解析URL

        // 拼接文件
        combineFiles(urlInfo.pathnames, function(err, data) {
            if(err) {
                response.writeHead(404);  // 如果出现错误返回404
                response.end(err.message);
            } else {
                response.writeHead(200, {
                    'Content-Type':urlInfo.mime
                });
                response.end(data);
            }
        });
    }).listen(port);
}

// 解析URL的各个部分
function parseURL(root, url) {
    var base, pathnames, parts;
    if(url.indexOf('??') === -1) {     // 如果url中没有??分隔符, 则在/后补充一个??分隔符
        url = url.replace('/', '/??');
    }
    parts = url.split('??');  // 通过??分隔符分割url
    base = parts[0];  // base是??前的部分
    pathnames = parts[1].split(',').map(function(value) {  // ??后的部分, 通过,分割, 然后拼接
        return path.join(root, base, value);
    });

    return {
        mime:MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

// 开始执行程序
main(process.argv.slice(2));  // 参数为JSON配置文件
