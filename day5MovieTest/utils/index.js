const crypto = require("crypto");   // Node 自带API 

// MD5 只能加密不能解密 
// 加密函数  data 需要加密的字段 
function aesEncrypt(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return crypted;  // 密文  
}

// 解密 
function aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;  // 明文 
}

const keys = "NZ1903daydayup";   //   zklabc ==>  NZ1903daydayupzklabc

exports.aesEncrypt = aesEncrypt;   // 加密
exports.aesDecrypt = aesDecrypt;   // 解密
exports.keys = keys;        // 密钥

// token拦截的中间件 判断是否登录
exports.checkToken = function(req, res, next){
    console.log("ffffffff");
    const client_token = req.headers.token; 
    const server_token = req.session.token; // 服务器的token  通过req.session得到
    console.log("客户端token" + client_token);  // 客户端 通过headers  axios带过去的
    console.log("服务器token" + server_token);

    if(req.path !== "/vue/login" && req.path !== "/vue/register"){  //登录注册不需要token判断
        if(client_token){
            if(server_token){
                if(client_token === server_token){  //合法的登录用户
                    next()
                    
                }else{  //token有误
                    res.json({
                        code : '3000',
                        type : 0,
                        msg : "token有误，请重新登录"
                    })
                }
            }else{  //登录超时
                res.json({
                    code : '3000',  //3000表示未登录
                    type : 0,
                    msg : "token失效，登录超时"

                })
            }
        }else{  //没有登录
            res.json({
                code : '3000',
                type : 0,
                msg : "token不存在，未登录"
            })
        }
    }else{
        next();
    }

      
}




// 判断是否登录的逻辑
exports.checkSession = function(req, res, callback){
    if(req.session.username){
        callback(); //如果用户名存在，执行函数
    }else{
        res.send(`<script>alert("你的登录已经失效，请重新登录");location.href='/login'</script>`)
    }
}
// 日期格式化
exports.dateFormat = function(){
    let value = new Date();
    let year = value.getFullYear();
    let month = value.getMonth() + 1;
    let day = value.getDate();
    let hour = value.getHours();
    let min = value.getMinutes();
    let sec = value.getSeconds();
    return `${year}-${month}-${day} ${hour}:${min}:${sec}`;
    
}