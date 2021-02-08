import { validationResult } from "express-validator";
import gravatar from "gravatar";

import Blog from "../models/Blog.js";
import Comment from "../models/Comment.js";

//* @route  GET /api/blogs
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

//* @route  POST /api/blogs
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

//* @route  DELETE /api/blogs/:blogId
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

//* @route  Put /api/blogs/:blogId
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

//* @route  Put /api/blogs/:blogId/comment
//* @desc   Comment on a blog.
//* @access public
const addComment = async (req, res) => {
  //* Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { blogId } = req.params;
  const { name, email, text } = req.body;

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  const comment = new Comment({
    name,
    email,
    text,
    avatar,
  });

  try {
    const blog = await Blog.findById(blogId);
    blog.comments.unshift(comment);
    await blog.save();

    return res.status(200).json(comment);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

//* @route  DELETE /api/blogs/:blogId/comment/:commentId
//* @desc   Delete comment on a blog.
//* @access private
const deleteComment = async (req, res) => {
  const { blogId, commentId } = req.params;

  try {
    const blog = await Blog.findById(blogId);
    const removeIndex = blog.comments.map(({ _id }) => _id).indexOf(commentId);
    blog.comments.splice(removeIndex, 1);
    await blog.save();

    return res
      .status(200)
      .json({ messages: [{ msg: "Comment has been deleted." }] });
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

export { getBlogs, addBlog, deleteBlog, updateBlog, addComment, deleteComment };
