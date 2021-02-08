import React from "react";

import Comment from "../Comment/Comment";

import "./CommentList.css";

const CommentList = ({ comments }) => {
  return (
    <div className="comments">
      {comments.map(({ _id, ...otherProps }) => (
        <Comment key={_id} id={_id} {...otherProps} />
      ))}
    </div>
  );
};

export default CommentList;
