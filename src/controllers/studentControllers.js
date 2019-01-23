const path = require('path');
const template = require('art-template');
const session = require('express-session');
//导入数据库的封装函数
const databasetool = require(path.join(__dirname, '../tools/tools'));

//处理学生列表数据页面，以及输入关键字查找
exports.getListPage = (req, res) => {
    const keyWords = req.query.key || '';
    console.log(keyWords);

    //查找数据库的所有的人员
    databasetool.find('studentinfo', { name: { $regex: keyWords } }, (err, docs) => {
        //拿到查询的所有人员信息数据，渲染到list文件里面，然后输出html---拿到从登录页面session里的用户名，渲染到父页面上
        const html = template(path.join(__dirname, '../public/html/list.html'), { student: docs, keyWords, username: req.session.username });
        res.send(html);
    })
}

//处理访问新增学生的页面
exports.getAddPage = (req, res) => {
    const html = template(path.join(__dirname, '../public/html/add.html'), { username: req.session.username });
    res.send(html);
}

//处理新增学生数据
exports.add = (req, res) => {
    //拿到页面传送过来的数据，保存后渲染到学生列表页面
    databasetool.insertOne('studentinfo', req.body, (err, doc) => {
        if (!doc) {//保存失败
            res.send(`<script>alert('新增失败！')<script>`);
        } else {
            res.send(`<script>location.href='/student/list'</script>`);
        }
    })
}

//导入mongodb里的objectId方法，来获取自动生成的id
const objectId = require('mongodb').ObjectId;

//处理访问编辑的页面
exports.getEditPage = (req, res) => {
    const _id = objectId(req.query.id);
    //取出get参数中带着的id，找到数据，渲染到页面的输入框里
    databasetool.findOne('studentinfo', { _id }, (err, doc) => {
        doc.username = req.session.username;
        const html = template(path.join(__dirname, '../public/html/edit.html'), doc);
        res.send(html);
    })
}

//处理修改编辑页面数据
exports.edit = (req, res) => {
    const _id = objectId(req.params.studentId);

    //拿到页面上的数据，然后修改数据库，再返回给学生列表页面
    databasetool.updateOne('studentinfo', { _id }, { $set: req.body }, (err, doc) => {
        if (!doc) {//修改失败
            res.send(`<script>alert('修改失败！')<script>`);
        } else {//修改成功，返回学生列表页面
            res.send(`<script>location.href='/student/list'</script>`);
        }
    })
}

//处理删除的页面
exports.delete = (req, res) => {
    const _id = objectId(req.params.studentId);
    databasetool.deleteOne('studentinfo', { _id }, (err, doc) => {
        if (!doc) {
            res.send(`<script>alert('删除失败！')<script>`);
        } else {
            res.send(`<script>location.href='/student/list'</script>`);
        }
    })
}


