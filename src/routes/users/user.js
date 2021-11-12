const Router = require("express");

const userDb = require("../../models/users/user_schema");
const router = Router();
const constants = require("../../helpers/schema/constants");

//post method for registering user
/* -------------------------------------------------------------------------- */
/*                                   new user registration                                  */
/* -------------------------------------------------------------------------- */
router.post("/new_user", (req, res) => {
    //console.log("newUser");
    const body = req.body;
    console.log("from api", body);
    try {
        userDb.create(body, (err, data) => {
          if (err) {
            res.status(400).json(err.message);
            console.log("error", err);
          } else {
            res.status(200).json(data);
          }
        });
      } catch (error) {
        res.status(500).json({
          message: "Internal Server Error",
          error: error.message,
        });
      }
  });


  /* -------------------------------------------------------------------------- */
  /*                                   Get User Data                                  */
  /* -------------------------------------------------------------------------- */

  //get only user with uId
router.get(`/userDetails/:id`, (req, res) => {
    const uId = req.params.id;
    console.log("uId", uId);
    try {
      userDb
        .findOne({ uid: uId })
        // .populate({ path: "orders", match: { isDeletedForU÷ser: false } })
        .exec(function (err, data) {
            console.log("data", data);
          if (err) {
            console.error(err);
            return res.status(400).send(err.message);
          }
          return res.status(200).json(data);
        });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });
  


/* -------------------------------------------------------------------------- */
/*                                user details edit                           */
/* -------------------------------------------------------------------------- */


//update user details with put method
router.put("/userEdit/:id", (req, res) => {
    const uId = req.params.id;
    const body = req.body;
  
    try {
      userDb.findOneAndUpdate(
        { uid: uId },
        { $set: body },
        { new: true },
        (err, data) => {
          if (err) {
            console.error(err);
            return res.status(400).send(err.message);
          }
          if (!data) return res.status(404).json(data);
          if (body.lastLogin) {
            try {
              userDb.findOneAndUpdate(
                { uid: uId },
                { $push: { logs: body.lastLogin } },
                { new: true },
                (err, doc) => {}
              );
            } catch (error) {
              //console.log("79", error);
            }
          }
          return res.status(200).json(data);
        }
      );
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });


  /* -------------------------------------------------------------------------- */
  /*                                 user delete                                */
  /* -------------------------------------------------------------------------- */

  router.delete("/userDelete/:id", (req, res) => {
    //console.log("deleting");
    const uId = req.params.id;
    try {
      userDb.findOneAndRemove({ uid: uId }, (err) => {
        if (err) {
          //console.error(err);
          return res.status(400).send(err.message);
        } else {
          userDb.findOne({ uid: uId }, (err, doc) => {
            if (!doc) {
              //console.log("deleted");
              return res.status(204).send();
            } else return res.status(400).send("Not Deleted");
          });
        }
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });


  /* -------------------------------------------------------------------------- */
  /*                                all usersData                               */
  /* -------------------------------------------------------------------------- */

  router.get("/allusers", (req, res) => {
    try {
      userDb.find({isDeleted:false}, (err, data) => {
        if (err) {
          console.error(err);
          return res.status(400).send(err.message);
        }
        res.status(200).json(data);
      });
    } catch (error) {
      return res.status(500).send(error.message);
    }
  });


  module.exports = router;
