package controllers

import (
	"github.com/kataras/iris/v12"
	"xorm.io/xorm"
)

type IndexController struct {
	Ctx iris.Context // HTTP请求上下文对象
	Db  *xorm.Engine
}

func (c *IndexController) Get() {
	c.Ctx.View("index.html", map[string]interface{}{
		"title": "主页",
		"path":  "/"})
}
