// JS：models\mysql\custom\account.js
"use strict"
import { unconnected as db } from "../db.js"
export default db.model({ table: "account" })