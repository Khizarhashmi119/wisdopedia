import { useHistory } from "react-router-dom";

import "./BlogPreview.css";

const BlogPreview = ({ blog: { _id, title, description, imageName } }) => {
  const { push } = useHistory();

  const baseURL =
    process.env.NODE_ENV === "production" ? "" : "http://localhost:5000";

  return (
    <div className="blog-preview" onClick={() => push(`/blogs/${_id}`)}>
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
