/**
 * 《微信小游戏开发：后端篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
package controllers

import (
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
	"xorm.io/xorm"
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
}
