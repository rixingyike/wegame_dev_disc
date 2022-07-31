// JS：controllers\wechat\customer.js
"use strict"
// import model from "../../models/index.js"
const crypto = require("crypto")
const WechatAPI = require("co-wechat-api")

const APP_ID = "wx2e4e259c69153e40"
const APP_SECRET = "479f3117c68e96e2f4a64a976c3bf88c"
// 消息加密密钥与令牌
const ENCODING_AES_KEY = "yBHOfYMQr7P6u38hAayaAZ5BLLHEndaiRtRYLLfhWio"
const TOKEN = "minigame"

const api = new WechatAPI(APP_ID, APP_SECRET)

export default {
  /** 实现客服消息签名验证 */
  "GET /chat": async (ctx, next) => {
    // 获取GET参数 signature、timestamp、nonce、echostr
    const {
      signature
      , timestamp
      , nonce
      , echostr
    } = ctx.query
      // 将token、timestamp、nonce三个参数进行字典序排序
      , array = [TOKEN, timestamp, nonce].sort()
      // 将三个参数字符串拼接成一个字符串进行sha1加密
      , tempStr = array.join("")
      , hashCode = crypto.createHash("sha1") //创建加密类型
      , resultCode = hashCode.update(tempStr, "utf8").digest("hex")

    // 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
    if (resultCode === signature) {
      console.log("验证成功")
      ctx.body = echostr
    } else {
      console.log("验证失败")
      ctx.body = {
        errMsg: "验证失败"
      }
    }
  },

  /** 接收并处理客服消息 */
  "POST /chat": async (ctx, next) => {
    const message = ctx.request.body
      , { MsgType: msgType,
        FromUserName: userOpenid } = message

    switch (msgType) {
      case "text": {
        // text消息内容示例：
        // { ToUserName: "gh_e6ce61e45151",
        //   FromUserName: "o0_L54sDkpKo2TmuxFIwMqM7vQcU",
        //   CreateTime: 1619604164,
        //   MsgType: "text",
        //   Content: "123",
        //   MsgId: 23187154282158600,
        //   Encrypt:"XGbMMO..." }
        api.sendText(userOpenid, `已收到消息：${message.Content}`)
        break
      }
      case "image": {
        // image消息示例：
        //  { ToUserName: "gh_e6ce61e45151",
        //   FromUserName: "o0_L54sDkpKo2TmuxFIwMqM7vQcU",
        //   CreateTime: 1619604727,
        //   MsgType: "image",
        //   PicUrl: "http://m..",
        //   MsgId: 23187166576365884,
        //   MediaId: "M-fHYwC9..",
        //   Encrypt:"r+pT.." }
        let mediaId = message.MediaId // 这是用户发来的图片
          , res = await api.uploadMedia("./static/images/ok.png", "image")
        if (res) mediaId = res.media_id // 这是我们上传的
        api.sendText(userOpenid, `图片已收到`)
        api.sendImage(userOpenid, mediaId)
        break
      }
      default:
        break
    }
    ctx.body = "success"
  }
}