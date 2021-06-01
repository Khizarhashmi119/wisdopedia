import * as commentActionTypes from "../actionTypes/commentActionTypes";

const initState = {
  comments: [],
  isLoading: false,
  errors: [],
};

const commentsReducer = (state = initState, action) => {
  switch (action.type) {
    case commentActionTypes.GET_COMMENTS:
    case commentActionTypes.ADD_COMMENT:
    case commentActionTypes.DELETE_COMMENT:
    case commentActionTypes.DELETE_COMMENT_BY_BLOGID:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case commentActionTypes.GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: action.comments,
        errors: [],
      };
    case commentActionTypes.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: [action.comment, ...state.comments],
        errors: [],
      };
    case commentActionTypes.DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter((comment) => comment._id !== action.id),
        errors: [],
      };
    case commentActionTypes.DELETE_COMMENT_BY_BLOGID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter(
          (comment) => comment.blog._id !== action.blogId
        ),
        errors: [],
      };
    case commentActionTypes.GET_COMMENTS_FAIL:
    case commentActionTypes.ADD_COMMENT_FAIL:
    case commentActionTypes.DELETE_COMMENT_FAIL:
    case commentActionTypes.DELETE_COMMENT_BY_BLOGID_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default commentsReducer;
