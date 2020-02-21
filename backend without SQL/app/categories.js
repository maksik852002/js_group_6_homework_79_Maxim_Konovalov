const express = require("express");
const fileDb = require("../fileDb");
const router = express.Router();

router.get("/", async (req, res) => {
  const result = await fileDb.getItems('categories');
  const response = [];
  for(let el of result) {
    response.push({id:el.id, name:el.name})
  }
    res.send(response);
});

router.get("/:id", async (req, res) => {
  const result = await fileDb.getItemById(req.params.id, 'categories');
  res.send(result);
});

router.post("/", async (req, res) => {
  const response = req.body;
  if (!response.name || response.name.length === 0) {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
    await fileDb.addItem(response, 'categories');
    res.send(response);
  }
});

router.put("/:id", async (req, res) => {
  const response = req.body;
  if (!response.name || response.name.length === 0) {
    res.status(400).send({ error: "Required fields must be present in the request!" });
  } else {
   const result = await fileDb.editItem(req.params.id, response, 'categories');
   result === -1 
   ? res.status(404).send({error: 'Not found'})
   : res.send(result)
  }
});

router.delete("/:id", async (req, res) => {
  const result = await fileDb.deleteItem(req.params.id, 'categories');
  if (result === -1) {
    res.status(404).send({error: 'Not found'})
  } else if (!result) {
    res.send(req.params.id + ' was deleted');
  } else {
    res.status(400).send({error: 'Cannot be deleted without deleting related resources'})
  }
});

module.exports = router;