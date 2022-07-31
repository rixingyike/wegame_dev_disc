// JS：managers\storage_service_facade.js
import dataService from "data_service.js" // 引入本地数据服务模块单例
import { HISTORY_ERROR } from "data_service.js"
import backApiMgr from "backend_api_manager.js" // 引入后端接口管理者
import cloudFuncMgr from "cloud_function_manager.js" // 引入云资源管理者
import openDataMgr from "open_data_manager.js" // 引入开放数据管理者

/** 存储服务外观管理者 */
class StorageServiceFacade {
  /** 由本地数据存储模块记录全局错误 */
  async writeError(err) {
    return await dataService.write(err)
  }

  /** 在本地数据存储读取所有错误信息 */
  async readErrors() {
    return dataService.read(HISTORY_ERROR)
  }

  /** 后端接口管理者和云资源管理者，同时在MySQL数据库和云数据库中，存储历史游戏数据 */
  async createHistory(userScore, systemScore) {
    await backApiMgr.createHistory(userScore, systemScore)
    await cloudFuncMgr.writeHistoryData(userScore, systemScore)
  }

  /** 由云资源管理者负责，将玩家自己最近的分数递增1个数字 */
  async increaseSelfLastScoreInCloud() {
    await cloudFuncMgr.increaseSelfLastScore()
  }

  /** 由开放数据域管理者，更新开放数据域中的当前玩家分数
   * 及在云数据库中，存储当前玩家的最新得分
   */
  async updateUserScore(userScore) {
    openDataMgr.updateUserScore(userScore)
    await cloudFuncMgr.uploadScore(userScore)
  }

  /** 删除MySQL数据库当前玩家最近的10条历史记录 */
  async deleteTop10Histories() {
    await backApiMgr.deleteTop10Histories()
  }
}

export default new StorageServiceFacade()