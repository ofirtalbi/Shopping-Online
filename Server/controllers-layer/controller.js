const express = require("express");
const logic = require("../business-logic-layer/business-logic");
const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");
const jwt = require("jsonwebtoken");
const router = express.Router();

const secretKey = "topSecret";

router.get("/", async (request, response) => {
  const token = request.query.token;
  if (token !== "null") {
    const decoded = jwt.verify(token, secretKey);
    const email = decoded.email;
    const user = await logic.getUserByEmail(email);
    response.status(200).send(user);
  }
});

router.post("/admin", async (request, response) => {
  const { token } = request.body;
  const decoded = jwt.verify(token, secretKey);
  const email = decoded.email;
  const user = await logic.getUserByEmail(email);
  jwt.verify(token, secretKey, (err, verifiedJwt) => {
    if (err) {
      response.send(err.message);
    } else if (user.role === "Admin") {
      response.status(201).send({ message: "success" });
    }
  });
});

router.get("/users", async (request, response) => {
  try {
    const users = await logic.getAllUsers();
    response.json(users);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/verify", async (request, response) => {
  const { token } = request.body;
  jwt.verify(token, secretKey, (err, verifiedJwt) => {
    if (err) {
      response.send(err.message);
    } else {
      response.status(201).send({ message: "success" });
    }
  });
});

router.post("/register", async (request, response) => {
  try {
    const user = new UserModel(request.body);
    const addedUser = await logic.addUser(user);
    let payload = { email: user.email };
    const userData = await logic.getUserByEmail(user.email);
    let token = jwt.sign(payload, secretKey, { expiresIn: "10h" });
    response.status(201).send({ token, userData });
  } catch (err) {
    response.status(500).send("Registration Error");
  }
});

router.post("/login", async (request, response) => {
  let user = request.body;
  const checkExisting = await logic.checkLoginCredentials(user);
  if (checkExisting) {
    let payload = { email: user.email };
    const userData = await logic.getUserByEmail(user.email);
    let token = jwt.sign(payload, secretKey, { expiresIn: "10h" });
    response.status(201).send({ token, userData });
  } else {
    response.status(500).send("Invalid email or password");
  }
});

router.get("/products", async (request, response) => {
  try {
    const items = await logic.getAllProducts();
    response.json(items);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/addProduct", async (request, response) => {
  try {
    const product = new ProductModel(request.body);
    console.log(product);
    const errors = product.validateSync();
    if (errors) {
      response.status(400).send(errors);
      return;
    }

    const addedProduct = await logic.addProduct(product);
    response.status(201).json(addedProduct);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

router.post("/editProduct", async (request, response) => {
  try {
    const oldProduct = request.body.product;
    const newProduct = new ProductModel(request.body.update);
    console.log(oldProduct, newProduct);
    await logic.editProduct(oldProduct, newProduct);
    response.status(200).json({ message: "Product Edited" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

router.post("/addShipment", async (request, response) => {
  try {
    const shipment = request.body;

    const result = await UserModel.findOneAndUpdate(
      { email: shipment.email },
      { $push: { shipments: shipment.date } }
    );
    response.status(200).json({ message: "Shipment Added" });
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});

router.post("/checkAvailability", async (request, response) => {
  let credentials = request.body;
  const check = await logic.checkAvailability(credentials);
  if (!check) {
    response.status(201).json({ message: "Success" });
  } else {
    response.status(500).json({ message: "Email or ID already in use" });
  }
});

router.delete("/products/:_id", async (request, response) => {
  try {
    const _id = request.params._id;
    await logic.deleteProduct(_id);
    response.sendStatus(204);
  } catch (err) {
    response.status(500).send(err.message);
  }
});

module.exports = router;
