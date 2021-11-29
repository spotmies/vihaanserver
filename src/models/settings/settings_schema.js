const Mongoose = require("mongoose");
const {
  defaultString,
  nonReqBool,
  settingId,
  nonReqStr,
} = require("../../helpers/schemaHelp");

const idSchema = new Mongoose.Schema({
  objId: settingId,
  type: nonReqStr,
  label: defaultString,
  value: nonReqStr,
  color: defaultString,
  more: nonReqStr,
});

const textFieldSchema = new Mongoose.Schema({
  objId: settingId,
  type: nonReqStr,
  hint: defaultString,
  label: defaultString,
  autoFillText: defaultString,
  helperText: defaultString,
  errorText: defaultString,
  backgroundColor: defaultString,
  errorColor: defaultString,
  activeColor: defaultString,
  inActiveColor: defaultString,
  borderColor: defaultString,
  placeHolder: defaultString,
});


const buttonSchema = new Mongoose.Schema({
  objId: settingId,
  type: nonReqStr,
  buttonColor: defaultString,
  text: defaultString,
  textColor: defaultString,
  more: nonReqStr,
});

const settingsSchema = new Mongoose.Schema({
  docId: settingId,
  onBoard: [idSchema],
  login: [idSchema],
  welcome: [idSchema],
  signup: [idSchema],
  otp: [idSchema],
  logos: [idSchema],
  productsList: [idSchema],
  productOverview: [idSchema],
  sideMenu: [idSchema],
  buttons: [buttonSchema],
  textFields: [textFieldSchema],
  home: [idSchema],
  cart: [idSchema],
  orders:[idSchema],
  orderOverview: [idSchema],
  wishList: [idSchema],
  profile: [idSchema],


  settingsFor: {
    type: String,
    default: "mobile",
    required: false,
  },
  isDeleted: nonReqBool,
});

module.exports = Mongoose.model("settings", settingsSchema);

//screens
// onBoard:
// welcome
// login
// otp
// registration
// home

// buttons
// buttoncolor,test,textcolor

// login: {
//   head: defaultString,
//   caption: defaultString,
//   uname: defaultString,
//   forgotPwd: defaultString,
//   loginButton: defaultString,
//   password: defaultString,
//   noAccount: defaultString,
// },

// welcome: {
//   head: defaultString,
//   caption: defaultString,
//   nextButton: defaultString,
// },

// onBoard: [
//   {
//     title: defaultString,
//     content: defaultString,
//     img: defaultString,
//     backButton: {
//       text: defaultString,
//       textColor: defaultString,
//       color: defaultString,
//     },
//     frontButton: {
//       text: defaultString,
//       color: defaultString,
//       textColor: defaultString,
//     },
//   },
// ],

// logo: {
//   img: defaultString,
// },

// otp: {
//   enterText: defaultString,
//   nextButton: {
//     text: defaultString,
//     color: defaultString,
//     textColor: defaultString,
//   },
// },

// productsList: {
//   modelButtons: defaultString,
//   recentText: defaultString,
//   recentItems: [
//     {
//       img: defaultString,
//       name: defaultString,
//       specs: defaultString,
//       more: defaultString,
//     },
//   ],
// },

// product: {
//   testDriveBtn: {
//     text: defaultString,
//     color: defaultString,
//     textColor: defaultString,
//   },
//   bookButton: {
//     text: defaultString,
//     color: defaultString,
//     textColor: defaultString,
//   },
//   moreText: defaultString,
// },
