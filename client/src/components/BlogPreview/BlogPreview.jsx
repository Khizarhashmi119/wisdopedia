import { useHistory } from "react-router-dom";

import "./BlogPreview.css";

const BlogPreview = ({ blog: { title, description, slug, imageName } }) => {
  const { push } = useHistory();

  const baseURL =
    process.env.NODE_ENV === "production"
      ? "/api/v1"
      : "http://localhost:5000/api/v1";

  return (
    <div className="blog-preview" onClick={() => push(`/blogs/${slug}`)}>
      <div
        className="bg-img"
        style={{ backgroundImage: `url('${baseURL}/${imageName}')` }}
      ></div>
      <div className="bg-transparent"></div>
      <div className="blog-preview-body">
        <h2 className="blog-preview-title">{title}</h2>
        <p className="blog-preview-description">{description.slice(0, 150)}</p>
      </div>
    </div>
  );
};

export default BlogPreview;
