// JS：src\libs\event_dispatcher_test.js
import EventDispatcher from "./event_dispatcher.js"

const dispatcher = new EventDispatcher()

dispatcher.on("event1", (...args) => {
  console.log("event1 dispatched", args)
})
dispatcher.once("event2", (...args) => {
  console.log("event2 dispatched", args)
})

dispatcher.emit("event1", 1, 2, 3) // event1 dispatched [ 1, 2, 3 ]
dispatcher.emit("event2", 4, 5, 6) // event2 dispatched [ 4, 5, 6 ]
dispatcher.off("event1")
dispatcher.emit("event1", 1, 2, 3) // none
dispatcher.emit("event2", 4, 5, 6) // none