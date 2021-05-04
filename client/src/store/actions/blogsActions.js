import axios from "axios";

import {
  GET_BLOGS,
  GET_BLOG,
  ADD_BLOG,
  DELETE_BLOG,
  UPDATE_BLOG,
  GET_BLOGS_SUCCESS,
  GET_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  ADD_BLOG_SUCCESS,
  UPDATE_BLOG_SUCCESS,
} from "../actionTypes/blogActionTypes";
import {
  DELETE_COMMENT_BY_BLOGID,
  DELETE_COMMENT_BY_BLOGID_SUCCESS,
} from "../actionTypes/commentActionTypes";

const getBlogsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_BLOGS });
      const response = await axios.get("/api/v1/blogs");
      dispatch({ type: GET_BLOGS_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const getBlogAction = (blogId) => {
  return async (dispatch /* getState */) => {
    // const state = getState();
    // console.log(state);
    try {
      dispatch({ type: GET_BLOG });
      const response = await axios.get(`/api/v1/blogs/${blogId}`);
      dispatch({ type: GET_BLOG_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const addBlogAction = ({
  title,
  description,
  body,
  author,
  categories,
  image,
}) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_BLOG });
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("body", body);
      blogData.append("author", author);
      blogData.append("categories", categories);
      blogData.append("image", image);
      const response = await axios.post("/api/v1/blogs/", blogData, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
          "content-type": "multipart/form-data",
        },
      });
      dispatch({ type: ADD_BLOG_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
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
    }
  };
};

const updateBlogAction = (blogId, blog) => {
  return async (dispatch) => {
    try {
      dispatch({ type: UPDATE_BLOG });
      const response = await axios.put(`/api/v1/blogs/${blogId}`, blog, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      dispatch({
        type: UPDATE_BLOG_SUCCESS,
        payload: { id: blogId, blog: response.data },
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export {
  getBlogsAction,
  getBlogAction,
  addBlogAction,
  deleteBlogAction,
  updateBlogAction,
};
