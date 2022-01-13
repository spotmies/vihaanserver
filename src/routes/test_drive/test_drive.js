const Router = require("express");
const {
  processRequest,
  deleteRequest,
  catchFunc,
} = require("../../helpers/error_handling/process_request");
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
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                        GET TEST DRIVE WITH DRIVE ID                        */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.TEST_DRIVES}/:driveId`, (req, res) => {
  const driveId = req.params.driveId;
  try {
    testDriveDB.findOne({ driveId: driveId, isDeleted: false }, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
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
        return processRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
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
        return deleteRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                             GET ALL TEST DRIVES                            */
/* -------------------------------------------------------------------------- */
router.get(`/${constants.ALL_TEST_DRIVES}`, (req, res) => {
  try {
    // testDriveDB.find({ isDeleted: false }, (err, data) => {
    //   return processRequest(err, data, res);
    // });
    testDriveDB
      .find({ isDeleted: false })
      .populate("userDetails")
      .populate("vehicleDetails")
      .exec((err, data) => {
        return processRequest(err, data, res);
      });
  } catch (error) {
    return catchFunc(error, res);
  }
});

module.exports = router;
