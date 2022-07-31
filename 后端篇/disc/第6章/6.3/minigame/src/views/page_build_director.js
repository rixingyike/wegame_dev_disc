// JS：src\views\page_build_director.js
import GameIndexPage from "game_index_page.js"
import GameOverPage from "game_over_page.js"
import GameIndexPageBuilder from "game_index_page_builder.js"
import GameOverPageBuilder from "game_over_page_builder.js"

/** 建造指挥者 */
class PageBuildDirector {
  /** 根据名称构建页面 */
  static buildPage(pageName, options) {
    let builder
    switch (pageName) {
      case "index": {
        builder = new GameIndexPageBuilder(new GameIndexPage(options.game), options)
        break
      }
      case "gameOver":
      default: {
        builder = new GameOverPageBuilder(new GameOverPage(options.game), options)
        break
      }
    }
    builder.buildBackground()
    builder.buildGameElements()
    builder.buildForeground()

    return builder.getPage()
  }
}

export default PageBuildDirector