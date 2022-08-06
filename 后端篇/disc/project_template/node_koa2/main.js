/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：main.js
"use strict"
import "./utils/format.js"
import Koa from "koa"
import setMiddlewares from "./middlewares.js"
import setRouters from "./routers.js"

// 创建web实例
const app = new Koa()

// 设置中间件
setMiddlewares(app)

// 设置并启用路由
setRouters(app)

// 使用端口3000
const port = 3000
app.listen(port)
console.log(`web服务已在${port}端口启动`)