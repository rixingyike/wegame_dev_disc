// JS：disc\第6章\6.2\6.2.9_2\b.js
console.log("b started")
import { bar } from "./a.js"
export const foo = "foo"
console.log("in b, a.bar = ", bar)
setTimeout(() => {
  console.log("in b, next generation a.bar = ", bar)
})
console.log("b done")