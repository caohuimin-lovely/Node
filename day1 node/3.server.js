const http  =require("http");
const hostname = "0.0.0.0";
const port = 888;


let msg = require("./3.msg");   //引入msg模块   单接口
let word = require("./3.word"); //引入word模块  单接口

let {   //多接口
    list,
    todo,
    inp
} = require("./3.many");    //对象解构

let {
    UserClass,
    User
} = require("./4.userClass");
let u1 = new UserClass("张三",21);  //实例化
let u2 = new User('李四', 18, ['张三', '王五']);

let {
    Student
} = require("./4.person");
let s1 = new Student("老六", "12" , 100);



// 模块化开发，将复杂业务逻辑拆分成简单独立可被复用的单元主体
let server = http.createServer((req, res) => {
    if(req.url !== "/favicon.ico"){
        res.writeHead(200, {"content-type":"text/html;charset=utf8"});
        res.write(`<h2>模块化开发---module</h2>`);
        res.write(`<h2>msg---${msg}</h2>`);
        res.write(`<h2>word---${word}</h2>`);
        res.write(`<h2>list---${list}</h2>`);
        res.write(`<h2>todo---${todo}</h2>`);
        res.write(`<h2>inp---${inp}</h2>`);
        res.write(`<h2>UserClass---${u1.name}----${u1.age}----${UserClass.hobby}---${u1.say()}</h2>`);
        res.write(`<h2>User---${u2.name}----${u2.age}----${User.hobby}---${u2.friend}----${u2.say()}</h2>`); 
        res.write(`<h2>Student---${s1.name}----${s1.age}----${Student.hobby}---${s1.say()}</h2>`); 
        res.end();
    }
});
server.listen(port, hostname,() =>{
    console.log(`my server is running at http://${hostname}:${port}`);
})