import React from "react";
import { withRouter } from "react-router-dom";
// import { useDispatch } from "react-redux";

// import { deleteBlogAction } from "../../store/actions/BlogsActions";

import "./DashboardBlog.css";

const DashboardBlog = ({ history, id, title, index }) => {
  // const dispatch = useDispatch();

  const handleClick1 = () => {
    history.push(`/edit-blog/${id}`);
  };

  const handleClick2 = () => {
    // dispatch(deleteBlogAction(id));
  };

  const handleClick3 = () => {
    history.push(`/blogs/${id}`);
  };

  return (
    <li className="dashboard-blog">
      <div className="dashboard-blog-title" onClick={handleClick3}>
        <span className="counter">{index + 1}.</span>
        {title}
      </div>
      <div className="dashboard-blog-btns">
        <button className="dashboard-delete-blog-btn" onClick={handleClick2}>
          <i className="fas fa-trash"></i>
        </button>
        <button className="dashboard-update-blog-btn" onClick={handleClick1}>
          <i className="fas fa-pencil-alt"></i>
        </button>
      </div>
    </li>
  );
};

export default withRouter(DashboardBlog);
