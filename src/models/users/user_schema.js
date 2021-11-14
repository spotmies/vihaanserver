const Mongoose = require("mongoose");
const { reqStr, reqNum, uIdSch, nonReqCoord, nonReqBool, nonReqStr, nonReqNum, createdAt, modifiedAt } = require("../../helpers/schemaHelp");
//create user schema
const userSchema = 
new Mongoose.Schema(
    {
    name: reqStr,
    mobile: reqNum,
    uId:uIdSch,
    coordinates:nonReqCoord,
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
    }
    )
    ;

    // export default model("users", userSchema);

    module.exports = Mongoose.model("users", userSchema);

