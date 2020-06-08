const fs = require("fs");
// 创建文件并写入内容：writeFile,appendFile
// fs.writeFile(file, data[, options], callback)
// fs.writeFile("./writeFile.txt", "创建文件并写入内容：writeFile", "utf8", (err) => {
//     if(err) throw err;  //有异常就抛出  终止执行
//     console.log("writeFile:文件创建成功，并且编写成功");
// });

// fs.appendFile(file, data[, options], callback)  写入内容，如果文件不存在就创建，每次不会覆盖，累加
// fs.appendFile("./appendFile.txt", "创建文件并写入内容2,fs.appendFile \n", "utf8", (err) => {
//     if(err) throw err;
//     console.log("appendFile:文件创建成功，并且编写成功");
// });

// 读取文件的内容：readFile 重点
// fs.readFile(path[, options], callback)
// fs.readFile("./writeFile.txt", "utf8", (err, data) => {
//     if(err) throw err;
//     console.log(data);
// })
// // fs.readFileSync();  读取文件同步    async异步   sync同步
// // 同步：一个接着一个执行 有顺序之分
// // 异步：同时执行，没有顺序之分
// const fileData = fs.readFileSync("./appendFile.txt", "utf8");
// console.log(fileData);


// 列出目录的东西：readdir 读取目录的所有文件
// fs.readdir(path[, options], callback)
// fs.readdir("../day3Node4.9", "utf8", (err, files) => {
//     if(err) throw err;
//     console.log(files); //[ '1.maizuo.js', '2.fs.js', 'appendFile.txt', 'writeFile.txt' ]  
// });

// 删除目录与文件：rmdir,unlink
// rmdir  删除目录  fs.rmdir(path[, options], callback)
// unlink 删除文件  fs.unlink(path[, options], callback)
// 要想删除目录 必须先把目录里面的文件清空
const files = fs.readdirSync("dir");
console.log(files);
files.forEach(item => {
    fs.unlink("dir/" + item, (err) => {
        if(err) throw err;
        console.log("删除文件成功" + item);
    });
});
fs.rmdir("dir", (err) => {
    if(err) throw err;
    console.log("dir目录删除成功");
});
