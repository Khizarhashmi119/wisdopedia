import axios from "axios";
import { v4 } from "uuid";

import * as blogActionTypes from "../actionTypes/blogActionTypes";
import * as commentActionTypes from "../actionTypes/commentActionTypes";
import * as alertActionTypes from "../actionTypes/alertActionTypes";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:5000/api/v1";

const getBlogsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: blogActionTypes.GET_BLOGS });
      const response = await axios.get(`${baseURL}/blogs`);

      dispatch({
        type: blogActionTypes.GET_BLOGS_SUCCESS,
        blogs: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const getBlogAction = (blogId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: blogActionTypes.GET_BLOG });
      const response = await axios.get(`${baseURL}/blogs/${blogId}`);

      dispatch({
        type: blogActionTypes.GET_BLOG_SUCCESS,
        blog: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const addBlogAction = ({
  title,
  description,
  tags,
  body,
  author,
  categories,
  image,
}) => {
  return async (dispatch, getState) => {
    const {
      authState: { token },
    } = getState();

    try {
      dispatch({ type: blogActionTypes.ADD_BLOG });
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("tags", tags);
      blogData.append("body", body);
      blogData.append("author", author);
      blogData.append("categories", categories);
      blogData.append("image", image);

      const response = await axios.post(`${baseURL}/blogs/`, blogData, {
        headers: {
          "x-auth-token": token,
          "content-type": "multipart/form-data",
        },
      });

      dispatch({
        type: blogActionTypes.ADD_BLOG_SUCCESS,
        blog: response.data,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully blog added.",
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
      if (err.response) {
        const errors = err.response.data.errors;

        dispatch({ type: blogActionTypes.ADD_BLOG_FAIL, errors });

        errors.forEach((error) => {
          const alertId = v4();

          dispatch({
            type: alertActionTypes.ADD_ALERT,
            alert: {
              id: alertId,
              msg: error.msg,
              type: "error",
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
        });
      } else if (err.request) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  };
};

const deleteBlogAction = (blogId) => {
  return async (dispatch, getState) => {
    const {
      authState: { token },
    } = getState();

    try {
      dispatch({ type: blogActionTypes.DELETE_BLOG });
      dispatch({ type: commentActionTypes.DELETE_COMMENT_BY_BLOGID });

      await axios.delete(`${baseURL}/blogs/${blogId}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch({
        type: commentActionTypes.DELETE_COMMENT_BY_BLOGID_SUCCESS,
        blogId: blogId,
      });

      dispatch({ type: blogActionTypes.DELETE_BLOG_SUCCESS, id: blogId });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully blog deleted.",
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
      if (err.response) {
        const errors = err.response.data.errors;

        dispatch({ type: blogActionTypes.DELETE_BLOG_FAIL, errors });

        errors.forEach((error) => {
          const alertId = v4();

          dispatch({
            type: alertActionTypes.ADD_ALERT,
            alert: {
              id: alertId,
              msg: error.msg,
              type: "error",
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
        });
      } else if (err.request) {
        console.error(err);
      } else {
        console.error(err);
      }
    }
  };
};

const updateBlogAction = (
  blogId,
  { title, description, tags, body, author, categories, image }
) => {
  return async (dispatch, getState) => {
    const {
      authState: { token },
    } = getState();

    try {
      dispatch({ type: blogActionTypes.UPDATE_BLOG });
      const blogData = new FormData();
      blogData.append("title", title);
      blogData.append("description", description);
      blogData.append("tags", tags);
      blogData.append("body", body);
      blogData.append("author", author);
      blogData.append("categories", categories);
      blogData.append("image", image);

      const response = await axios.put(`${baseURL}/blogs/${blogId}`, blogData, {
        headers: {
          "x-auth-token": token,
          "content-type": "multipart/form-data",
        },
      });

      dispatch({
        type: blogActionTypes.UPDATE_BLOG_SUCCESS,
        id: blogId,
        blog: response.data,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully blog updated.",
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
      if (err.response) {
        const errors = err.response.data.errors;

        dispatch({ type: blogActionTypes.UPDATE_BLOG_FAIL, errors });

        errors.forEach((error) => {
          const alertId = v4();

          dispatch({
            type: alertActionTypes.ADD_ALERT,
            alert: {
              id: alertId,
              msg: error.msg,
              type: "error",
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
        });
      } else if (err.request) {
        console.error(err);
      } else {
        console.error(err);
      }
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
