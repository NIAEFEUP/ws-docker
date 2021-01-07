const { APP_PORT, DATA_FILE } = process.env;

const FileSystemItemGateway = require("./fs-gateway");
const filepath = DATA_FILE || "data.json";
fs.closeSync(fs.openSync(filepath, "a"));
const gateway = new FileSystemItemGateway(filepath);

const { ShoppingList } = require("./model");
const list = new ShoppingList(gateway);

const RestShoppingListInteractor = require("./rest-interactor");
const interactor = new RestShoppingListInteractor(list);

const express = require("express");
const app = express();
app.use(express.json());

app.get("/", (_req, res) => {
  console.log("GET /");
  const { status, body } = interactor.getAll();
  console.log(`GET / ${status}`);
  res.status(status).json(body);
});

app.get("/:name", (req, res) => {
  const { name } = req.params;
  console.log(`GET /${name}`);
  const { status, body } = interactor.getByName(name);
  console.log(`GET /${name} - ${status}`);
  res.status(status).json(body);
});

app.post("/", (req, res) => {
  const { name, quantity } = req.body;
  console.log(`POST / - ${name}`);
  const { status, body } = interactor.post(name, quantity);
  console.log(`POST / - ${name} ${status}`);
  res.status(status).json(body);
});

app.put("/:name", (req, res) => {
  const { name } = req.params;
  const { quantity } = req.body;
  console.log(`PUT /${name}`);
  const { status, body } = interactor.put(name, quantity);
  console.log(`PUT /${name} - ${status}`);
  res.status(status).json(body);
});

app.delete("/:name", (req, res) => {
  const { name } = req.params;
  console.log(`DELETE /${name}`);
  const { status } = interactor.delete(name);
  console.log(`GET /${name} - ${status}`);
  res.sendStatus(status);
});

const port = parseInt(APP_PORT) || 3000;
app.listen(port, () => console.log(`Starting API server on port ${port}`));
