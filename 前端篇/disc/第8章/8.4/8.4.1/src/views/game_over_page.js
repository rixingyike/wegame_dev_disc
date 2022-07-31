// JS：src\views\game_over_page.js
import Page from "page.js"
import audioManager from "../managers/audio_manager.js" // 音频管理者单例
import { drawText } from "../utils.js" // 引入工具方法

/** 游戏结束页面 */
class GameOverPage extends Page {
  constructor(game) {
    super(game)
  }

  /** 处理触摸结束事件 */
  onTouchEnd(res) {
    this.game.start()
  }

  /** 页面结束 */
  end() {
    // 游戏结束的模态弹窗提示
    wx.showModal({
      title: "游戏结束",
      content: "单击【确定】重新开始",
      success: (res) => {
        if (res.confirm) {
          this.game.start()
        }
      }
    })
    audioManager.stopBackgroundSound()
  }

  /** 渲染 */
  render(context) {
    context.clearRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT) // 清屏
    context.fillStyle = "whitesmoke" // 绘制背景色
    context.fillRect(0, 0, GameGlobal.CANVAS_WIDTH, GameGlobal.CANVAS_HEIGHT)
    const txt = "游戏结束"
    context.font = "900 26px STHeiti"
    context.fillStyle = "black"
    context.textBaseline = "middle"
    drawText(context, GameGlobal.CANVAS_WIDTH / 2 - context.measureText(txt).width / 2, GameGlobal.CANVAS_HEIGHT / 2, txt)

    // 提示用户单击屏幕重启游戏
    const restartTip = "单击屏幕重新开始"
    context.font = "12px FangSong"
    context.fillStyle = "gray"
    drawText(context, GameGlobal.CANVAS_WIDTH / 2 - context.measureText(restartTip).width / 2, GameGlobal.CANVAS_HEIGHT / 2 + 25, restartTip)
  }
}

export default GameOverPage