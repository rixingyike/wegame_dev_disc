// JS：第2章\2.6\示例29\index.js
/** 列表选择器 */
class ListBox {
  constructor(txtInput, items) {
    this.txtInput = txtInput
    this.items = items
  }
  items
  txtInput
  selectedItem
  selectItem(text) {
    this.items.some(item => {
      if (item == text) {
        this.selectedItem = text
        console.log(`列表框选择了“${text}”`)
        this.txtInput.setText(text)
        return true
      }
      return false
    })
  }
}
/** 文本输入域 */
class TextInput {
  constructor(submitBtn) {
    this.submitBtn = submitBtn
  }
  submitBtn
  text
  setText(text) {
    this.text = text
    if (text) console.log(`文本域输入了“${text}”`)
    this.submitBtn.setEnabled(text != "")
  }
  clear() {
    console.log("文本清空了")
    this.setText("")
  }
}
/** 提交按钮 */
class SubmitButton {
  enabled
  setEnabled(enabled) {
    this.enabled = enabled
    console.log(`\t此时按钮是${enabled ? "可用" : "禁用"}状态`)
  }
}
// 测试代码
const submitBtn = new SubmitButton()
  , txtInput = new TextInput(submitBtn)
  , listBox = new ListBox(txtInput, ["JavaScript", "Golang", "小程序", "小游戏"])
listBox.selectItem("小游戏") // 模拟用户选择
txtInput.setText("CSS")
txtInput.clear()