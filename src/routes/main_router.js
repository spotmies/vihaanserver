// import express  from "express";
const express = require("express");

const router = express.Router();
const userR = require("./users/user");
const settingsR = require("./settings/settings");
const productsR = require("./products/products");

// import userR from "./users/user";

router.use("/user", userR);
router.use("/settings", settingsR);
router.use("/product", productsR);

module.exports = router;
