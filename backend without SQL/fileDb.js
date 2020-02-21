const fs = require("fs");
const nanoid = require("nanoid");

const filename = "./db.json";
let data = {categories:[], places: [], inventory:[]};

const readFile = filename => {
  return new Promise((resolve, reject) => {
    fs.readFile(filename, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const writeFile = (filename, content) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filename, content, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = {
  async init() {
    try {
      const content = await readFile(filename);
      data = JSON.parse(content.toString());
    } catch (e) {
      console.log("Could not read file" + filename);
      data = {categories:[], places: [], inventory:[]};
    }
  },
  async getItems(resources) {
    return data[resources];
  },
  async getItemById(id, resources) {
    return data[resources].find(item => item.id === id);
  },
  async addItem(response, resources) {
    response.id = nanoid();
    data[resources].push(response);
    await this.save();
  },
  async deleteItem(id, resources) {
    const index = data[resources].findIndex(item => item.id === id);
    let isRelated = false;
    if (resources === 'categories' || resources === 'places') {
      const check = [];
      const inv = Object.keys(data.inventory[0]);
      inv.forEach(i => {
        check.push(data.inventory.find(key => key[i] === id));
      })
      check.forEach(el => typeof(el) === "object" && (isRelated=true));
    }
    if (index === -1) {
      return index
    } else {
      if (!isRelated) {
        data[resources].splice(index, 1)
        await this.save();
      } else {
        return isRelated
      }
    }
  },
  async editItem(id, response, resources) {
    const index = data[resources].findIndex(item => item.id === id);
    if (index === -1) {
      return index
    } else {
      Object.keys(response).map(el => data[resources][index][el] = response[el])
      await this.save();
      return data[resources][index]
    }
  },
  async save() {
    const content = JSON.stringify(data, null, 2);
    await writeFile(filename, content);
  }
};