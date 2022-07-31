// Go：controllers\histories.go
package controllers

import (
	"github.com/kataras/iris/v12"
	"xorm.io/xorm"
	"local/models"
	"fmt"
)

// 基地址：/histories
type HistoryController struct {
	Ctx iris.Context // HTTP请求上下文对象
	Db  *xorm.Engine
}

// GET：/histories
func (c *HistoryController) Get() {
	account := c.Ctx.Values().Get("user").(models.Account)
	fmt.Println(account)
	histories := make([]models.History, 0)
	c.Db.Desc("id").Limit(10).Find(&histories)
	c.Ctx.View("histories/index", map[string]interface{}{
		"title":     "历史记录",
		"path":      "/histories",
		"histories": histories,
		"role":      account.Role})
}
