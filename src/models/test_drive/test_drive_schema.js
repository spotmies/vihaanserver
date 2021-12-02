const Mongoose = require("mongoose");
const { nonReqStr, reqStr, reqSchedule, numberStatus, nonReqArrNum, createdAt, modifiedAt, nonReqBool, nonReqNum, ordIdSch, defaultString } = require("../../helpers/schemaHelp");

const testDriveSchema = new Mongoose.Schema({
  schedule: reqSchedule,
  timeSolt: reqNum,
  bookingPlace:{
    subLocality: defaultString,
    locality: defaultString,
    city: defaultString,
    state: defaultString,
    country: defaultString,
    postalCode: nonReqNum,
    latitude: nonReqNum,
    longitude: nonReqNum,
    addressLine: defaultString,
    subAdminArea: defaultString,
    adminArea: defaultString,
    subThoroughfare: defaultString,
    thoroughfare: defaultString,
    featureName: defaultString,
    required:false
  },
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
