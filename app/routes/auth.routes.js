const { Router } = require("express");
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const { check, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
export const AuthRouter = Router();

AuthRouter.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Min length for password is 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      console.log(req.body);
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect registration data",
        });
      }

      const { name, lastname, email, password } = req.body;

      const candidate = await User.findOne({ email });

      if (candidate) {
        return res.status(400).json({ message: "This user is already exists" });
      }

      const hashedPassword = (await bcrypt.hash(password, 12)).toString();
      const user = new User({
        name,
        lastname,
        email,
        password: hashedPassword,
      });
      await user.save();

      res.status(201).json({ message: "User has been created" });
    } catch (e) {
      res.status(500).json({
        message: `Something went wrong, please, try again..
          ${e.message}`,
      });
    }
  }
);

AuthRouter.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Min length for password is 6").isLength({
      min: 6,
    }),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);

      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Incorrect login data",
        });
      }

      const { email, password } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: "User not found" });
      }

      const isMatch = bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ message: "Incorrect password or email, please, try again" });
      }
      const token = jwt.sign(
        {
          userId: user.id,
        },
        config.jwtSecret,
        {
          expiresIn: "1h",
        }
      );
      res.json({ token, userId: user.id, testMessage: "User authenticated!" });
    } catch (e) {
      res
        .status(500)
        .json({ message: "Something went wrong, please, try again.." });
    }
  }
);
