//导包
const express=require('express');
const path=require('path');

//创建路由
const studentRouter=express.Router();

//导入控制器
const studentControllers=require(path.join(__dirname,'../controllers/studentControllers'));

//设置访问路由的页面

//访问学生列表页面
studentRouter.get('/list',studentControllers.getListPage);

//get访问新增数据的页面
studentRouter.get('/add',studentControllers.getAddPage);

//post访问新增数据的页面
studentRouter.post('/add',studentControllers.add);

//get访问编辑的页面
studentRouter.get('/edit',studentControllers.getEditPage);

//post访问编辑的页面
studentRouter.post('/edit/:studentId',studentControllers.edit);

//get访问删除数据的页面
studentRouter.get('/delete/:studentId',studentControllers.delete);



//导出路由
module.exports=studentRouter;