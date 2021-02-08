import React from "react";

import BlogPreview from "../BlogPreview/BlogPreview";

import "./BlogsPreviewList.css";

const BlogsPreviewList = ({ blogs }) => {
  return (
    <div className="blogs-preview-list">
      {blogs.map((blog) => (
        <BlogPreview
          key={blog._id}
          id={blog._id}
          title={blog.title}
          description={blog.description}
        />
      ))}
    </div>
  );
};

export default BlogsPreviewList;
