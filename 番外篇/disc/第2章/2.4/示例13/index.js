// JS：第2章\2.4\示例13\index.js
Array.prototype.eachItem = function (callBack) {
  for (let i = 0, len = this.length; i < len; i++) {
    console.log(`${i}：${this[i]}`);
    if (callBack(this[i], i) === true) {
      break;
    }
  }
}
const arr = ["Angular", 2021, "Vue", "React", "元宇宙网文"]
arr.eachItem((item, index) => item == "React")