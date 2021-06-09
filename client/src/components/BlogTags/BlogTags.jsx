import BlogTag from "../BlogTag/BlogTag";

import "./BlogTags.css";

const BlogTags = ({ tags }) => {
  return (
    <div className="blog-tags">
      {tags.map((tag, idx) => (
        <BlogTag key={idx} tag={tag} />
      ))}
    </div>
  );
};

export default BlogTags;
