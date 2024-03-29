// import express  from "express";
const express = require("express");

const router = express.Router();
const userR = require("./users/user");
const settingsR = require("./settings/settings");
const productsR = require("./products/products");
const testDriveR = require("./test_drive/test_drive");
const testRidefeedbackR = require("./test_drive/feedback");

// import userR from "./users/user";

router.use("/user", userR);
router.use("/settings", settingsR);
router.use("/product", productsR);
router.use("/test-ride", testDriveR);
router.use("/test-ride-feedback", testRidefeedbackR)

module.exports = router;
