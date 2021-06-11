import * as authActionTypes from "../actionTypes/authActionTypes";

const initState = {
  token: localStorage.getItem("token"),
  isAuthenticated: !!localStorage.getItem("token"),
  isLoading: false,
  errors: null,
};

const authReducer = (state = initState, action) => {
  switch (action.type) {
    case authActionTypes.SIGN_IN_ADMIN:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case authActionTypes.SIGN_IN_ADMIN_SUCCESS:
      localStorage.setItem("token", action.token);

      return {
        ...state,
        token: action.token,
        isAuthenticated: true,
        isLoading: false,
        errors: [],
      };
    case authActionTypes.SIGN_IN_ADMIN_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.errors,
      };
    case authActionTypes.SIGN_OUT_ADMIN:
      localStorage.removeItem("token");

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
