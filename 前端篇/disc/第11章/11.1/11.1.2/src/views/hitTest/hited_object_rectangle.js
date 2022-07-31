// JS：src\views\hitTest\hited_object_rectangle.js
import Rectangle from "rectangle.js"

/** 被碰撞对象的抽象部分，屏幕及左右挡板的注册点默认在左上角 */
class HitedObjectRectangle extends Rectangle{
  constructor(x, y, width, height){
    super(x, y, width, height)
  }
}

export default HitedObjectRectangle