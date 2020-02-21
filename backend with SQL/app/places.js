const express = require("express");

const mysqlDb = require("../mysqlDb");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await mysqlDb.getConnection().query('SELECT `id`, `name` FROM accounting.places');
  res.send(result);
});

router.get("/:id", async (req, res) => {
  const response = await mysqlDb.getConnection().query('SELECT * FROM accounting.places WHERE `id` = ?', req.params.id);
  const result = response[0]
  !result
  ? res.status(404).send({error: 'Not found'})
  : res.send(result);
});

router.post("/", async (req, res) => {
  const response = req.body;
  if (!response.name || response.name === '') {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
    const fields = Object.keys(response)
    const resFields = fields.map(el => response[el])
    let result;
    try {
      result = await mysqlDb.getConnection().query(`INSERT INTO accounting.places (${fields.join(', ')}) VALUES (?, ?)`, resFields);
    } catch (e) {
      res.status(400).send({ error: e.sqlMessage });
    }
    const request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.places  WHERE id = ${result.insertId}`);
    res.send(request[0]);
  }
});

router.put("/:id", async (req, res) => {
  const response = req.body;
  let request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.places  WHERE id = ${req.params.id}`);
  if (request.length === 0) {
    res.status(404).send({error: 'Not found'});
  } else if (!response.name || response.name.length === 0) {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
    const fields = Object.keys(response);
    const updFields = fields.map((el, i) => `\`${fields[i]}\` = '${response[el]}'`);
    try {
      await mysqlDb.getConnection().query(`UPDATE accounting.places SET ${updFields.join(', ')} WHERE id = ${req.params.id};`);
    } catch (e) {
      res.status(400).send({ error: e.sqlMessage });
    }
    request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.places  WHERE id = ${response.id ? parseInt(response.id) : req.params.id}`);
    res.send(request[0]);
  }
});

router.delete("/:id", async (req, res) => {
  let request = await mysqlDb.getConnection().query(`SELECT * FROM accounting.places  WHERE id = ${req.params.id}`);
  if (request.length === 0) {
    res.status(404).send({error: 'Not found'});
  } else {
    try {
      await mysqlDb.getConnection().query(`DELETE FROM accounting.places WHERE id = ${req.params.id}`);
      res.send('Row with id - ' + req.params.id + ' in table - places was deleted.')
    } catch (e) {
      res.status(400).send({ error: e.sqlMessage });
    }
  };
});

module.exports = router;