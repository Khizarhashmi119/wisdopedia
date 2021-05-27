import express from "express";
import { body } from "express-validator";

import { authMiddleware } from "../../../middlewares/auth-middleware.js";
import {
  getCategories,
  addCategory,
  deleteCategory,
  getCategoryBlogs,
} from "../../../controllers/category-controller.js";

const router = express.Router();

// @route  GET /api/v1/categories
// @desc   Get categories.
// @access public
router.get("/", getCategories);

// @route  POST /api/v1/categories
// @desc   Add category.
// @access private
router.post(
  "/",
  authMiddleware,
  [body("category", "Category is required.").notEmpty()],
  addCategory
);

// @route  DELETE /api/v1/categories/:categoryId
// @desc   Delete category.
// @access private
router.delete("/:categoryId", authMiddleware, deleteCategory);

// @route  GET /api/v1/categories/:categoryId/blogs
// @desc   Get blogs of specific category.
// @access public
router.get("/:categoryId/blogs", getCategoryBlogs);

export default router;
