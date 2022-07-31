// JS：src\views\hitTest\right_panel_rectangle.js
import HitedObjectRectangle from "hited_object_rectangle.js"

/** 被碰撞对象右挡板的大小数据 */
class RightPanelRectangle extends HitedObjectRectangle {
  constructor() {
    super(GameGlobal.CANVAS_WIDTH - GameGlobal.PANEL_WIDTH, (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2, GameGlobal.PANEL_WIDTH, GameGlobal.PANEL_HEIGHT)
  }

  visit(hitObject) {
    if (hitObject.right > this.left && hitObject.top > this.top && hitObject.bottom < this.bottom) {
      return 1 << 1
    }
    return 0
  }
}

export default RightPanelRectangle