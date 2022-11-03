/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「艺述论」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
package main

import (
	"github.com/kataras/iris/v12"
	"local/models"
	"local/routers"
	"local/middlewares"
)

func main() {
	db := models.ConnectMySQL()
	defer db.Close() // 延迟关闭数据库连接

	app := iris.New()
	middlewares.Init(app)
	routers.Init(app, db)

	app.Listen(":8080")
}
