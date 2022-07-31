// Go：routers\init.go
package routers

import (
	"encoding/json"
	"github.com/kataras/iris/v12"
	"local/controllers"
	"local/controllers/api"
	"local/models"
	"strings"
	"xorm.io/xorm"
	// "fmt"
)

func Init(app *iris.Application, db *xorm.Engine) {
	// 设置Web路由
	webRouter := app.Party("/", func(ctx iris.Context) {
		// 这里会先执行，可以设置访问限制
		if ctx.GetCookie("user") == "" {
			if ctx.Path() != "/accounts/login" && !strings.HasPrefix(ctx.Path(), "/wechat") {
				ctx.Redirect("/accounts/login")
			}
		} else {
			var account models.Account
			if err := json.Unmarshal([]byte(ctx.GetCookie("user")), &account); err == nil {
				// 可以通过ctx.Values().Get("user")将用户对象取出来，在其它地方使用
				ctx.Values().Set("user", account)
			}
		}
		ctx.Next()
	})
	webRouter.Use(iris.Compression)
	controllers.Init(webRouter, db)

	// 设置接口接口，这里不需要监管鉴权，所以另外设置
	apiRouter := app.Party("/api")
	apiRouter.Use(iris.Compression)
	api.Init(apiRouter, db)
}
