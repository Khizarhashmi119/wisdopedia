const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../../../middlewares/auth-middleware");

const commentControllers = require("../../../controllers/comment-controllers");

const router = express.Router();

// @route  GET /api/v1/comments
// @desc   Get comments.
// @access public
router.get("/", commentControllers.getComments);

// @route  GET /api/v1/comments/blogs/:blogId/
// @desc   Get comments of a blog.
// @access public
router.get("/blogs/:blogId", commentControllers.getBlogComments);

// @route  Post /api/v1/comments/blogs/:blogId
// @desc   Comment on a blog.
// @access public
router.post(
  "/blogs/:blogId",
  [
    body("name", "Name is required.").notEmpty(),
    body("email", "Email is required.").isEmail(),
    body("text", "Text is required.").notEmpty(),
  ],
  commentControllers.addComment
);

// @route  DELETE /api/v1/comments/:commentId
// @desc   Delete comment on a blog.
// @access private
router.delete("/:commentId", authMiddleware, commentControllers.deleteComment);

module.exports = router;
