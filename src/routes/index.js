const router = require('koa-router')()

router.get('/', async (ctx, next) => {
  await ctx.render('index', {
    title: 'Hello Koa 2!',
    msg: 'eeeee',
    isme: true,
    list:[
      {
        id: '2313',
        component: '这是内容简介11'
      },

      {
        id: '2313',
        component: '这是内容简介22'
      }
    ]
  })
})

router.get('/string', async (ctx, next) => {
  ctx.body = 'koa2 string'
})

router.get('/profile/:username', async (ctx, next) => {
  const {username} = ctx.params
  ctx.body ={
    title: 'this is a profile page',
    username
  }
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

module.exports = router
