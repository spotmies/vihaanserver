const express = require("express");
const app = express();
var cors = require("cors");
const mainRoute = require("./src/routes/main_router");

const bodyParser = require("body-parser");
const PORT = process.env.PORT || 4000;
const server = require("http").createServer(app);
const connectdb = require("./src/config/db");

connectdb();
app.use(cors());
// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "X-Requested-With");
//   res.header("Access-Control-Allow-Headers", "Content-Type");
//   res.header("Access-Control-Allow-Methods", "PUT, GET, POST, DELETE, OPTIONS");
//   next();
// });
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use("/api", mainRoute);

server.listen(PORT, () => {
  console.log(`app running on port ${PORT}`);
});
