import BlogPreview from "../BlogPreview/BlogPreview";

import "./BlogsPreviewList.css";

const BlogsPreviewList = ({ blogs }) => {
  return (
    <div className="blogs-preview-list">
      {blogs.map((blog) => (
        <BlogPreview key={blog._id} blog={blog} />
      ))}
    </div>
  );
};

export default BlogsPreviewList;
