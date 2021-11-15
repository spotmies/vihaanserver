const Mongoose = require("mongoose");
const { nonReqStr, reqStr, reqSchedule, numberStatus, nonReqArrNum, createdAt, modifiedAt, nonReqBool, nonReqNum, ordIdSch } = require("../../helpers/schemaHelp");

const testDriveSchema = new Mongoose.Schema({
  schedule: reqSchedule,
  bookingPlace: reqStr,
  bookingLocation: nonReqArrNum,
  userDetails: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  vehicleDetails: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
    },
    bookingStatus: numberStatus,
    adharNumber:nonReqNum,
    identityProof: nonReqArrNum,
    createdAt: createdAt,
    lastmodifiedAt: modifiedAt,
    isDeleted:nonReqBool,
    driveId:ordIdSch




});

module.exports = Mongoose.model("test_drives", testDriveSchema);
