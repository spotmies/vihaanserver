const Router = require("express");
const router = Router();
const settingsSchema = require("../../models/settings/settings_schema");
const { parseparams } = require("../../helpers/query/parse_params");

/* -------------------------------------------------------------------------- */
/*                             NEW SETTINGS ROUTES                            */
/* -------------------------------------------------------------------------- */

router.post("/new-settings", (req, res) => {
  try {
    settingsSchema.create(req.body, (err, data) => {
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
/*                           GET ALL MOBILE SETTINGS                          */
/* -------------------------------------------------------------------------- */
router.get("/settings", (req, res) => {
  let originalUrl = parseparams(req.originalUrl);
  let isDeleted = originalUrl.isDeleted ?? false;

  try {
    settingsSchema.find({ isDeleted: isDeleted }, (err, data) => {
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
/*                               UPDATE SETTINGS                              */
/* -------------------------------------------------------------------------- */
router.put("/update-settings/:id", (req, res) => {
  try {
    settingsSchema.findByIdAndUpdate(
      req.params.id,
      req.body,
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


function catchFunc(error) {
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message,
  });
}

module.exports = router;
