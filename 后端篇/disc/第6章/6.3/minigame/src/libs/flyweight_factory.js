// JS：src\libs\flyweight_factory.js
/** 享元模式工厂 */
class FlyweightFactory {
  static cache = new Map()

  /** 从缓存中创建对象 */
  static create(name, options, createInstance, thisObj = null) {
    let instance = this.cache.get(name)
    if (!instance){
      instance = createInstance.bind(thisObj)()
      this.cache.set(name,instance)
    }
    for (const p in options) instance[p] = options[p]

    return instance
  }
}

export default FlyweightFactory