const path = require("path");

const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const fileDb = require("../fileDb");

const config = require("../config");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, config.uploadPath);
  },
  filename: (req, file, cb) => {
    cb(null, nanoid() + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

const router = express.Router();

router.get("/", async (req, res) => {
  const result = await fileDb.getItems('inventory');
  const response = [];
  for(let el of result) {
    response.push({id:el.id, category_id:el.category_id, places_id: el.places_id, name:el.name})
  }
    res.send(response);
});

router.get("/:id", async (req, res) => {
  const result = await fileDb.getItemById(req.params.id, 'inventory');
  res.send(result);
});

router.post("/", upload.single("image"), async (req, res) => {
  const response = req.body;
  if (response.name === '' || response.category_id === '' || response.places_id === '') {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
    req.file && (response.image = req.file.filename);
    await fileDb.addItem(response, 'inventory');
    res.send(response);
  }
});

router.put("/:id", upload.single("image"), async (req, res) => {
  const response = req.body;
  if (!response.name || response.name.length === 0) {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
   req.file && (response.image = req.file.filename);
   const result = await fileDb.editItem(req.params.id, response, 'inventory');
   result === -1 
   ? res.status(404).send({error: 'Not found'})
   : res.send(result)
  }
});

router.delete("/:id", async (req, res) => {
  const result = await fileDb.deleteItem(req.params.id, 'inventory');
  if (result === -1) {
    res.status(404).send({error: 'Not found'})
  } else if (!result) {
    res.send(req.params.id + ' was deleted');
  } else {
    res.status(400).send({error: 'Cannot be deleted without deleting related resources'})
  }
});

module.exports = router;