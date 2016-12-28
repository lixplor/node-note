var net = require('net');

var options = {
    port:8124,
    host:'localhost'
};

var client = net.connect(options, function() {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: localhost',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', function(data) {
    console.log(data.toString());
    client.end();
});
