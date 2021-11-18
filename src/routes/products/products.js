const Router = require("express");
const router = Router();
const constants = require("../../helpers/schema/constants");
const productDb = require("../../models/products/products_schema");
const { parseParams } = require("../../helpers/query/parse_params");
/* -------------------------------------------------------------------------- */
/*                             NEW PRODUCT REQUEST                            */
/* -------------------------------------------------------------------------- */
router.post(`/${constants.NEW_PRODUCT}`, (req, res) => {
  //console.log("newUser");
  const body = req.body;
  console.log("from api", body);
  try {
    productDb.create(body, (err, data) => {
      if (err) {
        console.log("error", err);

        return res.status(400).json(err.message);
      }
      return res.status(200).json(data);
    });
  } catch (error) {
    catchFunc(error);
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
        productId: _productId,
        isDeleted: isDeleted,
        isActive: isActive,
      })
      .populate("reviews")
      .exec(function (err, data) {
        console.log("data", data);
        if (err) {
          console.error(err);
          return res.status(400).send(err.message);
        } else if (!data) return res.status(404).json("No data found");
        return res.status(200).json(data);
      });
  } catch (error) {
    catchFunc(error);
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
        if (err) {
          console.error(err);
          return res.status(400).send(err.message);
        } else if (!data) return res.status(404).json("No data found");
        return res.status(200).json(data);
      });
  } catch (error) {
    catchFunc(error);
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
        if (err) {
          console.error(err);
          return res.status(400).send(err.message);
        } else if (!data) return res.status(404).json("No data found");
        return res.status(200).json(data);
      });
  } catch (error) {
    catchFunc(error);
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
    productDb.find(
      { isDeleted: isDeleted, isActive: isActive },
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(400).send(err.message);
        } else if (!data) return res.status(404).json("No data found");
        res.status(200).json(data);
      }
    );
  } catch (error) {
    catchFunc(error);
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
      { productId: _productId, isDeleted: isDeleted },
      { $set: body },
      { new: true },
      (err, data) => {
        if (err) {
          console.log("error", err);
          return res.status(400).json(err.message);
        }
        return res.status(200).json(data);
      }
    );
  } catch (error) {
    catchFunc(error);
  }
});

/* -------------------------------------------------------------------------- */
/*                       DELETE PRODUCT WITH PRODUCT ID                       */
/* -------------------------------------------------------------------------- */
router.delete(`/${constants.PRODUCTS}/:id`, (req, res) => {
  const _productId = req.params.id;
  try {
    productDb.findOneAndUpdate(
      { productId: _productId, isDeleted: false },
      { $set: { isDeleted: true } },
      { new: true },
      (err, data) => {
        if (err) {
          console.log("error", err);
          return res.status(400).json(err.message);
        } else if (!data) return res.status(404).json("No data found");
        return res.status(200).json(data);
      }
    );
  } catch (error) {
    catchFunc(error);
  }
});

module.exports = router;

function catchFunc(error) {
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message,
  });
}
