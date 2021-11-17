const Mongoose = require("mongoose");
const {
  reqStr,
  reqNum,
  arrSch,
  nonReqBool,
  modifiedAt,
  defaultString,
  createdAt,
} = require("../../helpers/schemaHelp");


const settingsSchema = new Mongoose.Schema(

);

module.exports = Mongoose.model("settings", settingsSchema);