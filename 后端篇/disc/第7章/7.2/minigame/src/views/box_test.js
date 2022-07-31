// JS：src\views\box_test.js
import HBox from "hbox.js"
import VBox from "vbox.js"
import Square from "./square.js" // 这里自动补全后的格式

// 测试颜色方块
export function testForSquare(context){
  const square = new Square()
  square.x = 50
  square.y = 50
  square.render(context)
}

// 测试HBox
export function testForHBox(context) {
  const hbox = new HBox()
  hbox.x = 50
  hbox.y = 100
  for (let j = 0; j < 5; j++) {
    const element = new Square("blue")
    hbox.addElement(element)
  }
  hbox.render(context)
}

// 测试VBox
export function testForVBox(context) {
  const vbox = new VBox()
  vbox.x = 50
  vbox.y = 150
  for (let j = 0; j < 5; j++) {
    const element = new Square("brown")
    vbox.addElement(element)
  }
  vbox.render(context)
}

// 测试盒子嵌套，一个HBox内含5个VBox，每个VBox再包含3个方块
export function testForComplexBox(context) {
  const hbox = new HBox()
  hbox.x = 50
  hbox.y = 380
  for (let j = 0; j < 5; j++) {
    const vbox = new VBox()
    for (let k = 0; k < 3; k++) {
      const element = new Square("green")
      vbox.addElement(element)
    }
    hbox.addElement(vbox)
  }
  hbox.render(context)
}