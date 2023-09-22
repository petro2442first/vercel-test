import { Router } from "express";
import { check, validationResult } from "express-validator";
import AuthController from "../controllers/auth.controller";

const router = Router();

router.post(
  "/register",
  [
    check("email", "Incorrect email").isEmail(),
    check("password", "Min length for password is 6").isLength({
      min: 6,
    }),
  ],
  AuthController.register
);

router.post(
  "/login",
  [
    check("email", "Incorrect email").normalizeEmail().isEmail(),
    check("password", "Min length for password is 6").isLength({
      min: 6,
    }),
  ],
  AuthController.login
);

export default router;
