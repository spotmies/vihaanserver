const Router = require("express");
const constants = require("../../helpers/schema/constants");
const testDriveDB = require("../../models/test_drive/test_drive_schema");
const router = Router();

/* -------------------------------------------------------------------------- */
/*                           NEW TEST DRIVE REQUEST                           */
/* -------------------------------------------------------------------------- */
router.post(`/${constants.NEW_TEST_DRIVE_REQUEST}`, (req, res) => {
  const body = req.body;
  try {
    testDriveDB.create(body, (err, data) => {
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

/* -------------------------------------------------------------------------- */
/*                        GET TEST DRIVE WITH DRIVE ID                        */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.TEST_DRIVES}/:driveId`, (req, res) => {
  const driveId = req.params.driveId;
  try {
    testDriveDB.findOne({ driveId: driveId, isDeleted: false }, (err, data) => {
      if (err) {
        console.log("error", err);
        return res.status(400).json(err.message);
      } else if (!data) return res.status(404).json("No data found");
      return res.status(200).json(data);
    });
  } catch (error) {
    catchFunc(error);
  }
});

/* -------------------------------------------------------------------------- */
/*                       UPDATE TEST DRIVE WITH DRIVE ID                      */
/* -------------------------------------------------------------------------- */
router.put(`/${constants.TEST_DRIVES}/:driveId`, (req, res) => {
  const driveId = req.params.driveId;
  const body = req.body;
  try {
    testDriveDB.findOneAndUpdate(
      { driveId: driveId, isDeleted: false },
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
/*                       DELETE TEST DRIVE WITH DRIVE ID                      */
/* -------------------------------------------------------------------------- */
router.delete(`/${constants.TEST_DRIVES}/:driveId`, (req, res) => {
  const driveId = req.params.driveId;
  try {
    testDriveDB.findOneAndUpdate(
      { driveId: driveId, isDeleted: false },
      { $set: { isDeleted: true } },
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
/*                             GET ALL TEST DRIVES                            */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.ALL_TEST_DRIVES}`, (req, res) => {
  try {
    testDriveDB.find({ isDeleted: false }, (err, data) => {
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

module.exports = router;
