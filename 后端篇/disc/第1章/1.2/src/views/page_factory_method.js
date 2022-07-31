// JS：src\views\page_factory_method.js
import GameOverPage from "game_over_page.js"
import GameIndexPage from "game_index_page.js"

/** 场景基类 */
class Scene {
  constructor(options) {
    this.options = options
  }
  options
  createPage() { }
}

/** 主页场景 */
class IndexPageScene extends Scene {
  createPage() {
    const page = new GameIndexPage(this.options.game)
    page.init({ context: this.options.context })
    return page
  }
}

/** 游戏结束页场景 */
class GameOverPageScene extends Scene {
  createPage() {
    return new GameOverPage(this.options.game)
  }
}

/** 场景集合，添加新页面时在这里扩展 */
const scenes = {
  "index": IndexPageScene,
  "gameOver": GameOverPageScene
}

/** 页面工厂 */
class PageFactory {
  /** 创建页面对象 */
  static createPage(pageName, options) {
    const Kind = scenes[pageName]
    const scene = new Kind(options)
    return scene.createPage()
  }
}

export default PageFactory