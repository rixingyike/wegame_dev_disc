// JS：第1章\1.5.5\index.js
class AudioManager {
  // 单例，饿汉模式
  static #instance = new AudioManager()
  static getInstance() {
    return this.#instance
  }
  constructor() { }
  play() {
    console.log("playing")
  }
  // ...
}
const audioMgr = AudioManager.getInstance()
audioMgr.play() // 输出：playing