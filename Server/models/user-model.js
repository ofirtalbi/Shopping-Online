const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    _id: String,
    email: String,
    password: String,
    city: String,
    street: String,
    name: String,
    lastName: String,
    role: String,
    shipments: Array,
  },
  { versionKey: false }
);

const UserModel = mongoose.model("UserModel", UserSchema, "users");

module.exports = UserModel;
