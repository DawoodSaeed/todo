const mongoose = require("mongoose");

const MONGODB_URL = process.env.REMOTE_DATABASE_CONNECTION_STRING;

module.exports = function () {
  // ################## (5). MONGOOSE CONNECTION #########################
  mongoose.connect(MONGODB_URL, {});
  mongoose.connection.on("connected", () => {
    console.log("Connected to the mongodb");
  });
  mongoose.connection.on("error", () => {
    console.log("Error connectng to the mongodb");
  });
};
