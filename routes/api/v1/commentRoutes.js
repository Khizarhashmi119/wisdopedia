const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../../../middlewares/authMiddleware");

const commentControllers = require("../../../controllers/commentControllers");

const router = express.Router();

router.get("/", commentControllers.getComments);
router.get("/blogs/:slug", commentControllers.getBlogComments);
router.post(
  "/blogs/:blogId",
  [
    body("name", "Name is required.").notEmpty(),
    body("email", "Email is required.").isEmail(),
    body("text", "Text is required.").notEmpty(),
  ],
  commentControllers.addComment
);
router.delete("/:commentId", authMiddleware, commentControllers.deleteComment);

module.exports = router;
