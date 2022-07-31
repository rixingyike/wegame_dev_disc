// JS：src\views\page_factory.js
import GameOverPage from "game_over_page.js"
import GameIndexPage from "game_index_page.js"

/** 页面工厂 */
class PageFactory {
  /** 创建页面对象 */
  static createPage(pageName, game, context) {
    let page // of Page
    switch (pageName) {
      case "gameOver": {
        page = new GameOverPage(game)
        break;
      }
      case "index":
      default: {
        page = new GameIndexPage(game)
        page.init({ context }) // 初始化
        break;
      }
    }

    return page
  }
}

export default PageFactory