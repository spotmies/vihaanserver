const Mongoose = require("mongoose");
const { nonReqStr, reqStr, reqSchedule, numberStatus, nonReqArrNum, createdAt, modifiedAt, nonReqBool } = require("../../helpers/schemaHelp");

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
    identityProof: nonReqArrNum,
    createdAt: createdAt,
    lastmodifiedAt: modifiedAt,
    isDeleted:nonReqBool,



});

module.exports = Mongoose.model("test_drives", testDriveSchema);
