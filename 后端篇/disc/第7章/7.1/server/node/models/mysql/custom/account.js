// JS：models\mysql\custom\account.js
"use strict"
import { unconected as db } from "../db.js"
export default db.model({ table: "account" })