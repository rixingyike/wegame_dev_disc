// JS：src\managers\data_service.js
import { promisify } from "../utils.js"

const LOCAL_DATA_NAME = "historyGameData"

/** 本地数据服务类 */
class DataService {
  /** 向本地缓存写入数据 */
  writeLocalData(userScore, systemScore) {
    const key = new Date().toLocaleString()
    const localScoreData = this.readLocalData()
    localScoreData[key] = {
      userScore,
      systemScore
    }

    try {
      wx.setStorageSync(LOCAL_DATA_NAME, localScoreData)
      return true
    } catch (err) {
      console.log(err)
    }
    return false
  }

  /** 从本地缓存读取数据 */
  readLocalData() {
    return wx.getStorageSync(LOCAL_DATA_NAME) || {}
  }
}

/** 以异步接口实现的本地数据服务类 */
class AsyncDataService {
  /** 向本地写入数据 */
  writeLocalData(userScore, systemScore, callback) {
    this.readLocalData(localScoreData => {
      const key = new Date().toLocaleString()
      localScoreData[key] = {
        userScore,
        systemScore
      }
      wx.setStorage({
        key: LOCAL_DATA_NAME
        , data: localScoreData
        , success: () => callback(true)
        , fail: () => callback(false)
      })
    })
  }

  /** 从本地读取数据 */
  readLocalData(callback) {
    wx.getStorage({
      key: LOCAL_DATA_NAME
      , success: res => callback(res.data || {})
      , fail: () => callback({})
    })
  }
}

/** 以异步转同步实现的本地数据服务类 */
class AsyncToSyncDataService {
  /** 向本地写入数据 */
  async writeLocalData(userScore, systemScore) {
    const key = new Date().toLocaleString()
    const localScoreData = await this.readLocalData()
    localScoreData[key] = {
      userScore,
      systemScore
    }
    const res = await promisify(wx.setStorage)({ key: LOCAL_DATA_NAME, data: localScoreData }).catch(err => console.log(err))
    return !!res
  }

  /** 从本地读取数据 */
  async readLocalData() {
    const res = await promisify(wx.getStorage)({ key: LOCAL_DATA_NAME }).catch(console.log)
    return res?.data ?? {}
  }
}

/** 直接以官方接口实现的同步本地数据服务类 */
class SyncDataService {
  /** 向本地写入数据 */
  async writeLocalData(userScore, systemScore) {
    const key = new Date().toLocaleString()
    const localScoreData = await this.readLocalData()
    localScoreData[key] = {
      userScore,
      systemScore
    }
    const res = await wx.setStorage({ key: LOCAL_DATA_NAME, data: localScoreData }).catch(err => console.log(err))
    return !!res
  }

  /** 从本地读取数据 */
  async readLocalData() {
    const res = await wx.getStorage({ key: LOCAL_DATA_NAME }).catch(console.log)
    return res?.data ?? {}
  }

  /** 清扫本地数据 */
  clearLocalData(){
    wx.getStorageInfo({
      success: res => {
        const keys = res.keys
        for (let key of keys) {
          console.log(key);
          wx.removeStorage({
            key
          })
        }
      },
      fail: err => {
        console.log(err)
      }
    })
  }
}

// export default new DataService()
// export default new AsyncDataService()
// export default new AsyncToSyncDataService()
export default new SyncDataService()