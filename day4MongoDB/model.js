// model  操作集合，表

// Schema ===> Schema主要用于定义MongoDb中集合Collection里文档document的结构
// 每个schema会映射到mongodb中的一个collection  结构
// schema不具备操作数据库的能力

// 定义schema要指定字段名和类型
// String      字符串
// Number      数字    
// Date        日期
// Buffer      二进制
// Boolean     布尔值
// Mixed       混合类型
// ObjectId    对象ID    
// Array       数组

const mongoose = require("mongoose");
const Schema = mongoose.Schema; //构造函数
// 定义结构文档的数据结构和类型（表结构）
const user_schema = new Schema({    //只能插入这三张数据无法插入别的字段
    username : String,
    password : String,
    age : Number
});

// model schema生成的模型  专门实现对数据的操作
// 使用model()方法，将schema编译为model
// model()方法的第一个参数是模型名称
// exports.User = mongoose.model("表名",schema);  
// user ===> users（数据库中的表名） 
exports.User = mongoose.model("user",user_schema);  //自定转为英语的复数

const emp_schema = new Schema({
    empname : String,
    empno : Number,
    empage : Number,
    empLeaear : String
});
exports.Emp = mongoose.model("emp", emp_schema);

const student_schema = new Schema({
    stuname : String
});
exports.Student = mongoose.model("student", student_schema);

const movie_schema = new Schema({
    "rating" :Object, 
    "genres" :Array, 
    "title" : String, 
    "casts" :Array, 
    "collect_count" : Number, 
    "original_title" : String, 
    "subtype" : String, 
    "directors" :Array, 
    "year" : String, 
    "images" : Object, 
    "alt" : String, 
    "id" : String
});
exports.Mv = mongoose.model("mv", movie_schema);

