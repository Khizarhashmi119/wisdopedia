import mongoose from "mongoose";

import { commentSchema } from "./Comment.js";

const { ObjectId } = mongoose.Schema.Types;

const blogSchema = new mongoose.Schema(
  {
    user: {
      type: ObjectId,
      ref: "Admin",
      required: true,
    },
    categories: [
      {
        type: ObjectId,
        ref: "Category",
      },
    ],
    image: {
      type: String,
    },
    title: {
      type: String,
      required: true,
      maxlength: 32,
      trim: true,
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
    author: {
      type: String,
      required: true,
      trim: true,
      maxlength: 32,
    },
  },
  { timestamps: true }
);

const Blog = mongoose.model("Blog", blogSchema);

export default Blog;
