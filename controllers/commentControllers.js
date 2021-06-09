const { validationResult } = require("express-validator");
const gravatar = require("gravatar");

const Comment = require("../models/Comment");

// @route  Get /api/v1/comments
// @desc   Get comments.
// @access public
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find()
      .sort({ createdAt: -1 })
      .populate("blog", ["_id", "title"]);
    return res.status(200).json(comments);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  Get /api/v1/comments/blogs/:blogId
// @desc   Get comments of a blog.
// @access public
const getBlogComments = async (req, res) => {
  const { blogId: blog } = req.params;

  try {
    const comments = await Comment.find({ blog }).sort({ createdAt: -1 });
    return res.status(200).json(comments);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  Post /api/v1/comments/blogs/:blogId
// @desc   Comment on a blog.
// @access public
const addComment = async (req, res) => {
  // Check validation errors.
  const errs = validationResult(req);

  if (!errs.isEmpty()) {
    return res.status(400).json({ errors: errs.array() });
  }

  const { blogId: blog } = req.params;
  const { name, email, text } = req.body;

  const avatar = gravatar.url(email, {
    s: "200",
    r: "pg",
    d: "mm",
  });

  const comment = new Comment({
    blog,
    name,
    email,
    text,
    avatar,
  });

  try {
    await comment.save();
    return res.status(200).json(comment);
  } catch (err) {
    console.error(err.message);
    return res
      .status(500)
      .json({ errors: [{ msg: "Internal server error." }] });
  }
};

// @route  DELETE /api/v1/comments/:commentId
// @desc   Delete comment on a blog.
// @access private
const deleteComment = async (req, res) => {
  const { commentId: _id } = req.params;

  try {
    await Comment.findOneAndRemove({ _id });
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

module.exports = {
  getComments,
  getBlogComments,
  addComment,
  deleteComment,
};
