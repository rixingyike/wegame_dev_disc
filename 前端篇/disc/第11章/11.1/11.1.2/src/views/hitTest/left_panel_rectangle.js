// JS：src\views\hitTest\left_panel_rectangle.js
import HitedObjectRectangle from "hited_object_rectangle.js"

/** 被碰撞对象左挡板的大小数据 */
class LeftPanelRectangle extends HitedObjectRectangle {
  constructor() {
    super(0, (GameGlobal.CANVAS_HEIGHT - GameGlobal.PANEL_HEIGHT) / 2, GameGlobal.PANEL_WIDTH, GameGlobal.PANEL_HEIGHT)
  }
}

export default LeftPanelRectangle