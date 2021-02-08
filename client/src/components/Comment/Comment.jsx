import React from "react";

import "./Comment.css";

const Comment = ({ avatar, name, text, createdAt }) => {
  return (
    <div className="comment">
      <div className="comment-profile-image-container">
        <img className="comment-profile-image" src={avatar} alt="profile" />
      </div>
      <div className="comment-content">
        <h4 className="comment-profile-name">Name: {name}</h4>
        <p className="comment-text">{text}</p>
        <small>Date: {createdAt}</small>
      </div>
    </div>
  );
};

export default Comment;
