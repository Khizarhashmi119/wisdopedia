import { useHistory } from "react-router-dom";

import "./BlogPreview.css";

const BlogPreview = ({ blog: { _id, title, description, imageName } }) => {
  const { push } = useHistory();

  return (
    <div className="blog-preview" onClick={() => push(`/blogs/${_id}`)}>
      <div
        className="bg-img"
        style={{ backgroundImage: `url('/uploads/${imageName}')` }}
      ></div>
      <div className="bg-transparent"></div>
      <div className="blog-preview-body">
        <h2 className="blog-preview-title">{title}</h2>
        <p className="blog-preview-description">
          {description.slice(0, 200)} ...
        </p>
      </div>
    </div>
  );
};

export default BlogPreview;
