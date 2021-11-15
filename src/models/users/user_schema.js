const Mongoose = require("mongoose");
const { reqStr, uIdSch, nonReqBool, nonReqStr, nonReqNum, createdAt, modifiedAt, nonReqArrNum, phoneNum } = require("../../helpers/schemaHelp");
//create user schema
const userSchema = 
new Mongoose.Schema(
    {
    name: reqStr,
    mobile: phoneNum,
    uId:uIdSch,
    coordinates:nonReqArrNum,
    isActive: nonReqBool,
    deviceToken: nonReqStr,
    deviceTopic: nonReqStr,
    logs: [String],
    lastLogin:nonReqNum,
    userState:nonReqStr,
    appConfig:nonReqStr,
    isDeleted:nonReqBool,
    pic:nonReqStr,
    identity:[Number],
    createdAt:createdAt,
    lastModified:modifiedAt,
    },{ timestamps: true }
    )
    ;

    // export default model("users", userSchema);

    module.exports = Mongoose.model("users", userSchema);

