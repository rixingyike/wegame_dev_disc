// JS：src\views\game_over_page.js
import Page from "page.js"
import audioManager from "../managers/audio_manager.js" // 音频管理者单例
import { drawText } from "../utils.js" // 引入工具方法
import Component from "component.js"
import ClosureFunctionCommand from "../libs/closure_function_command.js"
import SyncClosureFunctionCommand from "../libs/sync_closure_function_command.js"
import SerialCommandGroup from "../libs/serial_command_group.js"
import Task from "../libs/task.js"
import openDataMgr from "../managers/open_data_manager.js"

/** 游戏结束文本 */
export class GameOverText extends Component {
  constructor() {
    super()
    this.render = context => {
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
}

/** 游戏结束页面 */
class GameOverPage extends Page {
  constructor(game) {
    super(game)
    this.addElement(new GameOverText())
  }

  /** 处理触摸结束事件 */
  onTouchEnd(res) {
    this.game.turnToPage("index")
  }

  /** 进入页面时要执行的代码 */
  start() {
    const showModelCommand = new ClosureFunctionCommand(() => {
      // 游戏结束的模态弹窗提示
      wx.showModal({
        title: "游戏结束",
        content: "单击【确定】重新开始",
        success: (res) => {
          if (res.confirm) {
            showModelCommand.markAsComplete()
          }
        }
      })
    })
    const serialCommandGroup = new SerialCommandGroup([
      new SyncClosureFunctionCommand(() => super.start()),
      new SyncClosureFunctionCommand(() => audioManager.stopBackgroundSound()),
      showModelCommand, // 弹窗提示
      new Task(Task.PLAY_HIT_AUDIO, this.game), // 播放单击音效
      new SyncClosureFunctionCommand(() => this.game.turnToPage("index"))
    ])
    // serialCommandGroup.on("complete", () => console.log("串发复合命令执行完成"))
    serialCommandGroup.once("complete", () => serialCommandGroup.reset())
    serialCommandGroup.execute()

    // 请求渲染共享画布
    setTimeout(() => openDataMgr.requestRenderShareCanvas(), 2000)
  }

  render(context) {
    super.render(context)
    // 转绘开放数据域的离屏画布到主屏
    openDataMgr.render(context)
  }
}

export default GameOverPage