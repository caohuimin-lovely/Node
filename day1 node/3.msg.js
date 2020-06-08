let msg = "这是一个msg";

// 模块化开发
    // 模块定义 define  所有js文件本身就是一个模块无需define    css、png需要定义
    // 模块暴露 exports
    // 模块导入 require

// CommonJS规范    所有的模块开发都必须遵循CommonJS规范 可以让js不仅可以运行在浏览器端（script），还可以运行在服务器端
// nodejs、webpack完美遵循commonjs

// 模块暴露
// 一个模块暴露一个接口
module.exports = msg;