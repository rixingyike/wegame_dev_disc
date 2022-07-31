// JS：src\views\toggle_button.js
import SimpleTextButton from "simple_text_button.js"

class ToggleButton extends SimpleTextButton {
  #checked = false

  init(options) {
    if (!!this.initialized) return; this.initialized = true

    super.init(options)
    const checkedLabel = options?.checkedLabel ?? "已选择"
    const uncheckedLabel = this.label = options?.uncheckedLabel ?? "未选择"
    Object.defineProperty(this, "checked", {
      get: () => {
        return this.#checked
      },
      set: (val) => {
        this.#checked = val
        this.label = val ? checkedLabel : uncheckedLabel
      },
      configurable: false
    })
  }
}

export default ToggleButton