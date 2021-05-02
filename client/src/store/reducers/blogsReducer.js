import {
  GET_BLOGS,
  GET_BLOG,
  DELETE_BLOG,
  GET_BLOGS_SUCCESS,
  GET_BLOG_SUCCESS,
  DELETE_BLOG_SUCCESS,
  GET_BLOGS_FAIL,
  GET_BLOG_FAIL,
  DELETE_BLOG_FAIL,
} from "../actionTypes";

const initState = {
  blog: null,
  blogs: [],
  isLoading: false,
  errors: [],
};

const blogsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOGS:
    case GET_BLOG:
    case DELETE_BLOG:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case GET_BLOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: payload,
        errors: [],
      };
    case GET_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blog: payload,
        errors: [],
      };
    case DELETE_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: state.blogs.filter((blog) => blog._id !== payload),
      };
    case GET_BLOGS_FAIL:
    case GET_BLOG_FAIL:
    case DELETE_BLOG_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    default:
      return state;
  }
};

export default blogsReducer;
