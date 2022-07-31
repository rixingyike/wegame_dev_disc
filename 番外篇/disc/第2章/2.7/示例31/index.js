// JS：第2章\2.7\示例31\index.js
/** 被访问者：计算机基础部件基类 */
class ComputerPart {
  constructor(name) {
    this.name = name
  }
  name // 计算机部件名称
  // 部件充许接受多个访问者对象
  accept(computerVisitor) { }
}
/** 键盘 */
class Keyboard extends ComputerPart {
  constructor(name) {
    super("键盘")
  }
  accept(computerVisitor) {
    computerVisitor.visitKeyboard(this)
  }
}
/** 显示器 */
class Monitor extends ComputerPart {
  constructor(name) {
    super("显示器")
  }
  accept(computerVisitor) {
    computerVisitor.visitMonitor(this)
  }
}
/** 鼠标 */
class Mouse extends ComputerPart {
  constructor(name) {
    super("鼠标")
  }
  accept(computerVisitor) {
    computerVisitor.visitMouse(this)
  }
}
/** 计算机对象 */
class Computer extends ComputerPart {
  constructor() {
    super("计算机")
    this.parts = [new Mouse(), new Keyboard(), new Monitor()]
  }
  accept(computerVisitor) {
    for (let i = 0; i < this.parts.length; i++) {
      let part = this.parts[i]
      part.accept(computerVisitor)
    }
    computerVisitor.visitComputer(this)
  }
}
/** 访问者基类对象 */
class ComputerVisitor {
  visitKeyboard(computerPart) { }
  visitMouse(computerPart) { }
  visitMonitor(computerPart) { }
  visitComputer(computerPart) { }
}
/** 计算机安装之访问者 */
class ComputerSetupVisitor extends ComputerVisitor {
  visitKeyboard(computerPart) {
    console.log(`安装了${computerPart.name}`)
  }
  visitMouse(computerPart) {
    console.log(`安装了${computerPart.name}`)
  }
  visitMonitor(computerPart) {
    console.log(`安装了${computerPart.name}`)
  }
  visitComputer(computerPart) {
    console.log(`\t${computerPart.name}完成安装`)
  }
}
/** 计算机系统启动之访问者 */
class ComputerStartVisitor extends ComputerVisitor {
  visitKeyboard(computerPart) {
    console.log(`启动了${computerPart.name}`)
  }
  visitMouse(computerPart) {
    console.log(`启动了${computerPart.name}`)
  }
  visitMonitor(computerPart) {
    console.log(`启动了${computerPart.name}`)
  }
  visitComputer(computerPart) {
    console.log(`\t${computerPart.name}完成启动`)
  }
}
// 消费代码
const computer = new Computer()
computer.accept(new ComputerSetupVisitor())
computer.accept(new ComputerStartVisitor())