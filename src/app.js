const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')

const index = require('./routes/index')
const users = require('./routes/users')
const errorViewRouter = require('./routes/viewRoute/error')
const jwtKoa = require('koa-jwt')
const session = require('koa-generic-session')
const redisStore = require('koa-redis')
const {SECRET} = require('./conf/constants')
const {REDIS_CONF} = require('./conf/db')
// middlewares
app.use(bodyparser({
    enableTypes:['json', 'form', 'text']
}))
app.use(json())
// 可以在控制台里面打印一些日志
app.use(logger())
// 把public里面的目录注册为静态化了
app.use(require('koa-static')(__dirname + '/public'))
//注册ejs的文件，不注册用不了ejs的语法
app.use(views(__dirname + '/views', {
    extension: 'ejs'
}))
// session 配置
app.keys = ['Usdadad12313@#%$#']
app.use(session({
    key: 'weibo.sid',// cookie name 默认是'koa.sid
    prefix: 'weibo.sess:',// redis key 的前提默认是'koa:sess'
    cookie: {
        path: '/',//根目录
        httpOnly: true, //不允许客户端更改
        maxAge: 24 * 60 * 1000
    },
    ttl: 24 * 60 * 1000, //redis 过期时间，不写默认同cookie的过期时间
    store: redisStore({
        all: `${REDIS_CONF.host}:${REDIS_CONF.port}`
    })
}))
// logger
app.use(async (ctx, next) => {

    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)

})
//jwt
app.use(jwtKoa({
    secret:SECRET
}).unless({
    path: [/^\/users\/login/] // 自定义那些目录不需要jwt验证

}))
// routes
let onerrorConf = {}
onerrorConf = {
    redirect:'/error'
}
// error handler 在页面上面显示
onerror(app, onerrorConf)
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(errorViewRouter.routes(), errorViewRouter.allowedMethods())
// error-handling 在控制台里面打印
app.on('error', (err, ctx) => {

    console.error('server error', err, ctx)

});

module.exports = app
