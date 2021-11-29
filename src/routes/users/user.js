const Router = require("express");

const userDb = require("../../models/users/user_schema");
const router = Router();
const constants = require("../../helpers/schema/constants");
const {
  processRequest,
  catchFunc,
} = require("../../helpers/error_handling/process_request");

//post method for registering user
/* -------------------------------------------------------------------------- */
/*                                   new user registration                                  */
/* -------------------------------------------------------------------------- */
router.post(`/${constants.NEW_USER}`, (req, res) => {
  //console.log("newUser");
  const body = req.body;
  console.log("from api", body);
  try {
    userDb.create(body, (err, data) => {
     return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);

  }
});

/* -------------------------------------------------------------------------- */
/*                                   Get User Data                                  */
/* -------------------------------------------------------------------------- */

//get only user with uId
router.get(`/users/:id`, (req, res) => {
  const uId = req.params.id;
  console.log("uId", uId);
  try {
    userDb.findOne({ uId: uId }).exec(function (err, data) {
     return processRequest(err, data, res);
    });
  } catch (error) {
   return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                                user details edit/login api                 */
/* -------------------------------------------------------------------------- */

//update user details with put method
router.put("/users/:id", (req, res) => {
  const uId = req.params.id;
  const body = req.body;

  try {
    userDb.findOneAndUpdate(
      { uId: uId },
      { $set: body },
      { new: true },
      (err, data) => {
        if (err) {
          console.error(err);
          return res.status(400).send(err.message);
        }
        if (!data) return res.status(404).json(data);
        if (body.lastLogin) {
          return processRequest(err, data, res);
        }
        return res.status(200).json(data);
      }
    );
  } catch (error) {
   return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                                 user delete                                */
/* -------------------------------------------------------------------------- */

router.delete("/users/:id", (req, res) => {
  //console.log("deleting");
  const uId = req.params.id;
  try {
    userDb.findOneAndUpdate(
      { uId: uId },
      { $set: { isDeleted: true } },
      { new: true },
      (err, data) => {
      return  processRequest(err, data, res);
      }
    );
  } catch (error) {
    return catchFunc(error, res);
  }
});

/* -------------------------------------------------------------------------- */
/*                                all usersData                               */
/* -------------------------------------------------------------------------- */

router.get("/all-users", (req, res) => {
  try {
    userDb.find({ isDeleted: false }, (err, data) => {
      return processRequest(err, data, res);
    });
  } catch (error) {
    return catchFunc(error, res);
  }
});

module.exports = router;
