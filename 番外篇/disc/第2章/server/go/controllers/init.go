// Go：controllers\init.go
package controllers

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
	"xorm.io/xorm"
	"local/controllers/wechat"
)

/**
如果路由基地址是：/，则有：
func(*Controller) GetUsers() - GET:/users
func(*Controller) PostUsers() - POST:/users
func(*Controller) GetUsersProfileFollowers() - GET:/users/profile/followers
func(*Controller) PostUsersProfileFollowers() - POST:/users/profile/followers
func(*Controller) GetUsersBy(id int64) - GET:/users/{id}
func(*Controller) PostUsersBy(id int64) - POST:/users/{id}
*/

// 路由基地址：/
func Init(router iris.Party, db *xorm.Engine) {
	mvc.New(router).Handle(&IndexController{Db: db})
	mvc.New(router.Party("/wechat/customer")).Handle(&wechat.WechatCustomerController{Db: db})
	mvc.New(router.Party("/accounts")).Handle(&AccountController{Db: db})
	mvc.New(router.Party("/histories")).Handle(&HistoryController{Db: db})
}
