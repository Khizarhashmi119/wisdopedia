import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { deleteBlogAction } from "../../redux/actions/blogsActions";

import "./DashboardBlog.css";

const DashboardBlog = ({ blog: { _id, title }, index }) => {
  const { push } = useHistory();
  const dispatch = useDispatch();

  const handleClick1 = (e) => {
    e.stopPropagation();
    push(`/blogs/${_id}/update`);
  };

  const handleClick2 = (e) => {
    e.stopPropagation();
    const answer = window.confirm(
      "Do you want to permanently delete this blog ?"
    );
    answer && dispatch(deleteBlogAction(_id));
  };

  const handleClick3 = () => {
    push(`/blogs/${_id}`);
  };

  return (
    <li className="dashboard-blog" onClick={handleClick3}>
      <div className="dashboard-blog-title">
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

export default DashboardBlog;
