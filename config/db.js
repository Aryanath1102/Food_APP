const mongoose = require("mongoose");
const color = require("colors");

// funtion mongodb database connection
const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log(`Connected to Database ${mongoose.connection.host}`.bgWhite);
  } catch (error) {
    console.log("Db Error".bgRed, error);
  }
};

module.exports = connectDb;
