// stream流

// Buffer数据流
// 文件流（读取大体积文件 上传图片） readFile(小体积文件)

const fs = require("fs");
// fs.createReadStream(path[, options]) 创建可读流对象 
// fs.createWriteStream(path[, options]) 创建可写流对象

const readStream = fs.createReadStream("./stream.html", {encoding:"utf8"});
const writeStream = fs.createWriteStream("./stream_2.html", {encoding:"utf8"});

writeStream.on("pipe", source => {
    console.log("管道输送的数据----"+ JSON.stringify(source));
});

// pipe管道流  管道的形式来输送数据，进行数据传输，读取文件的内容
readStream.pipe(writeStream);
