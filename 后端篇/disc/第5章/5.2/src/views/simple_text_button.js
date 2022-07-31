// JS：src\views\simple_button.js
import Component from "./component.js"
import fontMgr from "../managers/font_manager.js"

/** 一个简单的2D文本二态按钮 */
class SimpleTextButton extends Component {
  /** 按钮默认文本 */
  label = "按钮"
  /** 按钮单击时的事件回调句柄 */
  #onTap = undefined

  init(options) {
    this.label = options?.label ?? "按钮"
    this.x = options?.x ?? 0
    this.y = options?.y ?? 0
    this.width = options?.width ?? 60
    this.height = options?.height ?? 25
    this.#onTap = options?.onTap
  }

  render(context) {
    context.shadowColor = "gray"
    context.shadowOffsetX = 2
    context.shadowOffsetY = 2
    context.fillStyle = "orange"
    context.fillRect(this.x, this.y, this.width, this.height)
    context.shadowOffsetX = 0
    context.shadowOffsetY = 0
    context.fillStyle = "white"
    context.font = `12px ${fontMgr.fontFamily}`
    context.textBaseline = "top"
    context.fillText(this.label,
      this.x + (this.width - context.measureText(this.label).width) / 2,
      this.y + (this.height - context.measureText("M").width) / 2)
  }

  /** 响应触控结束事件 */
  onTouchEnd(res) {
    const touch = res.changedTouches[0]
    const pos = {
      x: touch.clientX,
      y: touch.clientY
    }
    if (pos.x > this.x
      && pos.x < this.x + this.width
      && pos.y > this.y
      && pos.y < this.y + this.height) {
      if (this.#onTap) this.#onTap(res)
    }
  }
}

export default SimpleTextButton