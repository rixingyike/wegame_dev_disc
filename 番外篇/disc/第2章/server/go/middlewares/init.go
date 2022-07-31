package middlewares

import (
	"github.com/iris-contrib/middleware/cors"
	"github.com/kataras/iris/v12"
	"time"
)

func Init(app *iris.Application) {
	tmpl := iris.HTML("./views", ".html") // 使用默认的模板引擎
	tmpl.Layout("layout.html")            // 指定默认布局文件
	tmpl.Reload(true)
	// 注册过滤器方法
	tmpl.AddFunc("dateFormat", func(d time.Time, s string) string {
		return d.Format(s)
	})
	app.RegisterView(tmpl)

	// 设置静态资源目录
	app.HandleDir("/static", iris.Dir("./static"))

	// 处理iris跨域
	app.Use(cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
		AllowedMethods:   []string{"GET", "PUT", "POST", "PATCH", "DELETE", "HEAD", "OPTIONS"},
		AllowedHeaders:   []string{"Content-Type", "Authorization", "Accept"},
		ExposedHeaders:   []string{"MINI-Authorization"},
	}))
}
