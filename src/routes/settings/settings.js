const Router = require("express");
const router = Router();
const settingsSchema = require("../../models/settings/settings_schema");
const { parseParams } = require("../../helpers/query/parse_params");
const {
  catchFunc,
  processRequest,
} = require("../../helpers/error_handling/process_request");

/* -------------------------------------------------------------------------- */
/*                             NEW SETTINGS ROUTES                            */
/* -------------------------------------------------------------------------- */

router.post("/new-settings", (req, res) => {
  try {
    settingsSchema.create(req.body, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                           GET  MOBILE SETTINGS  by id                        */
/* -------------------------------------------------------------------------- */
router.get("/settings/:id", (req, res) => {
  let id = req.params.id;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;

  try {
    settingsSchema.findOne({ _id: id, isDeleted: isDeleted }, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                           GET SETTINGS BY DOC ID                           */
/* -------------------------------------------------------------------------- */
router.get("/doc-id/:docId", (req, res) => {
  let docId = req.params.docId;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    settingsSchema.findOne(
      { docId: docId, isDeleted: isDeleted },
      (err, data) => {
        return processRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                              GET ALL SETTINGS                              */
/* -------------------------------------------------------------------------- */
router.get("/all-settings", (req, res) => {
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    settingsSchema.find({ isDeleted: isDeleted }, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                    ADD NEW SETTINGS TO PARTICULAR SCREEN                   */
/* -------------------------------------------------------------------------- */
router.post("/add-settings-to-screen/:id", (req, res) => {
  let id = req.params.id;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  let updateBody = req.body.body;
  let screenName = req.body.screenName;
  try {
    settingsSchema.findOneAndUpdate(
      { _id: id, isDeleted: isDeleted },
      { $push: { [screenName]: updateBody } },
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
/*                   REMOVE SETTINGS FROM PARTICULAR SCREEN                   */
/* -------------------------------------------------------------------------- */
router.delete("/remove-settings-from-screen/:id", (req, res) => {
  let id = req.params.id;
  let originalUrl = parseParams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;
  let screenName = req.body.screenName;
  let objId = req.body.objId;
  try {
    settingsSchema.findOneAndUpdate(
      { _id: id, isDeleted: isDeleted },
      { $pull: { [screenName]: { objId: objId } } },
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
/*                               UPDATE SETTINGS                              */
/* -------------------------------------------------------------------------- */
router.put("/settings/:id", (req, res) => {
  let originalUrl = parseParams(req.originalUrl);

  let isDeleted = originalUrl.isDeleted ?? false;
  try {
    settingsSchema.findByIdAndUpdate(
      { _id: req.params.id, isDeleted: isDeleted },
      { $set: req.body },
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
/*                            DELETE SETTINGS BY ID                           */
/* -------------------------------------------------------------------------- */
router.delete("/settings/:id", (req, res) => {
  try {
    settingsSchema.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: { isDeleted: true } },
      { new: true },
      (err, data) => {
        return processRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
  }
});

module.exports = router;
