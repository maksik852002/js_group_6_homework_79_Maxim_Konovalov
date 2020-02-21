const path = require("path");

const express = require("express");
const multer = require("multer");
const nanoid = require("nanoid");

const mysqlDb = require("../mysqlDb");

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
  const result = await mysqlDb.getConnection().query('SELECT `id`, `name`, `categories_id`, `places_id` FROM accounting.inventory');
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const response = await mysqlDb.getConnection().query('SELECT * FROM accounting.inventory WHERE `id` = ?', req.params.id);
  const result = response[0]
  !result
  ? res.status(404).send({error: 'Not found'})
  : res.send(result);
});

router.post("/", upload.single("image"), async (req, res) => {
  const response = req.body;
  if (response.name === '' || response.categories_id === '' || response.places_id === '') {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
    req.file ? response.image = req.file.filename : response.image = ''
    !response.description && (response.description = '')
    const fields = Object.keys(response)
    const resFields = fields.map(el => response[el]);
    let result;
    try {
      result = await mysqlDb.getConnection().query(`INSERT INTO accounting.inventory (${fields.join(', ')}) VALUES (?, ?, ?, ?, ?)`, resFields);
    } catch (e) {
      res.status(400).send({ error: e.sqlMessage });
    }
    const request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.inventory  WHERE id = ${result.insertId}`);
    res.send(request[0]);
  }
});


router.put("/:id", upload.single("image"), async (req, res) => {
  const response = req.body;
  let request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.inventory  WHERE id = ${req.params.id}`);
  if (request.length === 0) {
    res.status(404).send({error: 'Not found'});
  } else if (!response.name || response.name.length === 0) {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
    req.file && (response.image = req.file.filename);
    const fields = Object.keys(response);
    const updFields = fields.map((el, i) => `\`${fields[i]}\` = '${response[el]}'`);
    try {
      await mysqlDb.getConnection().query(`UPDATE accounting.inventory SET ${updFields.join(', ')} WHERE id = ${req.params.id};`);
    } catch (e) {
      res.status(400).send({ error: e.sqlMessage });
    }
    request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.inventory  WHERE id = ${response.id ? parseInt(response.id) : req.params.id}`);
    res.send(request[0]);
  }
});

router.delete("/:id", async (req, res) => {
  let request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.inventory  WHERE id = ${req.params.id}`);
  if (request.length === 0) {
    res.status(404).send({error: 'Not found'});
  } else {
    try {
      await mysqlDb.getConnection().query(`DELETE FROM inventory WHERE id = ${req.params.id}`);
      res.send('Row with id - ' + req.params.id + ' in table - inventory was deleted.')
    } catch (e) {
      res.status(400).send({ error: e.sqlMessage });
    }
  };
});

module.exports = router;