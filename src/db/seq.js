const Sequelize = require('sequelize')
//引入环境
const { isProd, isTest } = require('../utils/env')
const { MYSQL_CONF } = require('../conf/db')
//解构数据库的配置
const { host, user, password, database } = MYSQL_CONF

const conf = {
    host: 'localhost',
    dialect:'mysql'
}

//如果是test环境就关闭日志打印
if(isTest){
    conf.logging = ()=>{}
}

if(isProd){
    conf.pool = {
        max: 5, //连接池中最大的链接数量
        min: 0, //最小
        idle: 10000 // 如果一个链接池 10s 之内没有被使用，就释放
    }
}
const seq = new Sequelize(database, user, password, conf)

//测试数据库链接
// seq.authenticate().then(()=>{
//     console.log('ok')
// })

module.exports = seq

