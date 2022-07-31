// JS：server\node\controllers\api\pay_order.js
"use strict"
import model from "../../models/index.js"
import wepay from "../../libs/small_micro_pay.js"
import short from "short-uuid"
import axios from "axios"

export default {
  // 小微商户支付测试接口
  "POST /small_micro_pay": async (ctx, next) => {
    let { openid, total_fee } = ctx.request.body
    total_fee = parseInt(total_fee) 
    let outTradeNo = `${new Date().getFullYear()}${short().new()}`
      , order_body = "小微商户支付测试"
      , trade = {
        out_trade_no: outTradeNo, // 开发者支付定单ID
        total_fee, // 以分为单位，货币的最小金额
        body: order_body, // 最长127字节
        notify_url: `http://frp.yishulun.com/api/pay_order/small_micro_pay/pay_success_notify`, // 支付成功的通知回调地址
        type: "wechat",
        goods_detail: "商品详情",
        attach: "",
        nonce_str: wepay.getRandomNumber()
      }
    trade.sign = wepay.getSign(trade)
    let payOrderRes = await axios.post("https://admin.xunhuweb.com/pay/payment", trade)
    // 写库
    const { out_trade_no, order_id, nonce_str, code_url: qrcode_url } = payOrderRes.data
      , activity = model.pay_order({ openid, total_fee, order_body, out_trade_no, order_id, nonce_str, qrcode_url })
    await activity.save() // 即使成功返回，结果也是undefined
    if (activity.identity() > 0) {
      const qrCodeimageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=20&data=${encodeURI(qrcode_url)}`
      ctx.status = 200
      ctx.body = { errMsg: "ok", data: qrCodeimageUrl }
    } else {
      ctx.status = 200
      ctx.body = { errMsg: "生成支付订单未成功" }
    }
    // const { code_url: qrcode_url } = payOrderRes.data
    // const qrCodeimageUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=20&data=${encodeURI(qrcode_url)}`
    // ctx.status = 200
    // ctx.body = { errMsg: "ok", data: qrCodeimageUrl }
  },

  // 小微商户支付的成功回调地址
  "POST /small_micro_pay/pay_success_notify": async (ctx, next) => {
    let r = "fail"
    const { out_trade_no, return_code } = ctx.request.body
    if (return_code === "SUCCESS") {
      // 用户支付成功，服务商通过更新订单状态
      const db = await model.connect()
        , res = await model.execute(db, "update pay_order set state = 1 where out_trade_no=@out_trade_no limit 1", { out_trade_no })
      if (res.affectedRows > 0) {
        console.log(`小微商户订单${out_trade_no}已支付成功`)
        r = "success"
      }
    }

    ctx.status = 200
    ctx.body = r
  },

  // 查询是否已有成功支付的订单
  "GET /small_micro_pay/:openid": async (ctx, next) => {
    const { openid } = ctx.params
    const db = await model.connect()
      , res = await model.execute(db, "select * from pay_order where state=1 && openid=@openid limit 1", { openid })
    if (res.length > 0) {
      ctx.status = 200
      ctx.body = { errMsg: "ok", data: true }
    } else {
      ctx.status = 200
      ctx.body = { errMsg: "ok", data: false }
    }
  }
}