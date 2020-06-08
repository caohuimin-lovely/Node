// node API events事件
// node基于事件驱动

const EventEmitter = require("events"); //模块，无需安装 安装node 带有这些模板
// ES6继承  MyEmitter得到EventEmitter原型对象
class MyEmitter extends EventEmitter{

}

// ES5继承
function Player(){
    EventEmitter.call(this);
}

//原型对象
Player.prototype = new EventEmitter();

// Events三个原型方法
// on  监听事件
// emit    发送事件
// once    监听一次

let m1 = new MyEmitter();   //实例化
m1.on("love you",(msg) => { //监听在前
    console.log("love you on" + msg);
});
m1.emit("love you", 'hhhhh love you too');  //发送在后
m1.emit("love you", 'hhhhh love you too 1');
m1.emit("love you", 'hhhhh love you too 11');
m1.on("learn", () => {
    console.log("learn......");
});
m1.emit("learn");

let p1 = new Player();
p1.once("todosome", (todo) => {
    console.log("once todosome,只执行一次" + todo);
});
p1.emit("todosome", "11111");
p1.emit("todosome", "111111");
