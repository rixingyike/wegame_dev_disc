// JS：src\views\render\render_decorator.js
/** 装饰器对象基类 */
class RenderDecorator {
  /** 
   * @constructor
   * @param {object} target 有一个render(context)方法
   */
  constructor(target) {
    this.targetRender = target.render.bind(target)
    this.render = this.render.bind(this)
  }

  /** 被装饰对象的原始render方法 */
  targetRender

  render(context){
    this.targetRender(context)
  }
}

export default RenderDecorator