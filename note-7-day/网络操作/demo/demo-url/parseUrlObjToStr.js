var url = require('url');

function parseUrlToObj(urlObj) {
    return url.format(urlObj);
}

var urlObj = {
    protocol:'http:',
    host:'www.baidu.com',
    pathname:'/s',
    search:'wd=s'
};

console.log(parseUrlToObj(urlObj));
