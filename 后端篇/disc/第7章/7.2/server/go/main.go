// Go：disc\第7章\7.2\server\go\main.go
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
