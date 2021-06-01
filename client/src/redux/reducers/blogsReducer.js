import * as blogActionTypes from "../actionTypes/blogActionTypes";

const initState = {
  blog: null,
  blogs: [],
  isLoading: false,
  errors: [],
};

const blogsReducer = (state = initState, action) => {
  switch (action.type) {
    case blogActionTypes.GET_BLOGS:
    case blogActionTypes.GET_BLOG:
    case blogActionTypes.ADD_BLOG:
    case blogActionTypes.DELETE_BLOG:
    case blogActionTypes.UPDATE_BLOG:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case blogActionTypes.GET_BLOGS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: action.blogs,
        errors: [],
      };
    case blogActionTypes.GET_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blog: action.blog,
        errors: [],
      };
    case blogActionTypes.ADD_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: [action.blog, ...state.blogs],
        errors: [],
      };
    case blogActionTypes.DELETE_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blogs: state.blogs.filter((blog) => blog._id !== action.id),
      };
    case blogActionTypes.UPDATE_BLOG_SUCCESS:
      return {
        ...state,
        isLoading: false,
        blog: action.blog,
        blogs: state.blogs.map((blog) => {
          return blog._id !== action.id ? blog : action.blog;
        }),
      };
    case blogActionTypes.GET_BLOGS_FAIL:
    case blogActionTypes.GET_BLOG_FAIL:
    case blogActionTypes.ADD_BLOG_FAIL:
    case blogActionTypes.DELETE_BLOG_FAIL:
    case blogActionTypes.UPDATE_BLOG_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default blogsReducer;
