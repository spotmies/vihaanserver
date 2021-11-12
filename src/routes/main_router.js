// import express  from "express";
const express = require("express");


const router = express.Router();
const userR = require("./users/user");

// import userR from "./users/user";

 router.use("/user", userR);

module.exports = router;

