// JS：第2章\minigame\src\views\hitTest\hit_object_rectangle.js
import Rectangle from "rectangle.js"
// import LeftPanelRectangle from "left_panel_rectangle.js"
// import RightPanelRectangle from "right_panel_rectangle.js"
// import ScreenRectangle from "screen_rectangle.js"

/** 示例32：碰撞对象的抽象部分，球与方块的注册点在中心，不在左上角 */
class HitObjectRectangle extends Rectangle {
  constructor(width, height) {
    super(GameGlobal.CANVAS_WIDTH / 2, GameGlobal.CANVAS_HEIGHT / 2, width, height)
  }

  get top() {
    return this.y - this.height / 2
  }
  get bottom() {
    return this.y + this.height / 2
  }
  get left() {
    return this.x - this.width / 2
  }
  get right() {
    return this.x + this.width / 2
  }

  /** 与被撞对象的碰撞检测 */
  hitTest(hitedObject) {
    return hitedObject.visit(this)
  }
}

export default HitObjectRectangle