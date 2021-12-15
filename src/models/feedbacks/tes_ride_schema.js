const Mongoose = require("mongoose");
const {
  reqStr,
  nonReqStr,
  createdAt,
  modifiedAt,
  nonReqBool,
  defaultString
} = require("../../helpers/schemaHelp");

const mediaSchema = Mongoose.Schema({
  mediaType: defaultString,
  mediaUrl: defaultString,
});

const testRideSchema = new Mongoose.Schema(
  {
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    description: nonReqStr,
    media: [mediaSchema],
    uId: reqStr,
    productId: reqStr,
    modelId: reqStr,
    reviewFor:{
      type: String,
      required:false,
      default:"product"
    },

    uDetails: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "users",
    },
    productDetails: {
      type: Mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "products",
    },
    createdAt: createdAt,
    lastModifiedAt: modifiedAt,
    isDeleted: nonReqBool,
  },
  { timestamps: true }
);

module.exports = Mongoose.model("reviews", testRideSchema);
