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

    // 游戏圈按钮
    const gameClubButton = wx.createGameClubButton({
      icon: "light" // light、dark、green、white
      , style: {
        left: GameGlobal.CANVAS_WIDTH - 50
        , top: 170
        , width: 30
        , height: 30
        , backgroundColor: "#F5A83100"
        , color: "white"
        , borderColor: "gray"
        , borderWidth: 1
        , borderRadius: 1
      }
    })
    gameClubButton.show() // 与“设置”按钮一样，必须调用show才会显示

    // 客服按钮
    const customerBtn = new SimpleTextButton()
    customerBtn.init({
      label: "客服"
      , x: GameGlobal.CANVAS_WIDTH - 80
      , y: 210
      , onTap: () => {
        console.log("马上进入客服会话窗口")
        wx.openCustomerServiceConversation({
          sessionFrom: "弹珠传说小游戏"
        })
      }
    })
    this.addElement(customerBtn)

    // 意见反馈按钮
    const feedbackButton = wx.createFeedbackButton({
      type: "text"
      , text: "意见反馈"
      , style: {
        left: GameGlobal.CANVAS_WIDTH - 80
        , top: 250
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
    })
    feedbackButton.show()
  }
}

export default new GameTopLayer()