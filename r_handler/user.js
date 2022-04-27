//导入数据库
const db = require('../m_db/m_db')

//用户密码进行加密
const bcrypt = require('bcryptjs')

// 注册用户的处理函数
exports.regUser = (req, res) => {
    // 获取用户注册信息
    const userinfo = req.body

   /*  // //对数据进行合法性验证
    if (!userinfo.username || !userinfo.password) {
        return res.cc('用户名或密码不合法！')
    } */

    // 判断用户名是否注册
    const sq1 = 'select * from ev_users where username=?'
    db.query(sq1, userinfo.username, (err, data) => {
        if (err) return res.cc(err)

        if (data.length > 0) return res.cc('用户名被占用，请更换其他用户名！')

    })
    // 对用户的密码,进行加密                               10加密界别更高
    userinfo.password = bcrypt.hashSync(userinfo.password, 10)
    // console.log(userinfo);
    const sq2 = 'insert into ev_users set ?'
    db.query(sq2, {
        username: userinfo.username,
        password: userinfo.password
    }, function (err, results) {
        if (err) return res.cc(err)
        if (results.affectedRows !== 1){

            return res.cc('注册用户失败，请稍后再试！')
        } 
        res.cc('注册成功！')
        
    })



    
}

// 登录的处理函数
exports.login = (req, res) => {
    res.send('login OK')
}