import axios from "axios";

const getBlogsAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_BLOGS" });
      const response = await axios.get("/api/blogs");
      dispatch({ type: "GET_BLOGS_SUCCESS", payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const addCommentAction = (blogId, name, email, text) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_COMMENT" });
      const response = await axios.put(`/api/blogs/${blogId}/comment`, {
        name,
        email,
        text,
      });
      dispatch({
        type: "ADD_COMMENT_SUCCESS",
        payload: { blogId, comment: response.data },
      });
    } catch (err) {
      console.error(err);
    }
  };
};

export { getBlogsAction, addCommentAction };
