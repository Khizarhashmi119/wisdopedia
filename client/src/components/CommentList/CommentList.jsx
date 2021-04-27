import React from "react";

import Comment from "../Comment/Comment";

import "./CommentList.css";

const CommentList = ({ comments }) => {
  return (
    <div className="comments">
      {comments.length !== 0 ? (
        comments.map((comment) => (
          <Comment key={comment._id} comment={comment} />
        ))
      ) : (
        <h2 className="message">No comment yet.</h2>
      )}
    </div>
  );
};

export default CommentList;
