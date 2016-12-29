var childProcess = require('child_process');
var util = require('util');

function copy(source, target, callback) {
    childProcess.exec(util.format('cp -r %s/* %s', source, target), callback);
}

var source = process.argv.slice(2)[0];
var target = process.argv.slice(2)[1];
copy(source, target, function(err) {
    console.log(err);
});
