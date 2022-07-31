// JS：第2章\2.9\示例46\index.js
const obj = {
  name: "小游戏",
  location: "Beijing",
  [`#job`]: "Programmer",
  _salary: "3k",
  _age: 3
}
for (const prop in obj) {
  console.log(`${prop}：${obj[prop]}`)
  // if (!prop.startsWith("_")) console.log(`${prop}：${obj[prop]}`)
}
console.log("keys", Object.getOwnPropertyNames(obj))