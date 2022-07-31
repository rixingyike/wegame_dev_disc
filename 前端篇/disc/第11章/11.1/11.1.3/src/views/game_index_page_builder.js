// JS：src\views\game_index_page_builder.js
import PageBuilder from "page_builder.js"
import bg from "background.js" // 引入背景对象
import ball from "ball.js" // 引入小球单例
import leftPanel from "left_panel.js" // 引入左挡板
import rightPanel from "right_panel.js" // 引入右挡板
import userBoard from "user_board_boxed.js" // 引入用户记分板
import systemBoard from "system_board.js" // 引入系统记分板
import audioManager from "../managers/audio_manager.js" // 音频管理者单例

/** 游戏主页对象建造者 */
class GameIndexPageBuilder extends PageBuilder {
  /** 创建背景 */
  buildBackground() {
    this.page.addElement(bg)
  }

  /** 创建中景 */
  buildGameElements() {
    // 初始化小球
    ball.init()
    // 初始化挡板
    leftPanel.init({ context: this.options.context })
    rightPanel.init({ context: this.options.context })
    // 初始化用户记分板
    userBoard.init()
    // 添加子元素
    this.page.addElement(rightPanel)
      .addElement(leftPanel)
      .addElement(userBoard)
      .addElement(systemBoard)
      .addElement(ball)
  }

  /** 构建前景 */
  buildForeground() {
    this.page.addElement(audioManager)
  }
}

export default GameIndexPageBuilder