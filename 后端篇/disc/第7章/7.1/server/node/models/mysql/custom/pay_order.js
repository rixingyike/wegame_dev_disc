// JS：server\node\models\mysql\custom\pay_order.js
"use strict"
import { unconected as db } from "../db.js"
export default db.model({ table: "pay_order" })