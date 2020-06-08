// ES5
// 构造函数（构造器+原型对象+静态对象）
function UserClass(name, age){
    this.name = name;
    this.age = age;
}
// static  静态对象 与this无关 不参与继承
UserClass.hobby = ["爱好1", "爱好2", "爱好3"];

// 原型对象 prototype必须和this有关
UserClass.prototype.say = function(){
    return this.name + 'is' + this.age;
}

exports.UserClass = UserClass;

// ES5如何实现继承 apply/call bind 只能改变this指向
function User(name, age, friend){
    UserClass.call(this, name, age);    
    // UserClass.apply(this, [name, age])
    this.friend = friend;
}
User.hobby = ["read", "game"];  //不能继承UserClass的个hobby
// User.prototype = new UserClass();   //第一种：实例化继承  原型链继承
for(var i in UserClass.prototype){  //第二种：拷贝继承
    User.prototype[i] = UserClass.prototype[i];
}

exports.User = User;