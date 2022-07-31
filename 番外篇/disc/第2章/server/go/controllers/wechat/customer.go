// Go：controllers\wechat\customer.go
package wechat

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"github.com/rixingyike/wechat"
	"github.com/kataras/iris/v12"
	"sort"
	"xorm.io/xorm"
)

const APP_ID = "wx2e4e259c69153e40"
const APP_SECRET = "479f3117c68e96e2f4a64a976c3bf88c"
// 消息加密密钥与令牌
const ENCODING_AES_KEY = "yBHOfYMQr7P6u38hAayaAZ5BLLHEndaiRtRYLLfhWio"
const TOKEN = "minigame"

var wechatSrv = wechat.New(&wechat.WxConfig{
	Token:          TOKEN,
	AppId:          APP_ID,
	Secret:         APP_SECRET,
	AppType:        0,
	EncodingAESKey: ENCODING_AES_KEY, // 不带aesKey为明文模式
	DateFormat:     "JSON",
})

// 基地址：/wechat/customer
type WechatCustomerController struct {
	Ctx iris.Context // HTTP请求上下文对象
	Db  *xorm.Engine
}

// GET：/wechat/customer/chat
func (c *WechatCustomerController) GetChat() {
	var signature = c.Ctx.URLParam("signature")
	var timestamp = c.Ctx.URLParam("timestamp")
	var nonce = c.Ctx.URLParam("nonce")
	var echostr = c.Ctx.URLParam("echostr")
	// 将token、timestamp、nonce三个参数进行字典序排序
	var tempArray = []string{TOKEN, timestamp, nonce}
	sort.Strings(tempArray)
	// 将三个参数字符串拼接成一个字符串进行sha1加密
	var sha1String string = ""
	for _, v := range tempArray {
		sha1String += v
	}
	h := sha1.New()
	h.Write([]byte(sha1String))
	sha1String = hex.EncodeToString(h.Sum([]byte("")))
	// 获得加密后的字符串可与signature对比
	if sha1String == signature {
		c.Ctx.Write([]byte(echostr))
	} else {
		fmt.Println("验证失败")
		c.Ctx.Write([]byte("验证失败"))
	}
}

// POST：/wechat/customer/chat
func (c *WechatCustomerController) PostChat() {
	var wxCtx = wechatSrv.VerifyURL(c.Ctx.ResponseWriter(), c.Ctx.Request())
	var message = wxCtx.Msg
	var userOpenid = message.FromUserName
	var msgType = message.MsgType

	switch msgType {
	case "text":
		// text消息内容示例：
		// { ToUserName: "gh_e6ce61e45151",
		//   FromUserName: "o0_L54sDkpKo2TmuxFIwMqM7vQcU",
		//   CreateTime: 1619604164,
		//   MsgType: "text",
		//   Content: "123",
		//   MsgId: 23187154282158600,
		//   Encrypt:"XGbMMO..." }
		wxCtx.SendText(userOpenid, fmt.Sprintf("已收到消息：%s", message.Content))
	case "image":
		// image消息示例：
		//  { ToUserName: "gh_e6ce61e45151",
		//   FromUserName: "o0_L54sDkpKo2TmuxFIwMqM7vQcU",
		//   CreateTime: 1619604727,
		//   MsgType: "image",
		//   PicUrl: "http://m..",
		//   MsgId: 23187166576365884,
		//   MediaId: "M-fHYwC9..",
		//   Encrypt:"r+pT.." }
		var mediaId = message.MediaId // 这是用户发来的图片
		if media, err := wxCtx.MediaUpload("image", "./static/images/ok.png"); err == nil {
			mediaId = media.MediaID
		}
		wxCtx.SendText(userOpenid, `图片已收到`)
		wxCtx.SendImage(userOpenid, mediaId)
	default:
		break
	}
	c.Ctx.Write([]byte("success"))
}
