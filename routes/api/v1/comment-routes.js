import express from "express";
import { body } from "express-validator";

import { authMiddleware } from "../../../middlewares/auth-middleware.js";

import {
  getComments,
  getBlogComments,
  addComment,
  deleteComment,
} from "../../../controllers/comment-controllers.js";

const router = express.Router();

//* @route  GET /api/v1/comments
//* @desc   Get comments.
//* @access public
router.get("/", getComments);

//* @route  GET /api/v1/comments/blogs/:blogId/
//* @desc   Get comments of a blog.
//* @access public
router.get("/blogs/:blogId", getBlogComments);

//* @route  Post /api/v1/comments/blogs/:blogId
//* @desc   Comment on a blog.
//* @access public
router.post(
  "/blogs/:blogId",
  [
    body("name", "Name is required.").notEmpty(),
    body("email", "Email is required.").isEmail(),
    body("text", "Text is required.").notEmpty(),
  ],
  addComment
);

//* @route  DELETE /api/v1/comments/:commentId
//* @desc   Delete comment on a blog.
//* @access private
router.delete("/:commentId", authMiddleware, deleteComment);

export default router;
