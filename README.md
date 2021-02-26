# 什么是 sequelize ?

https://blog.csdn.net/daijun11/article/details/106457821

# 什么是 jwt?

json web token, 用户认证成功以后，server 端就返回一个加密的 token 給客户端，
客户端后续每次请求都会带上 token，以示当前的用户身份

# 如何新建一个 koa2 的项目

使用 koa2 -e xxx(项目名称)

# 跳过 token 的验证

# jwt 和 session

为了解决：登录，存储登录用户的信息
jwt 用户信息加密存储在客户端，不依赖 cookie 可以跨域，适用于服务节点多，跨域比较多的系统
session 用户信息存储在服务端，依赖 cookie 默认不可以跨域，更适合于统一的 web 服务，server 要严格管理用户信息

一般情况下两者都可以满足，大型系统中，两者可以共用

# redis 和 mysql 的对比

redis 是内存数据库比 mysql 硬盘数据库访问要快速很多
什么需要缓存呢？缓存的东西多了的话，怼内存压力大，管理压力也大
比如微博广场页面，人人看到的东西都是一样的，就可以放到内存中。公共数据用缓存，可以提升性能
用户登录信息也适合放到内存中因为要求访问要快

# redis 启动

开一个终端 redis-server 再开一个终端， redis-cli

设置变量 set name 'ddd'
get name
keys \*就是查看所有的变量
