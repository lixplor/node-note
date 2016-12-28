var qs = require('querystring');
console.log(qs.stringify({ foo: 'bar', baz: [ 'qux', 'quux' ], corge: '' }));
