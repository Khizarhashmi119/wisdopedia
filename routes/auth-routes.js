import express from "express";
import { body } from "express-validator";

import { signin } from "../controllers/auth-controllers.js";

const router = express.Router();

router.post(
  "/signin",
  [
    body("email", "Please enter valid email.").isEmail(),
    body("password", "Please enter password.").notEmpty(),
  ],
  signin
);

export default router;
