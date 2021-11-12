const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const cors = require('cors');
const mongoose = require('mongoose');
const PORT = process.env.PORT || 4000;
const server = require('http').createServer(app);
const connectdb = require('./src/config/db');

connectdb();
server.listen(PORT, () => {
    console.log(`app running on port ${PORT}`);
  });