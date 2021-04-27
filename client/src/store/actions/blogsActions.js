import axios from "axios";

import {
  GET_BLOGS,
  GET_BLOG,
  GET_BLOGS_SUCCESS,
  GET_BLOG_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG_FAIL,
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

export { getBlogsAction, getBlogAction };
