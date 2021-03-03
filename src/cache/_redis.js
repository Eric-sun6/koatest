/**
 *@description 链接redis的方法get set
 *
 */

const redis = require('redis')
const {REDIS_CONF} = require('../conf/db')

//创建客户端
const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host)
redisClient.on('error', err=>{
  console.log('redis error', err)
})
/**
 *
 * redis set
 * @param {string} key
 * @param {string} val
 * @param {number} [timeout=60 * 60]
 */
function set(key, val, timeout = 60 * 60){
  if(typeof val === 'object'){
    val = JSON.stringify(val)
  }
  redisClient.set(key, val)
  redisClient.expire(key, timeout)
}
/**
 * @param {string} key
 */
function get(key){
  const promise = new Promise((resolve, reject)=>{
    redisClient.get(key, (err, val)=>{
      if(err){
        reject(err)
        return
      }
      if(val == null){
        resolve(null)
        return
      }
      try{//尝试把val变成对象，如果变不成对象
        resolve(
          JSON.parse(val)
        )
      }catch(err){//就直接返回值就好了
        resolve(vall)
      }
    })
  })
  return promise
}
module.exports ={
  set,
  get
}