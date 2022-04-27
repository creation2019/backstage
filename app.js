// 导入 express 模块
const express = require('express')
// 创建 express 的服务器实例
const app = express()

const joi = require('@hapi/joi')

//静态资源
app.use(express.static('./public'))
// 导入 cors 中间件
const cors = require('cors')
// 将 cors 注册为全局中间件
app.use(cors())

// 配置解析 application/x-www-form-urlencoded 格式的表单数据的中间件
app.use(express.urlencoded({ extended: false }))


// 中间件 res对象挂载res.cc函数
app.use((req,res,next)=>{
  //status 默认为1  表示失败
  //err  错误对象  || 描述字符串
  res.cc=function (err,status=1){
    res.send({
      status,
      message: err instanceof Error ? err.message :err
    })
  } 
   next()
})


// 导入并注册用户路由模块
const userRouter = require('./router/user')
app.use('/api', userRouter)

// 错误中间件
app.use(function (err, req, res, next) {
  // 数据验证失败
  if (err instanceof joi.ValidationError) return res.cc(err)
  // 未知错误
  res.cc(err)
})

// 调用 app.listen 方法，指定端口号并启动web服务器
app.listen(3008, function () {
  console.log('api server running at http://127.0.0.1:3008')
})
