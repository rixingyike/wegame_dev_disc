// JS：managers\backend_api_manager.js
import cloudFuncMgr from "../managers/cloud_function_manager.js"
import { promisify } from "../utils.js"

const API_BASE = "http://localhost:3000/api"

/** 后端接口管理者 */
class BackendApiManager {
  /** 拉取最新的10条记录 */
  async retrieveTop10Histories() {
    const openid = (await cloudFuncMgr.getOpenid())?.data
    if (!openid) return {
      errMsg: "未取到openid"
    }

    const url = `${API_BASE}/histories?openid=${openid}`
      // 异步接口转同步方式调用，注意小游戏中的wx.request不支持Promise风格调用
      , res = await promisify(wx.request)({ url })
    if (res.errMsg === "request:ok"
      && res.data.errMsg === "ok") {
      return {
        errMsg: "ok",
        data: res.data.data
      }
    } else {
      return {
        errMsg: "服务器端接口异常"
      }
    }
  }

  /** 创建一条新的历史数据
   * @param {number} userScore 用户得分
   * @param {number} systemScore 系统得分
   */
  async createHistory(userScore, systemScore) {
    const openid = (await cloudFuncMgr.getOpenid())?.data
    if (!openid) return {
      errMsg: "未取到openid"
    }

    const url = `${API_BASE}/histories`
      , data = {
        openid,
        user_score: userScore,
        system_score: systemScore
      }
      , res = await promisify(wx.request)({
        url,
        method: "POST",
        data
      })
    if (res.errMsg === "request:ok"
      && res.data.errMsg === "ok") {
      return {
        errMsg: res.data.data > 0 ? "ok" : "未生成新增ID，创建失败",
        data: res.data.data
      }
    } else {
      return {
        errMsg: "服务器端接口异常"
      }
    }
  }

  /** 删除最新10条历史记录 */
  async deleteTop10Histories() {
    const openid = (await cloudFuncMgr.getOpenid())?.data
    if (!openid) return {
      errMsg: "未取到openid"
    }

    const res = await this.retrieveTop10Histories()
    if (res.errMsg === "ok") {
      const rows = res.data
      let n = 0
      for (let row of rows) {
        const historyId = row.id
          , url = `${API_BASE}/histories/${historyId}?openid=${openid}`
          , delRes = await promisify(wx.request)({
            url,
            method: "DELETE"
          })
        if (delRes.errMsg === "request:ok"
          && delRes.data.errMsg === "ok"
          && delRes.data.data > 0) n++
      }
      console.log(`共尝试删除${rows.length}条记录，成功删除了${n}条`)

      return {
        errMsg: n > 0 ? "ok" : "未删除"
        , data: n
      }
    }
  }

  /** 请求购买VIP的支付二维码 */
  async getVipPayQrcode() {
    const openid = (await cloudFuncMgr.getOpenid())?.data
    if (!openid) return {
      errMsg: "未取到openid"
    }

    const data = { openid, total_fee: 99 }
      , url = `${API_BASE}/pay_order/small_micro_pay`
      , res = await promisify(wx.request)({
      url,
      method: "POST",
      data
    })

    if (res.errMsg === "request:ok") {
      return res.data
    } else {
      return {
        errMsg: res.errMsg
      }
    }
  }

  // 查询是否为VIP会员，已经购买过
  async hasPayForVip() {
    const openid = (await cloudFuncMgr.getOpenid())?.data
    if (!openid) return {
      errMsg: "未取到openid"
    }

    const url = `${API_BASE}/pay_order/small_micro_pay/${openid}`
      , res = await promisify(wx.request)({
      url,
      method: "GET"
    })

    if (res.errMsg === "request:ok") {
      return res.data
    } else {
      return {
        errMsg: res.errMsg,
        data: false
      }
    }
  }
}

export default new BackendApiManager()