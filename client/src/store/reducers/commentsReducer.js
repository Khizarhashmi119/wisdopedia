import {
  GET_COMMENTS,
  ADD_COMMENT,
  DELETE_COMMENT,
  DELETE_COMMENT_BY_BLOGID,
  GET_COMMENTS_SUCCESS,
  ADD_COMMENT_SUCCESS,
  DELETE_COMMENT_SUCCESS,
  DELETE_COMMENT_BY_BLOGID_SUCCESS,
  GET_COMMENTS_FAIL,
  ADD_COMMENT_FAIL,
  DELETE_COMMENT_FAIL,
  DELETE_COMMENT_BY_BLOGID_FAIL,
} from "../actionTypes";

const initState = {
  comments: [],
  isLoading: false,
  errors: [],
};

const commentsReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_COMMENTS:
    case ADD_COMMENT:
    case DELETE_COMMENT:
    case DELETE_COMMENT_BY_BLOGID:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case GET_COMMENTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: payload,
        errors: [],
      };
    case ADD_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: [payload, ...state.comments],
        errors: [],
      };
    case DELETE_COMMENT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter((comment) => comment._id !== payload),
        errors: [],
      };
    case DELETE_COMMENT_BY_BLOGID_SUCCESS:
      return {
        ...state,
        isLoading: false,
        comments: state.comments.filter((comment) => comment.blog !== payload),
        errors: [],
      };
    case GET_COMMENTS_FAIL:
    case ADD_COMMENT_FAIL:
    case DELETE_COMMENT_FAIL:
    case DELETE_COMMENT_BY_BLOGID_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    default:
      return state;
  }
};

export default commentsReducer;
