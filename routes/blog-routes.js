import express from "express";
import { body } from "express-validator";

import { authMiddleware } from "../middlewares/auth-middleware.js";
import {
  getBlogs,
  addBlog,
  deleteBlog,
  updateBlog,
  addComment,
  deleteComment,
} from "../controllers/blog-controllers.js";

const router = express.Router();

//* @route  GET /api/blogs
//* @desc   Get blogs.
//* @access public
router.get("/", getBlogs);

//* @route  POST /api/blogs
//* @desc   Add blog.
//* @access private
router.post(
  "/",
  [
    authMiddleware,
    [
      body("title", "Title is required.").notEmpty(),
      body("body", "Body is required.").notEmpty(),
      body("author", "Author is required.").notEmpty(),
    ],
  ],
  addBlog
);

//* @route  DELETE /api/blogs/:blogId
//* @desc   Delete blog.
//* @access private
router.delete("/:blogId", authMiddleware, deleteBlog);

//* @route  Put /api/blogs/:blogId
//* @desc   Update blog.
//* @access private
router.put(
  "/:blogId",
  [
    authMiddleware,
    [
      body("title", "Title is required.").notEmpty(),
      body("body", "Body is required.").notEmpty(),
      body("author", "Author is required.").notEmpty(),
    ],
  ],
  updateBlog
);

//* @route  Put /api/blogs/:blogId/comment
//* @desc   Comment on a blog.
//* @access public
router.put(
  "/:blogId/comment",
  [
    body("name", "Name is required.").notEmpty(),
    body("email", "Email is required.").isEmail(),
    body("text", "Text is required.").notEmpty(),
  ],
  addComment
);

//* @route  DELETE /api/blogs/:blogId/comment/:commentId
//* @desc   Delete comment on a blog.
//* @access private
router.delete("/:blogId/comment/:commentId", authMiddleware, deleteComment);

export default router;
