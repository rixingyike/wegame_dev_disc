// JS：第2章\2.5\示例26\index.js
/** 交通指挥者 */
class TrafficGuidance {
  #currentState
  change(lightState) {
    this.#currentState = lightState
    return this
  }
  go() {
    const r = this.#currentState.go()
    console.log(r.info)
    this.guide(r.canWalk)
  }
  guide(canWalk) {
    if (canWalk) {
      console.log("\t交通指挥：请通行")
    } else {
      console.log("\t交通指挥：请改道")
    }
  }
}
/** 灯的状态对象 */
class LightState {
  color
  constructor(color) {
    this.color = color
  }
  go() {
    return {
      canWalk: false
      , info: ""
    }
  }
}
/** 红灯状态对象 */
class RedLightState extends LightState {
  constructor() {
    super("red")
  }
  go() {
    return {
      canWalk: false
      , info: `当前是${this.color}状态，不能走`
    }
  }
}
/** 绿灯状态对象 */
class GreenLightState extends LightState {
  constructor() {
    super("green")
  }
  go() {
    return {
      canWalk: true
      , info: `当前是${this.color}状态，可以通过`
    }
  }
}
/** 黄灯状态对象 */
class YellowLightState extends LightState {
  constructor() {
    super("yellow")
  }
  go() {
    return {
      canWalk: false
      , info: `当前是${this.color}状态，等一下`
    }
  }
}
/** 橙灯状态对象 */
class OrangeLightState extends LightState {
  constructor() {
    super("orange")
  }
  go() {
    return {
      canWalk: false
      , info: `当前是${this.color}状态，道路抢修，请临时改行`
    }
  }
}
// 消费代码
const trafficLight = new TrafficGuidance()
trafficLight.change(new RedLightState()).go()
trafficLight.change(new YellowLightState()).go()
trafficLight.change(new GreenLightState()).go()
trafficLight.change(new OrangeLightState()).go()