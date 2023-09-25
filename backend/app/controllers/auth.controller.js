import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import config from "../config/auth.config.js";

export default class AuthController {
  static async register(req, res) {
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

  static async login(req, res) {
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
}
