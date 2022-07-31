// JS：src\managers\data_service.js
import { promisify } from "../utils.js"

// const LOCAL_DATA_NAME = "historyGameData"
export const LOCAL_DATA_NAME = "historyGameData"
  , HISTORY_FILEPATH = "historyFilePath" // 本地存储文件名
  , HISTORY_ERROR = "historyError" // 错误集合名称

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
  clearLocalData() {
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

/** 基于文件管理器实现的本地数据服务类 */
class DataServiceViaFileSystemManager {
  /** 本地用户文件路径 */
  get #filePath() {
    return `${wx.env.USER_DATA_PATH}/${HISTORY_FILEPATH}`
  }
  #fsMgr = wx.getFileSystemManager()

  /** 向本地写入数据 */
  async writeLocalData(userScore, systemScore) {
    const key = new Date().toLocaleString()
    const localScoreData = await this.readLocalData()
    localScoreData[key] = {
      userScore,
      systemScore
    }
    const filePath = this.#filePath
    const res = await promisify(this.#fsMgr.writeFile)({
      filePath
      , data: JSON.stringify(localScoreData)
      , encoding: "utf8"
    }).catch(console.log)

    return !!res
  }

  /** 从本地读取数据 */
  async readLocalData() {
    let res = ""
    const path = this.#filePath
    // 可能出现的异常："access:fail no such file or directory..."
    const accessRes = await promisify(this.#fsMgr.access)({ path }).catch(console.log)
    if (accessRes) {
      const localScoreData = this.#fsMgr.readFileSync(path, "utf8")
      res = JSON.parse(localScoreData)
    }

    return res || {}
  }

  /** 清扫本地游戏数据 */
  clearLocalData() {
    const filePath = this.#filePath
    this.#fsMgr.removeSavedFile({
      filePath
    })
  }
}

/** 基于文件管理器实现的本地数据服务类2 */
class DataServiceViaFileSystemManager2 {
  /** 本地用户文件路径 */
  get #filePath() {
    return `${wx.env.USER_DATA_PATH}/${HISTORY_FILEPATH}`
  }
  #fsMgr = wx.getFileSystemManager()

  /** 向本地写入数据 */
  async writeLocalData(userScore, systemScore) {
    const key = new Date().toLocaleString()
    const localScoreData = await this.readLocalData()
    localScoreData[key] = {
      userScore,
      systemScore
    }

    try {
      const filePath = this.#filePath
      this.#fsMgr.writeFileSync(
        filePath,
        JSON.stringify(localScoreData),
        "utf8"
      )
      return true
    } catch (err) {
      console.log('writeLocalData.err', err)
    }

    return false
  }

  /** 从本地读取数据 */
  async readLocalData() {
    let res = ''

    try {
      const filePath = this.#filePath
      // 可能出现的错误：accessSync:fail no such file or directory...
      this.#fsMgr.accessSync(filePath)
      let localScoreData = this.#fsMgr.readFileSync(filePath, "utf8")
      res = JSON.parse(localScoreData)
    } catch (err) {
      console.log("readLocalData.err", err);
    }

    return res || {}
  }

  /** 清扫本地游戏数据 */
  clearLocalData() {
    const filePath = this.#filePath
    this.#fsMgr.removeSavedFile({
      filePath
    })
  }
}

/** 基于文件管理器实现的本地数据服务类3 */
class DataServiceViaFileSystemManager3 {
  // /** 本地用户文件路径 */
  // get #filePath() {
  //   return `${wx.env.USER_DATA_PATH}/${HISTORY_FILEPATH}`
  // }
  #fsMgr = wx.getFileSystemManager()

  async writeLocalData(userScore, systemScore) {
    // const key = new Date().toLocaleString()
    // const localScoreData = await this.readLocalData()
    // localScoreData[key] = {
    //   userScore,
    //   systemScore
    // }
    // const filePath = this.#filePath
    // const res = await promisify(this.#fsMgr.writeFile)({
    //   filePath
    //   , data: JSON.stringify(localScoreData)
    //   , encoding: "utf8"
    // }).catch(console.log)

    // return !!res
    return await this.write({
      userScore,
      systemScore
    })
  }

  /** 从本地读取数据 */
  async readLocalData() {
    // let res = ""
    // const path = this.#filePath
    // // 可能出现的异常："access:fail no such file or directory..."
    // const accessRes = await promisify(this.#fsMgr.access)({ path }).catch(console.log)
    // if (accessRes) {
    //   const localScoreData = this.#fsMgr.readFileSync(path, "utf8")
    //   res = JSON.parse(localScoreData)
    // }

    // return res || {}
    return await this.read()
  }

  clearLocalData() {
    // const filePath = this.#filePath
    // this.#fsMgr.removeSavedFile({
    //   filePath
    // })
    this.clear()
  }

  /** 记录错误日志，外观方法 */
  async writeError(err) {
    return await this.write({ err }, HISTORY_ERROR)
  }

  /** 清除错误日志，外观方法 */
  async clearError(err) {
    return await this.clear(HISTORY_ERROR)
  }

  /** 向本地写入数据 */
  async write(data, collection = LOCAL_DATA_NAME) {
    const key = new Date().toLocaleString()
    const localScoreData = await this.read(collection)
    localScoreData[key] = data
    const filePath = this.#getFilePath(collection)
    const res = await promisify(this.#fsMgr.writeFile)({
      filePath
      , data: JSON.stringify(localScoreData)
      , encoding: "utf8"
    }).catch(console.log)

    return !!res
  }

  /** 从本地读取数据 */
  async read(collection = LOCAL_DATA_NAME) {
    let res = ""
    const path = this.#getFilePath(collection)
    // 可能出现的异常："access:fail no such file or directory..."
    const accessRes = await promisify(this.#fsMgr.access)({ path }).catch(console.log)
    if (accessRes) {
      const localScoreData = this.#fsMgr.readFileSync(path, "utf8")
      res = JSON.parse(localScoreData)
    }

    return res || {}
  }

  /** 清扫本地游戏数据 */
  async clear(collection = LOCAL_DATA_NAME) {
    const filePath = this.#getFilePath(collection)
    const res = await promisify(this.#fsMgr.writeFile)({
      filePath
      , data: JSON.stringify({})
      , encoding: "utf8"
    }).catch(console.log)

    return !!res
  }

  /** 获取本地用户文件路径 */
  #getFilePath(collection = LOCAL_DATA_NAME) {
    return collection === LOCAL_DATA_NAME
      ? `${wx.env.USER_DATA_PATH}/${HISTORY_FILEPATH}`
      : `${wx.env.USER_DATA_PATH}/${collection}`
  }
}

// export default new DataService()
// export default new AsyncDataService()
// export default new AsyncToSyncDataService()
// export default new SyncDataService()
// export default new DataServiceViaFileSystemManager()
// export default new DataServiceViaFileSystemManager2()
export default new DataServiceViaFileSystemManager3()