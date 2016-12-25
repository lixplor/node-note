var fs = require('fs');  // 内置模块fs, 用于操作文件流

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src)); // 从源文件读取流, 再写入目标文件
}

function main(argv) {
    copy(argv[0], argv[1]);  // 读取参数
}

main(process.argv.slice(2)); // 读取命令行参数, 切分后调用复制方法
