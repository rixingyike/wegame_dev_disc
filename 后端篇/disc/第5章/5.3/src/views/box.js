// JS：src\views\box.js
import Component from "component.js"

/** UI盒子 */
class Box extends Component {
  constructor() { super() }

  children = []

  /** 添加子元素
   * @param {Component} element
   * @param {number} index 添加的索引位置，如果不提供，默认从尾部添加
   * @returns {Box} this
   */
  addElement(element, index = -1) {
    if (index > -1) {
      this.children.splice(index, 0, element)
    } else {
      this.children.push(element)
    }
    return (element.parentElement = this)
  }

  /** 移除子元素
   * @param {Component} element
   * @returns {Box} this
   */
  removeElement(element) {
    const index = this.children.indexOf(element)
    if (!!index) {
      element.parentElement = null
      this.children.splice(index, 1)
    }
    return this
  }

  render(context) {
    const N = this.children.length
    for (let j = 0; j < N; j++) {
      const element = this.children[j]
      element.render(context)
    }
  }

  onTouchEnd(res) {
    const N = this.children.length
    for (let j = 0; j < N; j++) {
      const element = this.children[j]
      element.onTouchEnd(res)
    }
  }

  onTouchMove(res) {
    const N = this.children.length
    for (let j = 0; j < N; j++) {
      const element = this.children[j]
      element.onTouchMove(res)
    }
  }
}

export default Box