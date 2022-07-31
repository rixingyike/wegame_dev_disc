// JS：src\views\component.js
import EventDispatcher from "../libs/event_dispatcher.js"

/** UI组件基类 */
class Component extends EventDispatcher {
  constructor() { super() }

  x = 0
  y = 0
  width = 100
  height = 100
  /** 父节点 */
  parentElement

  /** 初始化 */
  init(options) { }

  /** 渲染 */
  render(context) { }

  /** 处理触摸结束事件 */
  onTouchEnd(res) { }

  /** 处理触摸移动事件 */
  onTouchMove(res) { }

  /** 负责页面开始事件 */
  start() {
    this.game.on("touchMove", res => this.onTouchMove.call(this, res))
    this.game.on("touchEnd", res => this.onTouchEnd.call(this, res))
  }

  /** 负责页面结束事件 */
  end() {
    this.game.off("touchMove")
    this.game.off("touchEnd")
  }

  /** 获得组件相对于窗口的X偏移量 */
  getOffsetXToWindow() {
    return this.x + (this.parentElement?.getOffsetXToWindow() ?? 0) // 这里必须有小括号
  }

  /** 获得组件相对于窗口的Y偏移量 */
  getOffsetYToWindow() {
    return this.y + (this.parentElement?.getOffsetYToWindow() ?? 0)
  }
}

export default Component