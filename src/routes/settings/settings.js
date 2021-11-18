const Router = require("express");
const router = Router();
const settingsSchema = require("../../models/settings/settings_schema");

router.post("/newSetting", (req, res) => {
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

function catchFunc(error) {
  res.status(500).json({
    message: "Internal Server Error",
    error: error.message,
  });
}

module.exports = router;
