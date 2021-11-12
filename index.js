const express = require('express');
const app = express();
const mainRoute = require("./src/routes/main_router");

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const server = require('http').createServer(app);
const connectdb = require('./src/config/db');

connectdb();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/api", mainRoute);

server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });