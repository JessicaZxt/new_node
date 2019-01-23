const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';

//设置数据库名
const dbName = 'qdzxt';

//创建一个方法的集合
const databasetool = {};

//创建连接数据库的方法
const clientAll = (collectionName, callback) => {
    MongoClient.connect(url, { useNewUrlParser: true }, function (err, client) {
        const db = client.db(dbName);
        const collection = db.collection(collectionName);
        callback(client, collection);
    });
}

//查询一条数据的方法
databasetool.findOne = (collectionName, data, callback) => {
    clientAll(collectionName, (client, collection) => {
        collection.findOne(data, (err, doc) => {
            //关闭数据库
            client.close();
            //回调函数传递异步数据
            callback(err, doc);
        });
    });
};

//查询所有数据的方法
databasetool.find = (collectionName, data, callback) => {
    clientAll(collectionName, (client, collection) => {
        collection.find(data).toArray((err, docs) => {
            //关闭数据库
            client.close();
            //回调函数传递异步数据
            callback(err, docs);
        });
    });
};

//新增一条数据的方法
databasetool.insertOne = (collectionName, data, callback) => {
    clientAll(collectionName, (client, collection) => {
        collection.insertOne(data, (err, doc) => {
            //关闭数据库
            client.close();
            //回调函数传递异步数据
            callback(err, doc);
        });
    });
};

//修改一条数据的方法
databasetool.updateOne = (collectionName, key, data, callback) => {
    clientAll(collectionName, (client, collection) => {
        collection.updateOne(key, data, (err, doc) => {
            //关闭数据库
            client.close();
            //回调函数传递异步数据
            callback(err, doc);
        });
    });
};

//删除一条数据的方法
databasetool.deleteOne=(collectionName, data, callback) => {
    clientAll(collectionName, (client, collection) => {
        collection.deleteOne(data, (err, doc) => {
            //关闭数据库
            client.close();
            //回调函数传递异步数据
            callback(err, doc);
        });
    });
};

//导出
module.exports = databasetool;