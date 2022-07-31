// JS：src\views\page_builder.js
/** 页面建造者基类 */
class PageBuilder {
  constructor(page, options = {}) {
    this.page = page
    this.options = options
  }

  /** 建造目标 */
  page
  /** 建造参数 */
  options

  /** 创建背景 */
  buildBackground() { }
  /** 创建中景游戏元素 */
  buildGameElements() { }
  /** 构建前景 */
  buildForeground() { }

  /** 返回建造完的产品对象 */
  getPage() {
    return this.page
  }
}

export default PageBuilder