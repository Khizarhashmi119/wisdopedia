import { validationResult } from "express-validator";

import Blog from "../models/Blog.js";

//* @route  GET /api/v1/blogs
//* @desc   Get blogs.
//* @access public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate("user", ["firstName", "middleName", "lastName"])
      .populate("categories");

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

//* @route  GET /api/v1/blogs/:blogId
//* @desc   Get blog.
//* @access public
const getBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId)
      .sort({ createdAt: -1 })
      .populate("user", ["firstName", "middleName", "lastName"])
      .populate("categories");

    if (!blog) {
      return res.status(404).json({ errors: [{ msg: "No blog found." }] });
    }

    return res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

//* @route  POST /api/v1/blogs
//* @desc   Add blog.
//* @access private
const addBlog = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { id } = req.user;
  const { title, description, body, author, categories } = req.body;

  try {
    //* Create new blog.
    const newBlog = new Blog({
      user: id,
      title,
      description,
      body,
      author,
      categories: categories.split(",").map((catogoryId) => catogoryId.trim()),
    });

    //* Save blog to database.
    await newBlog.save();

    return res.status(200).json(newBlog);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

//* @route  DELETE /api/v1/blogs/:blogId
//* @desc   Delete blog.
//* @access private
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const { id: userId } = req.user;

  try {
    //* Delete Blog.
    const blog = await Blog.findById(blogId);

    if (blog.user.toString() !== userId) {
      return res
        .status(200)
        .json({ errors: [{ msg: "User not authorised." }] });
    }

    await blog.remove();

    return res
      .status(200)
      .json({ messages: [{ msg: "Blog has been deleted." }] });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

//* @route  Put /api/v1/blogs/:blogId
//* @desc   Update blog.
//* @access private
const updateBlog = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { blogId } = req.params;
  const { id: userId } = req.user;

  const { title, description, body, author, categories } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (blog.user.toString() !== userId) {
      return res
        .status(200)
        .json({ errors: [{ msg: "User not authorised." }] });
    }

    await blog.updateOne({
      title,
      description,
      body,
      author,
      categories: categories.split(",").map((catogoryId) => catogoryId.trim()),
    });

    return res.status(200).json(blog);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

export { getBlogs, getBlog, addBlog, deleteBlog, updateBlog };
