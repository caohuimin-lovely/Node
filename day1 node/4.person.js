// ES6 构造函数
class Person{   
    constructor(name, age){
        this.name = name;
        this.age = age;
    }
    
    say(){
        return this.name + '说 : ' + this.age
    }
}
Person.hobby = ["work", "tour"]; 
exports.Person = Person;
class Student extends Person{
    constructor(name, age, score){
        super(name, age);   //super当作函数，表示指向父类的constructor
        this.score = score;
    }
    say(){  //覆盖了父类的say方法
        return super.say() + 'hahha' + this.score; //super当作对象 表示指向父类的原型对象
    }
}

exports.Student = Student;