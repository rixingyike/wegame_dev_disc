// JS：第2章\2.8\示例41\browser_facade.js
/** 浏览器外观对象 */
class BrowserFacade {
  /** 监听事件 */
  static addEvent(element, event, fn) {
    if (element.addEventListener) {
      element.addEventListener(event, fn, false)
    } else if (element.attachEvent) {
      // IE
      element.attachEvent('on' + event, fn)
    } else {
      // Other
      element['on' + event] = fn
    }
  }
  /** 获取事件对象 */
  static getEvent(event) {
    return event || window.event // IE
  }
  /** 获取与事件关联的组件元素 */
  static getTarget(event) {
    event = this.getEvent(event)
    return event.target || event.srcElement // IE
  }
  /** 尝试阻止事件的默认行为 */
  static preventDefault(event) {
    event = this.getEvent(event)
    if (event.preventDefault) { // 阻止默认行为
      event.preventDefault() 
    } else { // IE
      event.returnValue = false 
    } 
  }
  /** 停止事件冒泡 */
  static cancelBubble(event) {
    event = this.getEvent(event)
    if (event.stopPropagation) { 
      event.stopPropagation() 
    } else { // IE
      event.cancelBubble = true 
    } 
  }
}

export default BrowserFacade