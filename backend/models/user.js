// models/user.js
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs"); // importing bcrypt
const NotFoundError = require("../utils/errors/NotFoundError");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    require: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(v) {
        return validator.isEmail(v);
      },
      message: "Invalid Email",
    },
  },
  password: {
    type: String,
    minlength: 2,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password,
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        throw new NotFoundError("Incorrect email or password");
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new NotFoundError("Incorrect email or password");
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
