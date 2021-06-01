import axios from "axios";
import { v4 } from "uuid";

import * as commentActionTypes from "../actionTypes/commentActionTypes";
import * as alertActionTypes from "../actionTypes/alertActionTypes";

const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/api/v1";

const getCommentsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: commentActionTypes.GET_COMMENTS });
      const response = await axios.get(`${baseURL}/comments`);

      dispatch({
        type: commentActionTypes.GET_COMMENTS_SUCCESS,
        comments: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const getBlogCommentsAction = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: commentActionTypes.GET_COMMENTS });

      const response = await axios.get(`${baseURL}/comments/blogs/${blogId}`);

      dispatch({
        type: commentActionTypes.GET_COMMENTS_SUCCESS,
        comments: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const addCommentAction = (blogId, name, email, text) => {
  return async (dispatch) => {
    try {
      dispatch({ type: commentActionTypes.ADD_COMMENT });

      const response = await axios.post(`${baseURL}/comments/blogs/${blogId}`, {
        name,
        email,
        text,
      });

      dispatch({
        type: commentActionTypes.ADD_COMMENT_SUCCESS,
        comment: response.data,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully comment added.",
          type: "success",
        },
      });

      setTimeout(
        () =>
          dispatch({
            type: alertActionTypes.DELETE_ALERT,
            id: alertId,
          }),
        5000
      );
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteCommentAction = (commentId) => {
  return async (dispatch, getState) => {
    const {
      authState: { token },
    } = getState();

    try {
      dispatch({ type: commentActionTypes.DELETE_COMMENT });

      await axios.delete(`${baseURL}/comments/${commentId}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch({
        type: commentActionTypes.DELETE_COMMENT_SUCCESS,
        id: commentId,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully comment deleted.",
          type: "success",
        },
      });

      setTimeout(
        () =>
          dispatch({
            type: alertActionTypes.DELETE_ALERT,
            id: alertId,
          }),
        5000
      );
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
