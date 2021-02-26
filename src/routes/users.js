const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../conf/constants')
router.prefix('/users')

router.get('/', function (ctx, next) {

    ctx.body = 'this is a users response!'

})

router.get('/bar', function (ctx, next) {

    ctx.body = 'this is a users/bar response'

})

router.post('/login',async (ctx, next)=>{

    let{username, password } = ctx.request.body
    let userInfo = null
    if(username === 'zhangsan' && password === '123'){

        //登录成功，获取用户信息
        userInfo={
            userId: 1,
            userName: 'zhangsan',
            nickName: '张三',
            gender: 1//男
        }

    }
    let token
    if(userInfo){

        token = jwt.sign(userInfo, SECRET, {expiresIn: '1h'})

    }
    if(userInfo === null){

        ctx.body = {
            errorno: -1,
            msg: '登录失败'
        }
        return

    }
    ctx.body = {
        errorno: 0,
        data: {
            userInfo,
            t: token},
        msg: 'success'
    }

})
module.exports = router
