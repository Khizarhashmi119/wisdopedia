import { validationResult } from "express-validator";

import Category from "../models/Category.js";
import Blog from "../models/Blog.js";

// @route  GET /api/v1/categories
// @desc   Get categories.
// @access public
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    if (categories.length === 0) {
      return res.status(404).json({ errors: [{ msg: "No category found." }] });
    }

    return res.status(200).json(categories);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  POST /api/v1/categories
// @desc   Add category.
// @access private
const addCategory = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { category: name } = req.body;

  try {
    const category = new Category({
      name,
    });

    await category.save();

    return res.status(200).json(category);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  DELETE /api/v1/categories/:categoryId
// @desc   Delete category.
// @access private
const deleteCategory = async (req, res) => {
  const { categoryId } = req.params;

  try {
    await Category.findByIdAndRemove(categoryId);

    return res
      .status(200)
      .json({ messages: [{ msg: "Category has been deleted." }] });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  GET /api/v1/categories/:categoryId/blogs
// @desc   Get blogs of specific category.
// @access public
const getCategoryBlogs = async (req, res) => {
  const { categoryId } = req.params;

  try {
    const blogs = await Blog.find({ categories: categoryId });

    if (blogs.length === 0) {
      return res.status(404).json({ errors: [{ msg: "No blog found." }] });
    }

    return res.status(200).json(blogs);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

export { getCategories, addCategory, deleteCategory, getCategoryBlogs };
