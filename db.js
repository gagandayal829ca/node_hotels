const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/hotels", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("MongoDB is connected");
});

db.on("error", (error) => {
  console.log(`Error: ${error}`);
});

db.on("disconnected", () => {
  console.log(`database s disconnected`);
});

module.exports = db;
