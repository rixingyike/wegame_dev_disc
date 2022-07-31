// JS：第1章\1.4.4\index.js
import LinkedList from "./linked_list.js"
const linkedList = new LinkedList()
linkedList.append(2)
linkedList.append(6)
linkedList.append(24)
linkedList.append(152)
linkedList.insertAt(3, 18)
linkedList.print() // 输出： 2 6 24 18 152