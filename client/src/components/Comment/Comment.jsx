import moment from "moment";

import "./Comment.css";

const Comment = ({ comment: { avatar, name, text, createdAt } }) => {
  return (
    <div className="comment">
      <div className="comment-profile-image-container">
        <img className="comment-profile-image" src={avatar} alt="profile" />
      </div>
      <div className="comment-content">
        <h4 className="comment-profile-name">Name: {name}</h4>
        <p className="comment-text">{text}</p>
        <small>Date: {moment(createdAt).format("MMMM Do YYYY, h:mm a")}</small>
      </div>
    </div>
  );
};

export default Comment;
