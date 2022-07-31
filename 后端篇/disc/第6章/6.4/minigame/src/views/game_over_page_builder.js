// JS：src\views\game_over_page_builder.js
import PageBuilder from "page_builder.js"
import { GameOverText } from "game_over_page.js"

/** 游戏主页对象建造者 */
class GameOverPageBuilder extends PageBuilder {
  /** 创建中景 */
  buildGameElements() {
    this.page.addElement(new GameOverText())
  }
}

export default GameOverPageBuilder