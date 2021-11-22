const Mongoose = require("mongoose");
const {
  reqStr,
  uIdSch,
  nonReqBool,
  nonReqStr,
  nonReqNum,
  createdAt,
  modifiedAt,
  nonReqArrNum,
  phoneNum,
  defaultString,
  userState,
  appConfig,
} = require("../../helpers/schemaHelp");
//create user schema
const userSchema = new Mongoose.Schema(
  {
    name: reqStr,
    mobile: phoneNum,
    uId: uIdSch,
    coordinates: nonReqArrNum,
    isActive: nonReqBool,
    deviceToken: nonReqStr,
    deviceTopic: nonReqStr,
    logs: [String],
    lastLogin: nonReqNum,
    userState: userState,
    appConfig: appConfig,
    isDeleted: nonReqBool,
    pic: defaultString,
    identity: [Number],
    createdAt: createdAt,
    lastModified: modifiedAt,
    cart: [{ type: Mongoose.Schema.Types.ObjectId, ref: "products" }],
    wishList: [{ type: Mongoose.Schema.Types.ObjectId, ref: "products" }],
    orders: [{ type: Mongoose.Schema.Types.ObjectId, ref: "orders" }],
    myTestDrives: [
      { type: Mongoose.Schema.Types.ObjectId, ref: "test_drives" },
    ],
  },
  { timestamps: true }
);
// export default model("users", userSchema);

module.exports = Mongoose.model("users", userSchema);
