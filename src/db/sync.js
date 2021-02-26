/**
 * @description sequelize 同步
 */
const seq = require('./seq')
// require('./model')
//测试链接
seq.authenticate().then(() => {

    console.log('ok')

}).catch(()=>{

    console.log('err')

})
//执行同步
seq.sync({force: true}).then(()=>{

    process.exit()

})