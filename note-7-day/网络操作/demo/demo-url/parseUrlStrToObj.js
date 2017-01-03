var url = require('url');

function parseUrlToObject(urlStr) {
    return url.parse(urlStr);
}

var testUrl = 'http://user:pass@host.com:8080/p/a/t/h?query=string#hash';
console.log(parseUrlToObject(testUrl));
