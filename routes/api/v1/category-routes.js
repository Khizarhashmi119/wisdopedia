const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../../../middlewares/auth-middleware");
const categoryControllers = require("../../../controllers/category-controller");

const router = express.Router();

// @route  GET /api/v1/categories
// @desc   Get categories.
// @access public
router.get("/", categoryControllers.getCategories);

// @route  POST /api/v1/categories
// @desc   Add category.
// @access private
router.post(
  "/",
  authMiddleware,
  [body("category", "Category is required.").notEmpty()],
  categoryControllers.addCategory
);

// @route  DELETE /api/v1/categories/:categoryId
// @desc   Delete category.
// @access private
router.delete(
  "/:categoryId",
  authMiddleware,
  categoryControllers.deleteCategory
);

// @route  GET /api/v1/categories/:categoryId/blogs
// @desc   Get blogs of specific category.
// @access public
router.get("/:categoryId/blogs", categoryControllers.getCategoryBlogs);

module.exports = router;
