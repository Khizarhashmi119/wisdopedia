import { useDispatch } from "react-redux";
import { deleteCommentAction } from "../../store/actions/commentsActions";

import "./DashboardComment.css";

const DashboardComment = ({ comment: { _id, text, name, email } }) => {
  const dispatch = useDispatch();

  const handleClick = () => {
    const answer = window.confirm(
      "Do you want to permanently delete this comment ?"
    );

    if (answer) {
      dispatch(deleteCommentAction(_id));
    }
  };

  return (
    <li className="dashboard-comment">
      <div className="dashboard-comment-content">
        <div className="name">Name: {name}</div>
        <div className="email">Email: {email}</div>
        <p className="text">{text}</p>
      </div>
      <button className="dashboard-delete-comment-btn" onClick={handleClick}>
        <i className="fas fa-trash"></i>
      </button>
    </li>
  );
};

export default DashboardComment;
