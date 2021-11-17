const Router = require("express");
const router = Router();
const constants = require("../../helpers/schema/constants");
const productDb = require("../../models/products/products_schema");

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
  try {
    productDb
      .findOne({ productId: _productId, isDeleted: false })
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
  try {
    productDb
      .find({ categoryId: _category, isDeleted: false })
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
  try {
    productDb
      .find({ modelId: _model, isDeleted: false })
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
  try {
    productDb.find({ isDeleted: false }, (err, data) => {
      if (err) {
        console.error(err);
        return res.status(400).send(err.message);
      } else if (!data) return res.status(404).json("No data found");
      res.status(200).json(data);
    });
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
    try {
        productDb.findOneAndUpdate(
            { productId: _productId, isDeleted: false },
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
router.delete(`/${constants.PRODUCTS}/:id`,(req,res) => {
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
                }
                else if(!data) return res.status(404).json("No data found");
                return res.status(200).json(data);
            }
        );
    }
    catch (error) {
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
