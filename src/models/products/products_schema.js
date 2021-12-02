const Mongoose = require("mongoose");
const {
  reqStr,
  reqNum,
  arrSch,
  nonReqBool,
  modifiedAt,
  defaultString,
  createdAt,
  stringId,
  uIdSch,
} = require("../../helpers/schemaHelp");

const mediaSchema = Mongoose.Schema({
  mediaType: defaultString,
  mediaUrl: defaultString,
});

//new schema
const productSchema = new Mongoose.Schema(
  {
    basicDetails: {
      modelName: reqStr,
      price: reqNum,
      qty: reqNum,
      media: [mediaSchema],
      description: reqStr,
      company: reqStr,
    },
    colorDetails: {
      primaryColor: reqStr,
      secondaryColor: reqStr,
    },
    techDetails: {
      highSpeed: defaultString,
      acceleation: defaultString,
      torque: defaultString,
      isbluetoothConnected: nonReqBool,
      iswifiConnected: nonReqBool,
      isusbConnected: nonReqBool,
      batteryCapacityVoltage: defaultString,
      batteryCapacityPower: defaultString,
      batteryType: defaultString,
      ridingRange: arrSch,
      chargingTime: arrSch,
      chargingType: defaultString,
      dimensions: defaultString,
      maxWeight: defaultString,
      datasheet: defaultString,
      bootSpacingCapacity: defaultString,
      bootSpacingType: defaultString,
      bootSpacingHeight: defaultString,
      bootSpacingWidth: defaultString,
      bootSpacingDepth: defaultString,
      breakType: defaultString,
      rimType: defaultString,
      tyreType: defaultString,
      tyreSize: defaultString,
      displayType: defaultString,
      isTouchScreen: nonReqBool,
      isReverse: nonReqBool,
      lockType: defaultString,
      isgpsConnected: nonReqBool,
      gpsType: defaultString,
    },
    warrantyDetails: {
      warrantyOnVehicle: defaultString,
      warrantyOnAccessories: defaultString,
      warrantyOnBattery: defaultString,
      warrantyOnMotor: defaultString,
      isExternalWarranty: nonReqBool,
    },
    likes: arrSch,
    isActive: nonReqBool,
    reviews: {
      type: Mongoose.Schema.Types.ObjectId,
      ref: "reviews",
      required: false,
    },

    categoryId: stringId,
    modelId: stringId,
    productId: uIdSch,
    //doc fields
    isDeleted: nonReqBool,
    createdAt: createdAt,
    lastModified: modifiedAt,
  },
  { timestamps: true }
);

module.exports = Mongoose.model("products", productSchema);
