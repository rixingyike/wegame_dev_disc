// JS：src\managers\cloud_function_manager.js
/** 云函数管理者 */
class CloudFunctionManager {
  constructor() {
    wx.cloud.init({
      env: "dev-df2a97"
    })
  }

  /** 
   * 上传用户得分
   * @param {number} userScore 
   */
  async uploadScore(userScore) {
    const res = await wx.cloud.callFunction({
      name: "uploadScore",
      data: {
        score: userScore
      }
    }).catch(console.log)

    return {
      errMsg: res.errMsg === "cloud.callFunction:ok" ? "uploadScore:ok" : res.errMsg
    }
  }
}

export default new CloudFunctionManager()