//导包
const express=require('express');
const path=require('path');

//创建路由
const accountRounter=express.Router();

//导入控制器
const accountControllers=require(path.join(__dirname,'../controllers/accountControllers'));

//不同请求的路径
//get访问登录页面
accountRounter.get('/login',accountControllers.getLoginPage);

//post访问登录页面
accountRounter.post('/login',accountControllers.login);

//获取登录页面的验证码图片
accountRounter.get('/vcode',accountControllers.getVcode);

//get访问注册页面
accountRounter.get('/register',accountControllers.getRegisterPage);

//post访问注册页面
accountRounter.post('/register',accountControllers.register);

//get处理登出的页面
accountRounter.get('/logout',accountControllers.logout);

//导出路由
module.exports=accountRounter;