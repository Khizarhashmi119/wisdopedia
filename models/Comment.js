import mongoose from "mongoose";

const { ObjectId } = mongoose.Types;

const commentSchema = new mongoose.Schema(
  {
    blog: {
      type: ObjectId,
      ref: "Blog",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

export { commentSchema };
