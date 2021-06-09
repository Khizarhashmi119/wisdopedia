const express = require("express");
const { body } = require("express-validator");

const authControllers = require("../../../controllers/authControllers");

const router = express.Router();

router.post(
  "/signin",
  [
    body("email", "Please enter valid email.").isEmail(),
    body("password", "Please enter password.").notEmpty(),
  ],
  authControllers.signin
);

module.exports = router;
