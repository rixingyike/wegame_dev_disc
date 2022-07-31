// GO：controllers\api\init.go
package api

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
	"xorm.io/xorm"
)

// 路由基地址：/api
func Init(router iris.Party, db *xorm.Engine) {
	mvc.New(router.Party("/histories")).Handle(&HistoryController{Db: db})
}
