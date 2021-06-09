const express = require("express");
const { body } = require("express-validator");

const newsLetterControllers = require("../../../controllers/newsLetterControllers");

const router = express.Router();

router.post(
  "/subscribe",
  [body("email", "Please enter valid email.").isEmail()],
  newsLetterControllers.subscribeNewsLetter
);
router.post(
  "/unsubscribe",
  [body("email", "Please enter valid email.").isEmail()],
  newsLetterControllers.unsubscribeNewsLetter
);

module.exports = router;
