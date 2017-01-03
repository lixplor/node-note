var http = require('http');

var options = {
    hostname:'www.baidu.com',
    port:80,
    path:'/',
    method:'GET'
};

var request = http.request(options, function(response) {
    console.log(response);
});
request.write('Hello');
