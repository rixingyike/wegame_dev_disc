// GO：controllers\api\histories.go
package api

import (
	"fmt"
	"local/models"
	"github.com/kataras/iris/v12"
	"xorm.io/xorm"
)

// 基地址：/api/histories
type HistoryController struct {
	Ctx iris.Context // HTTP请求上下文对象，由iris自动绑定
	Db  *xorm.Engine
}

// GET：/api/histories
// curl -X GET http://localhost:3000/api/histories?openid=o0_L54sDkpKo2TmuxFIwMqM7vQcU
func (c *HistoryController) Get() models.Result {
	openid := c.Ctx.URLParam("openid")
	list := make([]models.History, 0)
	c.Db.Where("openid = ?", openid).Limit(10, 0).Find(&list)
	return models.Result{Data: list, ErrMsg: "ok"}
}

// POST：/api/histories
// curl -X POST -H "Content-Type: application/json" -d '{"openid":"o0_L54sDkpKo2TmuxFIwMqM7vQcU","system_score":0,"user_score":1}' http://localhost:3000/api/histories
func (c *HistoryController) Post() models.Result {
	var res = models.Result{}
	activity := new(models.History)

	if err := c.Ctx.ReadJSON(&activity); err != nil {
		res.ErrMsg = "参数错误"
		return res
	}

	if affected, err := c.Db.InsertOne(activity); err != nil {
		fmt.Printf("%v\n", err)
		res.ErrMsg = err.Error()
		return res
	} else if affected > 0 {
		fmt.Printf("affected:%v\n", affected)
		res.ErrMsg = "ok"
		res.Data = activity.Id
	}

	return res
}

// DELETE：/api/histories/:id
// curl -X DELETE http://localhost:3000/api/histories/1?openid=o0_L54sDkpKo2TmuxFIwMqM7vQcU
func (c *HistoryController) DeleteBy(id int64) models.Result {
	openid := c.Ctx.URLParam("openid")
	res := models.Result{}
	if affected, _ := c.Db.ID(id).Where("openid = ?", openid).Delete(new(models.History)); affected > 0 {
		res.ErrMsg = "ok"
		res.Data = affected
	}

	return res
}
