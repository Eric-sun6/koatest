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

const {SECRET} = require('./conf/constants')
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
