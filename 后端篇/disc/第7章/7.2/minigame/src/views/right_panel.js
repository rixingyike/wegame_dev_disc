// JS：src/views/right_panel.js
import Panel from "panel.js"
import RightPanelRectangle from "hitTest/right_panel_rectangle.js"
import PanelAcceleratedSpeedYStrategy from "strategy/panel_accelerated_speed_y_strategy.js" 
import PanelUniformSpeedYStrategy from "strategy/panel_uniform_speed_y_strategy.js"

/** 右挡板 */
class RightPanel extends Panel {
  constructor() {
    super()
    this.rectangle = new RightPanelRectangle()
  }

  /** 挡板的上下移动策略 */
  #speedYStrategy
  // #speedY = 0.5 // 右挡板Y轴方向的移动速度

  /** 初始化 */
  init(options) {
    super.init(options)
    if (!!this.initialized) return; this.initialized = true // 避免重复初始化

    // this.#speedYStrategy = new PanelUniformSpeedYStrategy()
    this.#speedYStrategy = new PanelAcceleratedSpeedYStrategy()

    this.x = GameGlobal.CANVAS_WIDTH - GameGlobal.PANEL_WIDTH // X坐标是固定的
    const defaultY = this.y = options?.y ?? (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2 // 右挡板起始位置是居中位置
    this.reset = () => {
      super.reset()
      this.y = defaultY
      // this.#speedY = 0.5
    }
  }

  /** 运算 */
  run() {
    // 右挡板运动数据计算
    // this.y += this.#speedY
    // const centerY = (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2
    // if (this.y < centerY - GameGlobal.RIGHT_PANEL_MOVE_RANGE || this.y > centerY + GameGlobal.RIGHT_PANEL_MOVE_RANGE) {
    //   this.#speedY = -this.#speedY
    // }
    this.y += this.#speedYStrategy.getValue(this.y)
  }

  /** 小球碰撞到左挡板返回2 */
  testHitBall(ball) {
    return ball.rectangle.hitTest(this.rectangle)
    // if (ball.x > (GameGlobal.CANVAS_WIDTH - GameGlobal.RADIUS - GameGlobal.PANEL_WIDTH)) { // 碰撞右挡板
    //   if (ball.y > this.y && ball.y < (this.y + GameGlobal.PANEL_HEIGHT)) {
    //     return 2
    //   }
    // }
    // return 0
  }
}

export default new RightPanel()