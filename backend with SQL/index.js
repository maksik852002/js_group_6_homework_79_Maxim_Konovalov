const express = require("express");
const cors = require("cors");
const mysqlDb = require('./mysqlDb');

const categories = require("./app/categories");
const places = require("./app/places");
const inventory = require("./app/inventory");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/categories", categories);
app.use("/places", places);
app.use("/inventory", inventory);


const run = async () => {

  await mysqlDb.connect();

  app.listen(port, () => {
    console.log("Listening on port " + port);
  });

  process.on('exit', () => {
    mysqlDb.disconnect();
  })
};

run().catch(e => {
  console.log(e);
});
