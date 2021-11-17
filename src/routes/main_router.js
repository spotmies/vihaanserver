// import express  from "express";
const express = require("express");

const router = express.Router();
const userR = require("./users/user");
const settingsR = require("./settings/settings");

// import userR from "./users/user";

router.use("/user", userR);
router.use("/settings", settingsR);

module.exports = router;
