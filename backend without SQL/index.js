const express = require("express");

const categories = require("./app/categories");
const places = require("./app/places");
const inventory = require("./app/inventory");
const cors = require("cors");
const fileDb = require("./fileDb");

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());
app.use(express.static("public"));
app.use("/categories", categories);
app.use("/places", places);
app.use("/inventory", inventory);

const run = async () => {
  await fileDb.init();

  app.listen(port, () => {
    console.log("Listening on port " + port);
  });
};

run().catch(e => {
  console.log(e);
});
