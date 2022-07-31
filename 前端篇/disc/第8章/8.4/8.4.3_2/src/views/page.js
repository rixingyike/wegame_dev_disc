// JS：src\views\page.js
/** 页面基类 */
class Page {
  constructor(game) {
    this.game = game
  }

  game // 游戏对象引用

  /** 负责初始化 */
  init(options) { }

  /** 负责渲染 */
  render(context) { }

  /** 负责计算 */
  run() { }

  /** 负责处理触摸结束事件 */
  onTouchEnd(res) { }

  /** 负责处理触摸移动事件 */
  onTouchMove(res) { }

  /** 负责页面开始事件 */
  start() { }

  /** 负责页面结束事件 */
  end() { }
}

export default Page