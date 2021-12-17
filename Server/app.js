global.config = require(process.env.NODE_ENV === "production"
  ? "./config-prod.json"
  : "./config-dev.json");
const express = require("express");
const cors = require("cors");
const controller = require("./controllers-layer/controller");
const server = express();

server.use(cors());
server.use(express.json());
server.use("/api/users", controller);

server.listen(3000, () => console.log("Listening..."));
