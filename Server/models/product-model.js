const mongoose = require("mongoose");

const ProductSchema = mongoose.Schema(
  {
    productName: String,
    category: String,
    price: String,
    picture: String,
  },
  { versionKey: false }
);

const ProductModel = mongoose.model("ProductModel", ProductSchema, "products");

module.exports = ProductModel;
