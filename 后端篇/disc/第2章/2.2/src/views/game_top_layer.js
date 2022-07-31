// JS：src\views\game_top_layer.js
import Box from "box.js"
import SimpleTextButton from "simple_text_button.js"
import ToggleButton from "toggle_button.js"

/** 游戏顶级UI层 */
class GameTopLayer extends Box {
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
        // wx.exitMiniProgram()
        game.exit()
      }
    })
    this.addElement(exitBtn)

    // 设置按钮
    const style = {
      left: GameGlobal.CANVAS_WIDTH - 80
      , top: 130
      , width: 60
      , height: 25
      , lineHeight: 23
      , backgroundColor: "#F5A831"
      , color: "white"
      , textAlign: "center"
      , fontSize: 12
      , borderColor: "gray"
      , borderWidth: 1
      , borderRadius: 1
    }
    const openSettingButton = wx.createOpenSettingButton({
      type: "text"
      , text: "设置"
      , style
    })
    openSettingButton.show()
  }
}

export default new GameTopLayer()