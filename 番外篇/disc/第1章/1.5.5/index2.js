// JS：第1章\1.5.5\index2.js
class AudioManager {
  static #instance
  // 单例，懒汉模式
  static getInstance() {
    return this.#instance = (this.#instance || new AudioManager())
  }
  constructor() { }
  play() {
    console.log("playing")
  }
  // ...
}
const audioMgr = AudioManager.getInstance()
audioMgr.play() // 输出：playing