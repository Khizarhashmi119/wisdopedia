import React, { useState } from "react";
import { useDispatch } from "react-redux";

import { addCommentAction } from "../../store/actions/blogsActions";

import "./AddCommentForm.css";

const AddCommentForm = ({ blogId }) => {
  const dispatch = useDispatch();

  const [commentFormData, setCommentFormData] = useState({
    name: "",
    email: "",
    text: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setCommentFormData((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      addCommentAction(
        blogId,
        commentFormData.name,
        commentFormData.email,
        commentFormData.text
      )
    );
  };

  return (
    <form className="comment-form" onSubmit={handleSubmit}>
      <textarea
        name="text"
        value={commentFormData.text}
        id="comment-text"
        className="comment-input"
        cols="5"
        placeholder="Comment*"
        onChange={handleChange}
        required
      ></textarea>
      <input
        type="text"
        name="name"
        value={commentFormData.name}
        id="name"
        className="comment-input"
        placeholder="Name*"
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        value={commentFormData.email}
        id="comment-email"
        className="comment-input"
        placeholder="Email*"
        onChange={handleChange}
        required
      />
      <small>* required fields</small>
      <button id="comment-send-btn" type="submit">
        SUBMIT
      </button>
    </form>
  );
};

export default AddCommentForm;
