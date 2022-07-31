// Go：controllers\accounts.go
package controllers

import (
	"encoding/json"
	"github.com/kataras/iris/v12"
	"github.com/kataras/iris/v12/mvc"
	"local/models"
	"xorm.io/xorm"
)

// 路由基地址：/accounts
type AccountController struct {
	Ctx iris.Context // HTTP请求上下文对象
	Db  *xorm.Engine
}

func (c *AccountController) BeforeActivation(b mvc.BeforeActivation) {
	// 自定义url路径
	b.Handle("GET", "/logon", "CustomGetLogon")
}

// GET：/accounts/logon
func (c *AccountController) CustomGetLogon() string {
	return c.Ctx.GetCookie("user")
}

// GET：/accounts/login
func (c *AccountController) GetLogin() {
	c.Ctx.ViewLayout(iris.NoLayout) // 不使用默认模板
	c.Ctx.View("accounts/login", map[string]interface{}{"title": "登录"})
}

// POST：/accounts/login
func (c *AccountController) PostLogin() {
	var account models.Account
	account.Name = c.Ctx.FormValue("name")
	account.Passwd = c.Ctx.FormValue("passwd")

	if account.Name == "" || account.Passwd == "" {
		c.Ctx.ViewLayout(iris.NoLayout) // 不使用默认布局
		c.Ctx.View("accounts/login", map[string]interface{}{"title": "登录", "errMsg": "参数错误"})
	}
	if has, _ := c.Db.Where("name = ? and passwd = ?", account.Name, account.Passwd).Get(&account); has {
		account.Passwd = ""
		userJson, _ := json.Marshal(account)
		c.Ctx.SetCookieKV("user", string(userJson))
		c.Ctx.Redirect("/")
	} else {
		c.Ctx.ViewLayout(iris.NoLayout) // 不使用默认布局
		c.Ctx.View("accounts/login", map[string]interface{}{"title": "登录", "errMsg": "登录失败，请重试"})
	}
}

// GET：/accounts/logout
func (c *AccountController) GetLogout() {
	c.Ctx.RemoveCookie("user")
	c.Ctx.Redirect("/accounts/login")
}
