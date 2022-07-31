// JS：第2章\2.6\示例30\index.js
/** 表单中介者 */
class FormMediator {
  constructor(listItems) {
    this.listBox = new ListBox(this, listItems)
    this.txtInput = new TextInput(this)
    this.submitBtn = new SubmitButton(this)
  }
  listBox
  txtInput
  submitBtn
  onSelectItemOfListBox(text) {
    this.txtInput.setText(text)
  }
  onSetTextOfTextInput(text) {
    this.submitBtn.setEnabled(text != "")
  }
}
/** 列表选择器 */
class ListBox {
  constructor(mediator, items) {
    this.mediator = mediator
    this.items = items
  }
  mediator
  items
  selectedItem
  selectItem(text) {
    this.items.some(item => {
      if (item == text) {
        this.selectedItem = text
        console.log(`列表框选择了“${text}”`)
        this.mediator.onSelectItemOfListBox(text)
        return true
      }
      return false
    })
  }
}
/** 文本输入域 */
class TextInput {
  constructor(mediator) {
    this.mediator = mediator
  }
  mediator
  text
  setText(text) {
    this.text = text
    if (text) console.log(`文本域输入了“${text}”`)
    this.mediator.onSetTextOfTextInput(text)
  }
  clear() {
    console.log("文本清空了")
    this.setText("")
  }
}
/** 提交按钮 */
class SubmitButton {
  constructor(mediator) {
    this.mediator = mediator
  }
  mediator
  enabled
  setEnabled(enabled) {
    this.enabled = enabled
    console.log(`\t此时按钮是${enabled ? "可用" : "禁用"}状态`)
  }
}
// 测试代码
const formMediator = new FormMediator(["JavaScript", "Golang", "小程序", "小游戏"])
formMediator.listBox.selectItem("小游戏") // 模拟用户选择
formMediator.txtInput.setText("CSS")
formMediator.txtInput.clear()