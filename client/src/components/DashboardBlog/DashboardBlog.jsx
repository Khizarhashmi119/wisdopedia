import { useHistory } from "react-router-dom";

import "./DashboardBlog.css";

const DashboardBlog = ({ blog: { id, title }, index }) => {
  const { push } = useHistory();

  const handleClick1 = () => {
    push(`/blogs/${id}/update`);
  };

  const handleClick3 = () => {
    push(`/blogs/${id}`);
  };

  return (
    <li className="dashboard-blog">
      <div className="dashboard-blog-title" onClick={handleClick3}>
        <span className="counter">{index + 1}.</span>
        {title}
      </div>
      <div className="dashboard-blog-btns">
        <button className="dashboard-delete-blog-btn">
          <i className="fas fa-trash"></i>
        </button>
        <button className="dashboard-update-blog-btn" onClick={handleClick1}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
    </li>
  );
};

export default DashboardBlog;
