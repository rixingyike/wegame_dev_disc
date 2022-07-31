// JS：src\views\game_top_layer.js
import Box from "box.js"
import SimpleTextButton from "simple_text_button.js"
import ToggleButton from "toggle_button.js"

/** 游戏顶级UI层 */
class GameTopLayer extends Box {

  /** 游戏暂停按钮 */
  // gamePauseBtn = new ToggleButton()

  init(options) {
    if (!!this.initialized) return; this.initialized = true

    // 初始化暂停按钮
    const gamePauseBtn = new ToggleButton()
    gamePauseBtn.init({
      checkedLabel: "恢复"
      , uncheckedLabel: "暂停"
      , x: GameGlobal.CANVAS_WIDTH - 80
      , y: 50
      , onTap: res => {
        this.emit("gamePause")
      }
    })
    this.addElement(gamePauseBtn)
    const game = options.game
    this.run = () => gamePauseBtn.checked = game.isPaused

    // 退出按钮
    const exitBtn = new SimpleTextButton()
    exitBtn.init({
      label: "退出"
      , x: GameGlobal.CANVAS_WIDTH - 80
      , y: 90
      , onTap: () => {
        console.log("游戏结束")
        wx.exitMiniProgram()
      }
    })
    this.addElement(exitBtn)
  }
}

export default new GameTopLayer()