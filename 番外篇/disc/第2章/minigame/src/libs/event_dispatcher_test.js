// JS：第2章\minigame\src\libs\event_dispatcher_test.js
import EventDispatcher from "./event_dispatcher.js"

const dispatcher = new EventDispatcher()
dispatcher.on("event1", (...args) => {
  console.log("event1 dispatched", args)
})
dispatcher.once("event2", (...args) => {
  console.log("event2 dispatched", args)
})
dispatcher.on("event3", (...args) => {
  console.log("event3 dispatched", args)
})
// 添加三个事件监听
dispatcher.emit("event1", 1, 2, 3) // event1 dispatched [ 1, 2, 3 ]
dispatcher.emit("event2", 4, 5, 6) // event2 dispatched [ 4, 5, 6 ]
dispatcher.emit("event3", 7, 8, 9) // event3 dispatched [ 7, 8, 9 ]
// 移除event1监听
dispatcher.off("event1")
// 继续派发
dispatcher.emit("event1", 1, 2, 3) // none，已经移除了
dispatcher.emit("event2", 4, 5, 6) // none，只执行过一次
dispatcher.emit("event3", 7, 8, 9) // event3 dispatched [ 7, 8, 9 ]