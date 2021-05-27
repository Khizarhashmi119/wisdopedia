import express from "express";
import { body } from "express-validator";

import {
  subscribeNewsLetter,
  unsubscribeNewsLetter,
} from "../../../controllers/news-letter-controllers.js";

const router = express.Router();

router.post(
  "/subscribe",
  [body("email", "Please enter valid email.").isEmail()],
  subscribeNewsLetter
);
router.post(
  "/unsubscribe",
  [body("email", "Please enter valid email.").isEmail()],
  unsubscribeNewsLetter
);

export default router;
