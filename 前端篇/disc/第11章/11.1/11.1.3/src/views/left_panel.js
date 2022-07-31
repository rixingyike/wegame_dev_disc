// JS：src/views/left_panel.js
import Panel from "panel.js"
import LeftPanelRectangle from "hitTest/left_panel_rectangle.js"

/** 左挡板 */
class LeftPanel extends Panel {
  constructor() {
    super()
    this.rectangle = new LeftPanelRectangle()
  }

  /** 初始化 */
  init(options) {
    super.init(options)
    if (!!this.initialized) return; this.initialized = true // 避免重复初始化

    this.x = 0 // X坐标是固定的
    const defaultY = this.y = options?.y ?? GameGlobal.CANVAS_HEIGHT / 2 - GameGlobal.PANEL_HEIGHT / 2 // 左挡板变化数据，左挡板的起点Y坐标
    this.reset = () => {
      super.reset()
      this.y = defaultY
    }
  }

  /** 处理触摸移动事件 */
  onTouchMove(res) {
    let touch = res.touches[0] || { clientY: 0 }
    let y = touch.clientY - GameGlobal.PANEL_HEIGHT / 2
    if (y > 0 && y < (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT)) { // 溢出检测
      this.y = y
    }
  }

  /** 小球碰撞到左挡板返回1 */
  testHitBall(ball) {
    return ball.rectangle.hitTest(this.rectangle)
    // if (ball.x < GameGlobal.RADIUS + GameGlobal.PANEL_WIDTH) { // 触达左挡板
    //   if (ball.y > this.y && ball.y < (this.y + GameGlobal.PANEL_HEIGHT)) {
    //     return 1
    //   }
    // }
    // return 0
  }
}

export default new LeftPanel()