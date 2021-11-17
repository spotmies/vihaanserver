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

const settingsSchema = new Mongoose.Schema({
  login: {
    head: defaultString,
    caption: defaultString,
    uname: defaultString,
    forgotPwd: defaultString,
    loginButton: defaultString,
    password: defaultString,
    noAccount: defaultString,
  },

  welcome: {
    head: defaultString,
    caption: defaultString,
    nextButton: defaultString,
  },

  onBoard: [
    {
      title: defaultString,
      content: defaultString,
      img: defaultString,
      button1: {
        text: defaultString,
        textColor: defaultString,
        color: defaultString,
      },
      button2: {
        text: defaultString,
        color: defaultString,
        textColor: defaultString,
      },
    },
  ],
});

module.exports = Mongoose.model("settings", settingsSchema);
