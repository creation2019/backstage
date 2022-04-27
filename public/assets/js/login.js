$(function () {
    //点击去注册
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    //点击去登录
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //获取layui form 对象
    let form = layui.form
    let layer = layui.layer
    form.verify({
        //自定义
        pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
        //校验两次密码规则
        repwd: function (value) {
            let pwd = $('.reg-box [name=password]').val()
            if (pwd !== value) {
                return '两次密码不一致！'
            }
        }
    })

    //注册
    $('#form_reg').submit(function (e) {
        //阻止默认行为
        e.preventDefault()

        $.post('/api/reguser', {
            username: $('#form_reg [name=username]').val(),
            password: $('#form_reg [name=password]').val()
        }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
            }
            // console.log('注册成功');
            layer.msg('注册成功,去登陆')
            setTimeout(function () {
                $('#link_login').click()
            }, 2000)

        })

    })


    //登录
    $('#form_login').submit(function (e) {
        //阻止默认行为
        e.preventDefault()
        // console.log($(this).serialize());
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success: function (res) {
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('登录失败！')
                }
                layer.msg('登录成功')
                //将 token
                // console.log(res.token);
                localStorage.setItem('token', res.token)
                location.href = 'http://localhost:3000/index.html'
            }
        })

    })

})