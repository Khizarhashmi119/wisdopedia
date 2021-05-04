import {
  SIGN_IN_ADMIN,
  SIGN_IN_ADMIN_SUCCESS,
  SIGN_IN_ADMIN_FAIL,
  SIGN_OUT_ADMIN,
} from "../actionTypes/authActionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  errors: [],
};

const authReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_ADMIN:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case SIGN_IN_ADMIN_SUCCESS:
      return {
        ...state,
        token: payload,
        isAuthenticated: true,
        isLoading: false,
        errors: [],
      };
    case SIGN_IN_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    case SIGN_OUT_ADMIN:
      return {
        ...state,
        token: null,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default authReducer;
