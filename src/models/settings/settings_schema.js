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

  logo: {
    img: defaultString,
  },

  otp: {
    enterText: defaultString,
    nextButton: {
      text: defaultString,
      color: defaultString,
      textColor: defaultString,
    },
  },

  productsList: {
    modelButtons: defaultString,
    recentText: defaultString,
    recentItems: [
      {
        img: defaultString,
        name: defaultString,
        specs: defaultString,
        more: defaultString,
      },
    ],
  },

  product: {
    testDriveBtn: {
      text: defaultString,
      color: defaultString,
      textColor: defaultString,
    },
    bookBtn: {
      text: defaultString,
      color: defaultString,
      textColor: defaultString,
    },
    moreText: defaultString,
  },

  sideMenu: {
    dp: defaultString,
    editText: defaultString,
    icon: defaultString,
    items: defaultString,
  },
});

module.exports = Mongoose.model("settings", settingsSchema);
