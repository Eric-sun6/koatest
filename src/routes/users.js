const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const {SECRET} = require('../conf/constants')
const util = require('util')//util是node自己的模块
const verify = util.promisify(jwt.verify)// 这个方法就是为了把jwt的verify方法变成一个promise的方法
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
//获取用户信息
router.get('/getUserInfo', async (ctx, next)=>{

    console.log(ctx)
    let token = ctx.request.header.authorization
    console.log(token)
    try{

        const payload = await verify(token.split(' ')[1], SECRET)//取出token
        ctx.body = {
            errno:0,
            userinfo:payload
        }

    }catch(ex){

        ctx.body = {
            errno:0,
            msg:'verify token failed'
        }

    }


})
module.exports = router
