// JS：第2章\minigame\src\libs\event_dispatcher.js
/** 示例22：事件派发者对象 */
class EventDispatcher {
  constructor() { }

  // 监听映射对象
  events = {}

  /** 开始监听事件 */
  on(eventType, func) {
    (this.events[eventType] || (this.events[eventType] = [])).push(func)
  }

  /** 移除事件监听 */
  off(eventType, func = undefined) {
    if (func) {
      let stack = this.events[eventType]
      if (stack && stack.length > 0) {
        for (let j = 0; j < stack.length; j++) {
          if (Object.is(stack[j], func)) {
            stack.splice(j, 1)
            break
          }
        }
      }
    } else {
      delete this.events[eventType]
    }
  }

  /** 只监听事件一次 */
  once(eventType, func) {
    function on() {
      this.off(eventType, on)
      func.apply(this, arguments)
    }
    this.on(eventType, on)
  }

  /** 发布订阅通知 */
  emit(eventType, ...args) {
    const stack = this.events[eventType]
    if (stack && stack.length > 0) {
      stack.forEach(item => item.apply(this, args))
    }
  }
}

export default EventDispatcher