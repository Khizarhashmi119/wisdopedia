import axios from "axios";

import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
} from "../actionTypes/commentActionTypes";

const getCommentsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COMMENTS });
      const response = await axios.get(`/api/v1/comments`);
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const getBlogCommentsAction = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_COMMENTS });
      const response = await axios.get(`/api/v1/comments/blogs/${blogId}`);
      dispatch({ type: GET_COMMENTS_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const addCommentAction = (blogId, name, email, text) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_COMMENT });
      const response = await axios.post(`/api/v1/comments/blogs/${blogId}`, {
        name,
        email,
        text,
      });
      dispatch({
        type: ADD_COMMENT_SUCCESS,
        payload: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteCommentAction = (commentId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_COMMENT });
      await axios.delete(`/api/v1/comments/${commentId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      dispatch({ type: DELETE_COMMENT_SUCCESS, payload: commentId });
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  getCommentsAction,
  getBlogCommentsAction,
  addCommentAction,
  deleteCommentAction,
};
