const mongoose = require("mongoose");
const config = require("./config");

const dbConnection = () => {
  mongoose
    .connect(config.mongodbUri, {})
    .then(() => {
      console.log("Success connect to mongoDb");
    })
    .catch((err) => {
      console.log("Fail to connect to mongoDb", err);
    });
};


module.exports = dbConnection