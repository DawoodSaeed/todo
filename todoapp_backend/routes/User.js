const express = require("express");
const _ = require("lodash");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const User = require("../models/User");
const passport = require("passport");
const router = express.Router();
const multer = require("multer");
const path = require("path");

// Configure multer storage
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const originalExtension = path.extname(file.originalname);
    const filename = `${uniqueSuffix}${originalExtension}`;
    cb(null, filename);
  },
});
const upload = multer({ storage });

// Register The user;
router.post("/", async (req, res) => {
  const body = _.pick(req.body, [
    "username",
    "email",
    "password",
    "confrimPassword",
  ]);

  // Defining the schema for the response
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),

    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .required(),
    confrimPassword: Joi.ref("password"),

    email: Joi.string()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ["com", "net"] },
      })
      .required(),
  });

  // Validating the response

  try {
    const value = await schema.validateAsync(body);
    const user = new User(body);
    const savedUser = await user.save();
    const token = await savedUser.generateAuthToken();

    res.header("authorization", token).json({
      user: savedUser,
      token,
    });

    console.log(token);
  } catch (ex) {
    const regex = /password/i;
    const emailError = /email/i;
    const userError = /username/i;
    if (regex.test(ex.message)) {
      res
        .status(400)
        .json(
          "Password not correct (minLength: 8,minLowercase: 1,minUppercase: 1,minNumbers: 1, minSymbols: 1)"
        );
      return;
    } else if (emailError.test(ex.message)) {
      res.status(400).json("Email already exists or not valid");
      return;
    } else if (userError.test(ex.message)) {
      res
        .status(400)
        .json(
          "Username already exists or not valid (minlength: 3,maxLength: 30) "
        );
      return;
    }
    res.status(400).json(ex.message);
    console.log(ex.message);
  }
});

// Login User
router.post("/login", async (req, res) => {
  const body = _.pick(req.body, ["username", "email", "password"]);
  const schema = Joi.object({
    username: Joi.string().min(3).max(30),

    password: Joi.string()
      .pattern(
        new RegExp(
          "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
        )
      )
      .required(),

    email: Joi.string().email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "net"] },
    }),
  })
    .with("username", "password")
    .xor("username", "email")
    .with("email", "password");

  if (!body.username && !body.email) {
    return res.status(401).json({ message: "username or email must be given" });
  }

  try {
    const value = await schema.validateAsync(body);
    const user = await User.findByCredentials(
      body.email,
      body.username,
      body.password
    );

    const token = await user.generateAuthToken();
    res.header("authorization", token).json({ user, token });
  } catch (ex) {
    const regex = /password/i;
    const userError = /email/i;
    if (regex.test(ex.message)) {
      res.status(400).json("Password not correct");
      return;
    } else if (userError.test(ex.message)) {
      res.status(400).json("Email not correct");
      return;
    }
    res.status(400).json("Check your email address");
  }
});

// Logout the user;
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  async (req, res) => {
    try {
      await req.user.removeToken(req.headers["authorization"].split(" ")[1]);
      return res.status(200).json({ message: "User logout successfully" });
    } catch (ex) {
      return res
        .status(400)
        .send({ message: "Something went wrong", error: ex.message });
    }
  }
);

router.patch("/:id", upload.single("image"), async (req, res) => {
  const { id } = req.params;
  const imagePath = req.file ? req.file.path : "";

  try {
    // Find the user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json("User not found");
    }

    // Update the user's image path
    user.image = imagePath;

    // Save the updated user
    const updatedUser = await user.save();

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json("Error Updating User");
  }
});

module.exports = router;
