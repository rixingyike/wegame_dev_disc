// JS：src\views\hitTest\hit_object_rectangle.js
import Rectangle from "rectangle.js"
import LeftPanelRectangle from "left_panel_rectangle.js"
import RightPanelRectangle from "right_panel_rectangle.js"
import ScreenRectangle from "screen_rectangle.js"

/** 碰撞对象的抽象部分，球与方块的注册点在中心，不在左上角 */
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
    // let res = 0
    // if (hitedObject instanceof LeftPanelRectangle) { // 碰撞到左挡板返回1
    //   if (this.left < hitedObject.right && this.top > hitedObject.top && this.bottom < hitedObject.bottom) {
    //     res = 1 << 0
    //   }
    // } else if (hitedObject instanceof RightPanelRectangle) { // 碰撞到右挡板返回2
    //   if (this.right > hitedObject.left && this.top > hitedObject.top && this.bottom < hitedObject.bottom) {
    //     res = 1 << 1
    //   }
    // } else if (hitedObject instanceof ScreenRectangle) {
    //   if (this.right > hitedObject.right) { // 触达右边界返回4
    //     res = 1 << 2
    //   } else if (this.left < hitedObject.left) { // 触达左边界返回8
    //     res = 1 << 3
    //   }
    //   if (this.top < hitedObject.top) { // 触达上边界返回16
    //     res = 1 << 4
    //   } else if (this.bottom > hitedObject.bottom) { // 触达下边界返回32
    //     res = 1 << 5
    //   }
    // }
    // return res
    return hitedObject.visit(this)
  }
}

export default HitObjectRectangle