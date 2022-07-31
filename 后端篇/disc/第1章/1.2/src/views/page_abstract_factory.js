// JS：src\views\page_abstract_factory.js
import GameOverPage from "game_over_page.js"
import GameIndexPage from "game_index_page.js"

/** 页面抽象工厂 */
class PageAbstractFactory {
  constructor() { }

  /** 抽象的页面对象 */
  page

  /** 创建页面对象的创建执行器
   * @returns {function} game => { }
   */
   createPageCreator() { }

  /** 创建页面对象的初始化执行器
   * @returns {function} context => { }
   */
  createPageInitializer() { }

  /** 返回页面对象 */
  getPage() {
    return this.page
  }
}

/** 游戏主页工厂 */
class GameIndexPageFactory extends PageAbstractFactory {
  createPageCreator() {
    return game => {
      this.page = new GameIndexPage(game)
    }
  }

  createPageInitializer() {
    return context => {
      this.page.init({ context })
    }
  }
}

/** 游戏结束页工厂 */
class GameOverPageFactory extends PageAbstractFactory {
  createPageCreator() {
    return game => {
      this.page = new GameOverPage(game)
    }
  }

  createPageInitializer() {
    return context => { }
  }
}

/** 工厂集合 */
const factories = {
  "index": GameIndexPageFactory,
  "gameOver": GameOverPageFactory
}

/** 页面工厂 */
class PageFactory {
  /** 创建页面对象，并在初始化后返回 */
  static createPage(pageName, options) {
    const Factory = factories[pageName]
    const factory = new Factory()
    factory.createPageCreator()(options.game)
    factory.createPageInitializer()(options.context)

    return factory.getPage()
  }
}

export default PageFactory