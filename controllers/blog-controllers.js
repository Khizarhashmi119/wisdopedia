const { validationResult } = require("express-validator");
const fs = require("fs");

const Blog = require("../models/Blog");
const Comment = require("../models/Comment");

// @route  GET /api/v1/blogs
// @desc   Get blogs.
// @access public
const getBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({})
      .sort({ createdAt: -1 })
      .populate("admin", ["firstName", "middleName", "lastName"])
      .populate("categories");

    return res.status(200).json(blogs);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  GET /api/v1/blogs/:blogId
// @desc   Get blog.
// @access public
const getBlog = async (req, res) => {
  const { blogId } = req.params;

  try {
    const blog = await Blog.findById(blogId)
      .sort({ createdAt: -1 })
      .populate("admin", ["firstName", "middleName", "lastName"])
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

// @route  POST /api/v1/blogs
// @desc   Add blog.
// @access private
const addBlog = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { id } = req.admin;
  const { title, description, body, author, categories } = req.body;
  const { filename } = req.file;

  try {
    // Create new blog.
    const newBlog = new Blog({
      admin: id,
      title,
      description,
      body,
      author,
      categories: categories.split(",").map((catogoryId) => catogoryId.trim()),
      imageName: filename,
    });

    // Save blog to database.
    await newBlog.save();

    return res.status(200).json(newBlog);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  DELETE /api/v1/blogs/:blogId
// @desc   Delete blog.
// @access private
const deleteBlog = async (req, res) => {
  const { blogId } = req.params;
  const { id: adminId } = req.admin;

  try {
    // Delete Blog.
    const blog = await Blog.findById(blogId);
    const imagePath = `./uploads/${blog.imageName}`;

    if (blog.admin.toString() !== adminId) {
      return res
        .status(200)
        .json({ errors: [{ msg: "Admin not authorised." }] });
    }

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    await Comment.deleteMany({ blog: blogId });
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

// @route  Put /api/v1/blogs/:blogId
// @desc   Update blog.
// @access private
const updateBlog = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { blogId } = req.params;
  const { id: adminId } = req.admin;

  const { title, description, body, author, categories } = req.body;

  try {
    const blog = await Blog.findById(blogId);

    if (blog.admin.toString() !== adminId) {
      return res
        .status(200)
        .json({ errors: [{ msg: "Admin not authorised." }] });
    }

    if (req.file) {
      const { filename: imageName } = req.file;
      const blog = await Blog.findById(blogId);
      const imagePath = `./uploads/${blog.imageName}`;

      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }

      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          $set: {
            title,
            description,
            body,
            author,
            categories: categories
              .split(",")
              .map((catogoryId) => catogoryId.trim()),
            imageName,
          },
        },
        {
          new: true,
        }
      ).populate("categories");

      return res.status(200).json(updatedBlog);
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      blogId,
      {
        $set: {
          title,
          description,
          body,
          author,
          categories: categories
            .split(",")
            .map((catogoryId) => catogoryId.trim()),
        },
      },
      {
        new: true,
      }
    ).populate("categories");

    return res.status(200).json(updatedBlog);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

module.exports = {
  getBlogs,
  getBlog,
  addBlog,
  deleteBlog,
  updateBlog,
};
