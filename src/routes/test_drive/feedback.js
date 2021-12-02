const Router = require("express");
const feedbackDB = require("../../models/feedbacks/tes_ride_schema");
const {
  processRequest,
  catchFunc,
} = require("../../helpers/error_handling/process_request");
const constants = require("../../helpers/schema/constants");
const { parseParams } = require("../../helpers/query/parse_params");
const router = Router();

/* ---------------------- CREATE NEW TEST RIDE FEEDBACK --------------------- */

router.post(`/${constants.NEW_TESTRIDE_FEEDBACK}`, (req, res) => {
  const body = req.body;
  try {
    feedbackDB.create(body, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* ------------------------ UPDATE TEST RIDE FEEDBACK ----------------------- */

router.put(`/${constants.TEST_RIDES}/:id`, (req, res) => {
  const id = req.params.id;
  const body = req.body;
  try {
    feedbackDB.findByIdAndUpdate(id, body, { new: true }, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* --------------------------- GET FEEDBACK BY ID --------------------------- */

router.get(`/${constants.FEEDBACKS}/:id`, (req, res) => {
  const id = req.params.id;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    feedbackDB
      .findOne({ _id: id, isDeleted: isDeleted })
      .populate("uDetails", "name mobile uId pic userState")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    catchFunc(error, res);
  }
});

/* ------------------------ GET FEEDBACK BY MODEL ID ------------------------ */
/* ----------------------------------- OR ----------------------------------- */
/* ------------------------------ BY PRODUCT ID ----------------------------- */

router.get(`/:category1/:id`, (req, res) => {
  const id = req.params.id;
  const category1 = req.params.category1;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    feedbackDB

      .find({
        [category1]: id,
        isDeleted: isDeleted,
      }) 
      .populate("uDetails", "name mobile uId pic userState")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    catchFunc(error, res);
  }
});



/* --------------------------- FETCH ALL FEEDBACKS -------------------------- */

router.get(`/${constants.ALL_FEEDBACKS}`, (req, res) => {
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    feedbackDB
      .find({ isDeleted: isDeleted })
      .populate("uDetails", "name mobile uId pic userState")
      .exec(function (err, data) {
        return processRequest(err, data, res);
      });
  } catch (error) {
    catchFunc(error, res);
  }
});



/* ------------------------ DELETE TEST RIDE FEEDBACK ----------------------- */

router.delete(`/${constants.TEST_RIDES}/:id`, (req, res) => {
  const id = req.params.id;
  try {
    feedbackDB.findByIdAndUpdate(id, { isDeleted: true }, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    catchFunc(error, res);
  }
});

module.exports = router;
