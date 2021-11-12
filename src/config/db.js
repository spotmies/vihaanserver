const mongoose = require("mongoose");

const connectdb = async () => {
  // %40 = @
  const dburi =
    "mongodb+srv://vihaanelectrix:admin%40vihaan@cluster0.h2cz4.mongodb.net/vihaanDB?retryWrites=true&w=majority";
  mongoose
    .connect(dburi, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      // useFindAndModify: false,
    })
    .then((result) => console.log("mongodb connected"))
    .catch((err) => console.log(err));
 // mongoose.set("useNewUrlParser", true);
 // mongoose.set("useFindAndModify", false);
 // mongoose.set("useCreateIndex", true);
};

module.exports = connectdb;
