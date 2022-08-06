/**
 * 《微信小游戏开发：番外篇》随课源码
 * @author LIYI <9830131@qq.com>
 * 公众号/视频号「网络榨知机」作者，腾讯云最具价值专家（TVP）、微信学堂《小程序性能优化实践》等课程讲师、《小程序从0到1》《微信小游戏开发》等图书作者。
 * 学编程就像登山，一步一个台阶，没有人学不会。
*/
// JS：第2章\2.10\示例52\index.js
/** 输入设备基类 */
class InputDevice {
  constructor(outputDevice/* of OutputDevice */) {
    this.output = outputDevice
  }
  setOutputDevice(outputDevice) {
    this.output = outputDevice
  }
}
/** 输入设备触摸板 */
class TouchpadDevice extends InputDevice {
  constructor(output) {
    super(output)
  }
  tap() {
    this.output.onClick()
  }
  swipe() {
    this.output.onMove()
  }
  pinStart() {
    this.output.onStartDrag()
  }
  pinEnd() {
    this.output.onEndDrag()
  }
  zoom() {
    this.output.onZoom()
  }
}
/** 输入设备鼠标 */
class MouseDevice extends InputDevice {
  constructor(output) {
    super(output)
  }
  mouseClick() {
    this.output.onClick()
  }
  mouseMove() {
    this.output.onMove()
  }
  mouseDown() {
    this.output.onStartDrag()
  }
  mouseUp() {
    this.output.onEndDrag()
  }
  mouseWheel() {
    this.output.onZoom()
  }
}
/** 输出设备基类 */
class OutputDevice {
  constructor(name) {
    this.name = name
  }
  onClick() { }
  onMove() { }
  onStartDrag() { }
  onEndDrag() { }
  onZoom() { }
}
/** 输出设备屏幕 */
class ScreenDevice extends OutputDevice {
  constructor() {
    super("屏幕设备")
  }
  onClick() {
    console.log(`点击于${this.name}，坐标为(x, y)`)
  }
  onMove() {
    console.log(`移动于${this.name}，一条直线绘制`)
  }
  onStartDrag() {
    console.log(`开始拖拽于${this.name}，起始坐标(x, y)`)
  }
  onEndDrag() {
    console.log(`结束拖拽于${this.name}，结束坐标(x, y)`)
  }
  onZoom() {
    console.log(`放大于${this.name}，倍数n`)
  }
}
/** 音频输出设备 */
class AudioDevice extends OutputDevice {
  constructor() {
    super("音频设备")
  }
  onClick() {
    console.log(`叮，点击于${this.name}`)
  }
  onMove() {
    console.log(`嗖，移动于${this.name}`)
  }
  onStartDrag() {
    console.log(`呜，开始拖拽于${this.name}`)
  }
  onEndDrag() {
    console.log(`呜停，结束拖拽于${this.name}`)
  }
  onZoom() {
    // 没有表示
  }
}
// 测试代码
const screen = new ScreenDevice()
  , audio = new AudioDevice()
  , touchpad = new TouchpadDevice(screen)
touchpad.tap()
touchpad.swipe()
touchpad.pinStart()
touchpad.pinEnd()
touchpad.zoom()

touchpad.setOutputDevice(audio)
touchpad.tap()
touchpad.swipe()
touchpad.pinStart()
touchpad.pinEnd()
touchpad.zoom()

const mouse = new MouseDevice(audio)
mouse.mouseClick()
mouse.mouseMove()
mouse.mouseWheel()

mouse.setOutputDevice(screen)
mouse.mouseClick()
mouse.mouseMove()
mouse.mouseWheel()