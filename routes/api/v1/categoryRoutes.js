const express = require("express");
const { body } = require("express-validator");

const authMiddleware = require("../../../middlewares/authMiddleware");
const categoryControllers = require("../../../controllers/categoryController");

const router = express.Router();

router.get("/", categoryControllers.getCategories);
router.post(
  "/",
  authMiddleware,
  [body("category", "Category is required.").notEmpty()],
  categoryControllers.addCategory
);
router.delete(
  "/:categoryId",
  authMiddleware,
  categoryControllers.deleteCategory
);
router.get("/:categoryId/blogs", categoryControllers.getCategoryBlogs);

module.exports = router;
