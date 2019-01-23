//导包
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

//express实例化出的一个对象，这个对象里面有很多方法
const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

//设置页面访问静态资源文件
app.use(express.static(path.join(__dirname, 'public')));

app.use(
    session({
        secret: "keyboard cat",
        resave: false,
        saveUninitialized: false,
        cookie: { maxAge: 600000 }
    })
);

//判断用户是否有登录，如果有，则可以访问，否则则提示还未登录，返回到登录页面
//app先拦截到所有的页面请求,进行判断
app.all('/*', (req, res, next) => {//如果是account分流的，可以直接访问，继续后面的操作即可
    if (req.url.includes('account')) {
        next();
    } else {//不是以上分流的，需要判断session里有没有用户名，如果有，则证明用户登录过，没有的话就提示后返回到登录页
        if (req.session.username) {
            next();
        } else {
            res.send(`<script>alert('您还没有登录，请先登录！');location.href='/account/login'</script>`)
        }
    }
})

//导入路由
const accountRounter = require(path.join(__dirname, './routers/accountRouter'));
const studentRounter = require(path.join(__dirname, './routers/studentRouter'));

//设置页面分流
app.use('/account', accountRounter);
app.use('/student', studentRounter);

app.listen(8080, (err) => {
    if (err) {
        console.log(err);
    }
    console.log('start ok');
});
