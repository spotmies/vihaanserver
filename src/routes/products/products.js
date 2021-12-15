const Router = require("express");
const router = Router();
const constants = require("../../helpers/schema/constants");
const productDb = require("../../models/products/products_schema");
const { parseParams } = require("../../helpers/query/parse_params");
const {
  catchFunc,
  processRequest,
  deleteRequest,
} = require("../../helpers/error_handling/process_request");
/* -------------------------------------------------------------------------- */
/*                             NEW PRODUCT REQUEST                            */
/* -------------------------------------------------------------------------- */
router.post(`/${constants.NEW_PRODUCT}`, (req, res) => {
  //console.log("newUser");
  const body = req.body;
  console.log("from api", body);
  try {
    productDb.create(body, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                          GET PRODUCT BY PRODUCT ID                         */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.PRODUCTS}/:id`, (req, res) => {
  const _productId = req.params.id;
  /* -------------------------- add query params here ------------------------- */
  let originalUrl = parseParams(req.originalUrl);
  let isActive = originalUrl.isActive ?? true;
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    productDb
      .findOne({
        _id: _productId,
        isDeleted: isDeleted,
        isActive: isActive,
      })
      .populate("reviews")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                          GET PRODUCTS BY CATEGORY                          */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.GET_PRODUCTS_BY_CATEGORY}/:categoryId`, (req, res) => {
  const _category = req.params.categoryId;
  let originalUrl = parseParams(req.originalUrl);
  let isActive = originalUrl.isActive ?? true;
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    productDb
      .find({ categoryId: _category, isDeleted: isDeleted, isActive: isActive })
      .populate("reviews")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                          GET PRODUCTS BY MODEL ID                          */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.GET_PRODUCTS_BY_MODEL}/:modelId`, (req, res) => {
  const _model = req.params.modelId;
  let originalUrl = parseParams(req.originalUrl);
  let isActive = originalUrl.isActive ?? true;
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    productDb
      .find({ modelId: _model, isDeleted: isDeleted, isActive: isActive })
      .populate("reviews")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                              GET ALL PRODUCTS                              */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.ALL_PRODUCTS}`, (req, res) => {
  let originalUrl = parseParams(req.originalUrl);
  let isActive = originalUrl.isActive ?? true;
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    productDb
      .find({ isDeleted: isDeleted, isActive: isActive })
      .populate("reviews")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                       UPDATE PRODUCT WITH PRODUCT ID                       */
/* -------------------------------------------------------------------------- */
router.put(`/${constants.PRODUCTS}/:id`, (req, res) => {
  const _productId = req.params.id;
  const body = req.body;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    productDb.findOneAndUpdate(
      { _id: _productId, isDeleted: isDeleted },
      { $set: body, $set: { lastModified: Date.now() } },
      { new: true },
      (err, data) => {
        return processRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                       DELETE PRODUCT WITH PRODUCT ID                       */
/* -------------------------------------------------------------------------- */
router.delete(`/${constants.PRODUCTS}/:id`, (req, res) => {
  const _productId = req.params.id;
  try {
    // update by findbyidandupdate method
    productDb.findByIdAndUpdate(
      _productId,
      { $set: { isDeleted: true }, $set: { lastModified: Date.now() } },
      { new: true },
      (err, data) => {
        return deleteRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
  }
});

module.exports = router;
