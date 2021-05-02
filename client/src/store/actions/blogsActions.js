import axios from "axios";

import {
  GET_BLOGS,
  GET_BLOG,
  DELETE_BLOG,
  DELETE_COMMENT_BY_BLOGID,
  GET_BLOGS_SUCCESS,
  GET_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  DELETE_COMMENT_BY_BLOGID_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG_FAIL,
  DELETE_BLOG_FAIL,
  DELETE_COMMENT_BY_BLOGID_FAIL,
} from "../actionTypes";

const getBlogsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BLOGS });
      const response = await axios.get("/api/v1/blogs");
      dispatch({ type: GET_BLOGS_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: GET_BLOGS_FAIL });
    }
  };
};

const getBlogAction = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BLOG });
      const response = await axios.get(`/api/v1/blogs/${blogId}`);
      dispatch({ type: GET_BLOG_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: GET_BLOG_FAIL });
    }
  };
};

const deleteBlogAction = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_BLOG });
      dispatch({ type: DELETE_COMMENT_BY_BLOGID });
      await axios.delete(`/api/v1/blogs/${blogId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      dispatch({ type: DELETE_COMMENT_BY_BLOGID_SUCCESS, payload: blogId });
      dispatch({ type: DELETE_BLOG_SUCCESS, payload: blogId });
    } catch (err) {
      console.error(err);
      dispatch({ type: DELETE_BLOG_FAIL });
      dispatch({ type: DELETE_COMMENT_BY_BLOGID_FAIL });
    }
  };
};

export { getBlogsAction, getBlogAction, deleteBlogAction };
