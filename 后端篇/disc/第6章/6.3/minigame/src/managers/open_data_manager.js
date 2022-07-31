// JS：src\managers\open_data_manager.js
import cloudFuncMgr from "../managers/cloud_function_manager.js"
const UPDATE = "update" // 更新得分
  , RENDER = "render" // 请求渲染共享画布

/** 开放数据域管理者 */
class OpenDataManager {
  /** 开放数据域的上下文环境对象 */
  #openDataContext = wx.getOpenDataContext()

  /** 间接调用setUserCloudStorage，存储用户得分 */
  async updateUserScore(userScore) {
    const rankValue = {
      "wxgame": {
        "score": userScore
        , "update_time": Date.now() / 1000
      }
    }
    return this.request(UPDATE, {
      // openid: "o0_L54sDkpKo2TmuxFIwMqM7vQcU"
      openid: (await cloudFuncMgr.getOpenid())?.data ?? "o0_L54sDkpKo2TmuxFIwMqM7vQcU"
      , KVDataList: [{ key: "rank", value: JSON.stringify(rankValue) }]
    })
  }

  /** 发消息到开放数据域，请求渲染共享画布 */
  requestRenderShareCanvas() {
    return this.request(RENDER, { w: GameGlobal.CANVAS_WIDTH })
  }

  /** 将开放数据域的共享画布内容渲染到主屏 */
  render(context) {
    context.drawImage(this.#openDataContext.canvas, 0, 0)
  }

  /** 向开放数据域发送指令请求 */
  request(command, data) {
    return new Promise((resolve, reject) => {
      this.#openDataContext.postMessage({
        command,
        data
      })
      // 没有办法获知开放数据域多少时间完成指令了，默认100ms
      setTimeout(resolve, 100)
    })
  }
}

export default new OpenDataManager()