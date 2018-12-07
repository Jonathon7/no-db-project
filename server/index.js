const express = require("express");
const { json } = require("body-parser");
const cors = require("cors");
const controller = require("./controllers/controller");

const app = express();

app.use(json());
app.use(cors());

app.get("/api/exoplanets/", controller.read);
app.post("/api/exoplanets", controller.create);
app.delete("/api/exoplanets/:id", controller.deleted);
app.put("/api/exoplanets/:id", controller.update);

const port = 3002;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
