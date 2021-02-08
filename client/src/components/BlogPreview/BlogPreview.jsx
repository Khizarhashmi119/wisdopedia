import React from "react";
import { withRouter } from "react-router-dom";

import "./BlogPreview.css";

const BlogPreview = ({ id, title, description, history }) => {
  return (
    <div className="blog-preview" onClick={() => history.push(`/blogs/${id}`)}>
      <div
        className="bg-img"
        style={{ backgroundImage: "url('/images/blog.jpg')" }}
      ></div>
      <div className="bg-transparent"></div>
      <div className="blog-preview-body">
        <h2 className="blog-preview-title">{title}</h2>
        <p className="blog-preview-description">{description}</p>
      </div>
    </div>
  );
};

export default withRouter(BlogPreview);
