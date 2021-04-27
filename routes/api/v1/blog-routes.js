import express from "express";
import { body } from "express-validator";

import { authMiddleware } from "../../../middlewares/auth-middleware.js";
import {
  getBlogs,
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
} from "../../../controllers/blog-controllers.js";

const router = express.Router();

//* @route  GET /api/v1/blogs
//* @desc   Get blogs.
//* @access public
router.get("/", getBlogs);

//* @route  GET /api/v1/blogs/:blogId
//* @desc   Get blog.
//* @access public
router.get("/:blogId", getBlog);

//* @route  POST /api/v1/blogs
//* @desc   Add blog.
//* @access private
router.post(
  "/",
  authMiddleware,
  [
    body("title", "Title is required.").notEmpty(),
    body("body", "Body is required.").notEmpty(),
    body("author", "Author is required.").notEmpty(),
  ],
  addBlog
);

//* @route  DELETE /api/v1/blogs/:blogId
//* @desc   Delete blog.
//* @access private
router.delete("/:blogId", authMiddleware, deleteBlog);

//* @route  Put /api/v1/blogs/:blogId
//* @desc   Update blog.
//* @access private
router.put(
  "/:blogId",
  authMiddleware,
  [
    body("title", "Title is required.").notEmpty(),
    body("body", "Body is required.").notEmpty(),
    body("author", "Author is required.").notEmpty(),
  ],
  updateBlog
);

export default router;
