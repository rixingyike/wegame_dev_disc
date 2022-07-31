// JS：disc\第6章\6.2\6.2.9_2\a.js
console.log("a started")
import { foo } from "./b.js"
console.log("in a, b.foo = ", foo)
export const bar = 2
console.log("a done")