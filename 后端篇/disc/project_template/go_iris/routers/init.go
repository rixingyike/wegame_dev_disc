package routers

import (
	"github.com/kataras/iris/v12"
	"local/controllers"
	"local/controllers/api"
	"xorm.io/xorm"
	// "strings"
	// "encoding/json"
	// "local/models"
	// "fmt"
)

func Init(app *iris.Application, db *xorm.Engine) {
	// 设置Web路由
	webRouter := app.Party("/", func(ctx iris.Context) {
		// 
		ctx.Next()
	})
	webRouter.Use(iris.Compression)
	controllers.Init(webRouter, db)

	// 设置接口接口，这里不需要监管鉴权，所以另外设置
	apiRouter := app.Party("/api")
	apiRouter.Use(iris.Compression)
	api.Init(apiRouter, db)
}
