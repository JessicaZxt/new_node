//控制器页面，接收到路由传过来的路径，然后执行相关的操作，将控制器导出
const path = require('path');
const session=require('express-session');
//导入数据库封装好的函数，然后调用
const databasetool = require(path.join(__dirname, '../tools/tools'));

//处理get登录页面
exports.getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/login.html'));
}

//处理post登录页面
exports.login = (req, res) => {
    const result = {
        status: 0,
        message: '登录成功'
    };
    const {username,password,vcode}=req.body;
    //先从session中取出验证码，对比用户输入的验证码是否正确，如果验证码不正确，弹出对应的提示
    if(req.session.Vcode!=vcode){
        result.status=1;
        result.message='验证码错误';
        res.json(result);
    }else{//验证码正确，在数据库中查询是否有此用户
        databasetool.findOne('accountinfo',{username,password},(err,doc)=>{
            console.log(doc);
            if(!doc){//未查询到
                result.status=2;
                result.message='用户名或密码错误';
                res.json(result);
            }else{
                //将用户名存储在session里，用户登录成功后，渲染到右上角的父页面上
                req.session.username=username;
                res.json(result);
            }
        })
    }
}


//获取验证码
//导入验证码的包
const captchapng = require('captchapng');
exports.getVcode = (req, res) => {
    const Vcode = parseInt(Math.random() * 9000 + 1000);
    //将验证码存储在session中
    req.session.Vcode=Vcode;
    var p = new captchapng(80, 30, Vcode); // width,height,numeric captcha
    p.color(0, 0, 0, 0);  // First color: background (red, green, blue, alpha)
    p.color(80, 80, 80, 255); // Second color: paint (red, green, blue, alpha)
    var img = p.getBase64();
    var imgbase64 = new Buffer(img, 'base64');
    res.writeHead(200, {
        'Content-Type': 'image/png'
    });
    res.end(imgbase64);
}

//处理get注册页面
exports.getRegisterPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../public/html/register.html'));
}

//处理post注册页面
exports.register = (req, res) => {
    //在数据库中查询结果是否有注册过
    const result = {
        status: 0,
        message: '注册成功'
    };
    //接收从register页面传送过来的数据，是post请求，所有可以用req.body接收,解构赋值取出用户名
    const { username } = req.body;
    //从数据库里面查找，是否有此用户注册过
    databasetool.findOne('accountinfo', { username }, (err, doc) => {
        if (doc) {//有数据，代表注册过
            result.status = 1;
            result.message = '用户名已注册';
            res.json(result);
        } else {//没有注册过，插入一条新数据
            databasetool.insertOne('accountinfo', req.body, (err, doc) => {
                res.json(result);
            })
        }
    })
}

//处理登出的页面
exports.logout = (req, res) => {
    req.session.username = null;
    res.send(`<script>location.href='/account/login'</script>`);
}
