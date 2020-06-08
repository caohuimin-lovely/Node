
const mongoose = require("mongoose");
const Schema = mongoose.Schema;   // 构造函数  Schema
const user_schema = new Schema({   // 定义表结构 
    username : String,
    password :String,
    age : Number,
    nickname:String,
    confirmpwd:String,
    time:Date,
    email:String,
    mobile : String,
    pic : String,
    type : Number,  //0普通用户 1管理员
    category : String,   //1志愿者   2租户   3.业主
    isTest:Boolean, //是否核酸检测
});  

exports.User = mongoose.model("user",user_schema)  // 英语复数  users

const emp_schema = new Schema({
    empname:String,
    empno:Number,
    empage:Number,
    empLeaear:String
})

exports.Emp = mongoose.model("emp",emp_schema);  // Emp 来操作 emps 表 

const student_schema = new Schema({
    stuname:String
});

exports.Student = mongoose.model("student",student_schema); // students 


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

exports.Mv = mongoose.model("mv",movie_schema);    // mvs 

const comment_schema = new Schema({ //评论表
    id : Number,    //评论序号
    title : String, //评论标题
    content : String,   //评论内容
    username:String,    // 评论人
    time : String,  //评论时间
    mid : String,   //评论的电影的id
    mtitle: String, //评论的电影标题
    mpic: String    //评论电影的图片
}); 

exports.Comment = mongoose.model("comment", comment_schema);

//控制id自增长
const uid_schema = new Schema({ 
    id:Number,
    name:String
});

exports.Uid = mongoose.model("uid",uid_schema);     

const conpon_schema = new Schema({
    "id" : Number, 
    "name" : String, 
    "code" : String, 
    "type" : Number, 
    "typeName" : String, 
    "isExchange" : Boolean, 
    "startDate" : String, 
    "endDate" : String, 
    "saleAmt" : Number, 
    "couponAmt" : Number, 
    "overdue" : Boolean, 
    "couponDesc" : String, 
})
exports.Coupon = mongoose.model("coupon", conpon_schema);

const product_schema = new Schema({
    "id" : Number, 
    "imageUrl" : String, 
    "productName" : String, 
    "promotionWord" : String, 
    "promotionsTags" : String, 
    "origPrice" : String, 
    "price" : String, 
    "endTime" : String, 
    "isChecked": Boolean,
})
exports.Product = mongoose.model("product", product_schema);

const cart_schema = new Schema({
    "id" : Number, 
    "userMobile" : String,
    "goodId" : String,
    "imageUrl" : String, 
    "title" : String, 
    "price" : String, 
    "num" : Number,
    "isChecked": Boolean,

})
exports.Cart = mongoose.model("cart", cart_schema);



const eater_schema = new Schema({
    "id" : Number, 
    "pic" : String, 
    "content" : String, 
    "userpic" : String, 
    "username" : String, 
    "see" : String

})
exports.Eater = mongoose.model("eater", eater_schema);


const liuyan_schema = new Schema({
    title : String,
    content : String

})
exports.Liuyan = mongoose.model("liuyan", liuyan_schema);

// 居民体温表
const tw_schema = new Schema({
    username : String,
    mobile : String,
    wendu : Number, //大于37.4
    time : Date,
    toggle : Boolean   //判断是否发烧

})
exports.Tw = mongoose.model("tw", tw_schema);

// 社区建议表
const advise_schema = new Schema({
    author : String,
    title : String,
    category : Array, 
    content : String, 
    time : Date,
})
exports.Advise = mongoose.model("advise", advise_schema);

// 商品表
const good_schema = new Schema({
    "name": String,
    "price": Number,
    "discount": Number,
    "img": String,
    "type": Object
})
exports.Good = mongoose.model("good", good_schema);

const employee_schema = new Schema({   // 定义表结构    员工表 
    username : String,
    time:Date,
    email:String,
    mobile : String,
    pic : String,
    type : Number,  //0普通用户 1管理员
    category : String,   //1店长 2.导购 3.线上客服
    address : String,
    grade : String, //效绩
});  

exports.Employee = mongoose.model("employee",employee_schema)  // 英语复数  users


const tfproducts_schema = new Schema({   // 定义表结构    商品表 
    name : String,
    time:Date,
    img : String,
    type : String,  //1 口红  2 香水  3 气垫  4 眼影  5 刷具
    price : String,
    sells : String
});  

exports.Tfproducts = mongoose.model("tfproducts",tfproducts_schema)  // 英语复数  users