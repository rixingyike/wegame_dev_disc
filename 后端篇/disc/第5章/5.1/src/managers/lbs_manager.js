// JS：src\managers\lbs_manager.js
import QQMapJSSDK from "../libs/qqmap-wx-jssdk.min.js"
import { promisify } from "../utils.js"

/** 腾讯 LBS 服务密钥 */
const QQ_LBS_KEY = "L5YBZ-BTZHX-FPU42-Z3PUL-VHHG2-AFF4Q"

/** LBS位置信息管理者 */
class LBSManager {
  /** 城市名称 */
  get city() {
    return this.#city
  }
  #city = "未知"
  #qqmapsdk = new QQMapJSSDK({
    key: QQ_LBS_KEY
  });

  init(options) {
    if (!!this.initialized) return; this.initialized = true

    // 拉取授权信息
    wx.getSetting({
      success: (res) => {
        const authSetting = res.authSetting
        if (!authSetting["scope.userLocation"]) { // 如果没有授权，先发起授权
          wx.authorize({
            scope: "scope.userLocation",
            success: res => {
              this.#updateCity()
            },
            fail: err => {
              console.log(err)
            }
          })
        } else {
          this.#updateCity()
        }
      }
    })
  }

  #updateCity() {
    wx.getLocation({
      type: "gcj02",
      altitude: false,
      success: res => {
        this.#qqmapsdk.reverseGeocoder({
          location: {
            latitude: res.latitude,
            longitude: res.longitude
          },
          success: res => {
            this.#city = res.result.address_component.city
          },
          // success(res) {
          //   this.#city = res.result.address_component.city
          // },
          fail: err => {
            console.log(err)
          }
        })
      },
      fail: res => {
        console.log(res)
      }
    })
  }
}

/** 同步的LBS位置信息管理者 */
class SyncLBSManager {
  /** 城市名称 */
  get city() {
    return this.#city
  }
  #city = "未知"
  #qqmapsdk = new QQMapJSSDK({
    key: QQ_LBS_KEY
  });

  async init(options) {
    if (!!this.initialized) return; this.initialized = true

    const res = await wx.getSetting()
    if (!res.authSetting["scope.userLocation"]) { // 如果没有授权，先发起授权
      await wx.authorize({ scope: "scope.userLocation" }).catch(console.log)
    }
    this.#updateCity()
  }

  async #updateCity() {
    const res = await wx.getLocation({
      type: "gcj02",
      altitude: false
    }).catch(console.log)
    // const lbsRes = await promisify(this.#qqmapsdk.reverseGeocoder.bind)({
    const lbsRes = await promisify(this.#qqmapsdk.reverseGeocoder.bind(this.#qqmapsdk))({
      location: `${res.latitude},${res.longitude}`
    }).catch(console.log)
    this.#city = lbsRes.result.address_component.city
  }
}

// export default new LBSManager()
export default new SyncLBSManager()