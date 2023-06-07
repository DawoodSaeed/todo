require("dotenv").config();
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const _ = require("lodash");

const SECRET_KEY = process.env.SECRET_KEY;

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: true,
    minlength: 3,
    maxLength: 30,
    required: [true, "Username is a required field"],
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
      message: (props) => `${props.value} is not a valid email address!`,
    },
    required: [true, "Email is a required field"],
  },
  password: {
    type: String,
    validate: {
      validator: (password) =>
        validator.isStrongPassword(password, [
          ,
          {
            minLength: 8,
            minLowercase: 1,
            minUppercase: 1,
            minNumbers: 1,
            minSymbols: 1,
          },
        ]),
    },
    required: [true, "Password is a required field"],
  },

  tokens: [
    {
      access: {
        type: String,
        required: true,
      },
      token: {
        type: String,
        required: true,
      },
    },
  ],

  savedTodos: [
    {
      todo: {
        type: mongoose.Types.ObjectId,
        ref: "Todo",
      },
    },
  ],

  image: {
    type: String,
    default: "",
  },
});

userSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  return _.pick(userObj, ["_id", "email", "username", "savedTodos", "image"]);
};

// Find a using by given credentials
userSchema.statics.findByCredentials = function (email, username, password) {
  const User = this;

  if (!username) {
    username = "";
  } else if (!email) {
    email = "";
  }

  return User.findOne({
    $or: [
      {
        email: email,
      },
      {
        username: username,
      },
    ],
  }).then((user) => {
    if (!user) return Promise.reject("User was not found");

    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, match) => {
        if (match) {
          resolve(user);
        } else {
          reject("Password was not match");
        }
      });
    });
  });
};

// generate token for the user
userSchema.methods.generateAuthToken = function () {
  const user = this;
  const access = "auth";

  const token = jwt
    .sign({ _id: user._id.toHexString(), access }, SECRET_KEY)
    .toString();

  user.tokens = user.tokens.concat([{ access, token }]);
  return user.save().then(() => {
    return token;
  });
};

// logout functionality
userSchema.methods.removeToken = function (token) {
  return User.findByIdAndUpdate(
    this._id,
    {
      $pull: {
        tokens: { token },
      },
    },
    { new: true }
  );
};

userSchema.pre("save", function (next) {
  const user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(10, function (err, salt) {
      bcrypt.hash(user.password, salt, function (err, hash) {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// ################### For the todos ###################
userSchema.methods.removeTodo = function (todo) {
  const user = this;
  return User.findByIdAndUpdate(
    user._id,
    {
      $pull: {
        savedTodos: { todo },
      },
    },
    { new: true }
  );
};

userSchema.methods.saveTodo = function (todo) {
  const user = this;

  return user
    .removeTodo(todo)
    .then((userReturned) => {
      return User.findOneAndUpdate(
        { _id: user._id },
        {
          $push: {
            savedTodos: {
              todo,
            },
          },
        }
      );
    })
    .catch((err) => {
      throw new Error(err);
    });
};

// to remove todo;

// User Model
const User = mongoose.model("User", userSchema);
module.exports = User;
