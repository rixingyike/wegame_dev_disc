// JS：server\node\libs\small_micro_pay.js
import md5 from "md5"
import request from "request"

// 小微商户的商户ID、API密钥
// 该消息在小微商户后台中查看
let WEPAY_MCHID = ""
let WEPAY_SECRET = ""

/** 检查必须的系统变量 */
function checkSysVars() {
  if (!WEPAY_MCHID) {
    // 这两个是环境变量
    WEPAY_MCHID = process.env.WEPAY_MCHID
    WEPAY_SECRET = process.env.WEPAY_SECRET
  }
}

/** 生成随机数 */
function getRandomNumber(minNum = 1000000000, maxNum = 99999999999999) {
  return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10)
}

/** 生成sign签名 */
function getSign(obj) {
  checkSysVars()
  if (!obj.mchid) obj.mchid = WEPAY_MCHID

  const params = []
    , keys = Object.keys(obj).sort()

  keys.forEach(e => obj[e] && params.push(`${e}=${obj[e]}`))
  params.push(`key=${WEPAY_SECRET}`)

  return md5(params.join("&")).toUpperCase()
}

/** 生成支付参数 */
function getOrderParams(trade) {
  let nonce_str = getRandomNumber() // 随机数
    , goods_detail = ""
    , attach = ""
    , paramsObject = {
      WEPAY_MCHID,
      total_fee: trade.total_fee,
      out_trade_no: trade.out_trade_no,
      body: trade.body,
      goods_detail,
      attach,
      notify_url: trade.notify_url,
      nonce_str
    }
  paramsObject.sign = getSign(paramsObject)
  return paramsObject
}

/** 发起退款 */
async function refund(order_id) {
  const order = {
    WEPAY_MCHID,
    order_id,
    nonce_str: getRandomNumber(),
    refund_desc: "no",
    notify_url: "http://frp.yishulun.com/api/pay/notify",
  }
  order.sign = getSign(order)
  // 以json方式提交
  return new Promise((resolve, reject) => {
    request({
      url: "https://admin.xunhuweb.com/pay/refund",
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify(order),
    }, function (err, res, body) {
      if (err) reject(err)
      else resolve(body)
    })
  })
}

export default {
  getOrderParams,
  refund,
  getSign,
  getRandomNumber
}