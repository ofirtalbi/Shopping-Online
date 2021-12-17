require("../data-access-layer/dal");
const ProductModel = require("../models/product-model");
const UserModel = require("../models/user-model");

function getAllUsers() {
  return UserModel.find().exec();
}

function getAllProducts() {
  return ProductModel.find().exec();
}

function checkLoginCredentials(user) {
  return UserModel.findOne({ email: user.email, password: user.password });
}

function addProduct(product) {
  return product.save();
}
function addUser(user) {
  return user.save();
}

function getUserByEmail(email) {
  return UserModel.findOne({ email: email });
}

function checkAvailability(user) {
  return UserModel.findOne({
    $or: [{ email: user.email }, { _id: user._id }],
  });
}

function editProduct(oldP, newP) {
  ProductModel.findOne({
    productName: oldP.productName,
    category: oldP.category,
  }).remove();
  return newP.save();
}

module.exports = {
  getAllUsers,
  getAllProducts,
  checkLoginCredentials,
  addProduct,
  addUser,
  editProduct,
  getUserByEmail,
  checkAvailability,
};
