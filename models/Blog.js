const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
  {
    admin: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    title: {
      type: String,
      required: true,
      maxlength: 200,
      trim: true,
    },
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    body: {
      type: String,
      required: true,
      trim: true,
    },
    categories: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],
    tags: {
      type: [String],
    },
    slug: {
      type: String,
      required: true,
      trim: true,
    },
    imageName: {
      type: String,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
