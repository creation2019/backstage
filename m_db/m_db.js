//导入mysql
const mysql=require('mysql')

const db=mysql.createPool({
    host:'localhost',       //数据库的IP地址
    user:'root',            //账号
    password:'123456',      //密码
    database:'my_db_01'     //数据库名
})

//获取连接信息
db.getConnection((err,data)=>{
    if(err) return console.log(err);
    console.log('连接成功');
})

//向外共享 db对象
module.exports=db