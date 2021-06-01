import axios from "axios";
import { v4 } from "uuid";

import * as authActionTypes from "../actionTypes/authActionTypes";
import * as alertActionTypes from "../actionTypes/alertActionTypes";

const baseURL =
  process.env.NODE_ENV === "production"
    ? "/api/v1"
    : "http://localhost:5000/api/v1";

const setTokenAction = (token) => {
  return {
    type: authActionTypes.SET_TOKEN,
    token,
  };
};

const signInAdminAction = (email, password) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authActionTypes.SIGN_IN_ADMIN });

      const {
        data: { token },
      } = await axios.post(`${baseURL}/auth/signin`, {
        email,
        password,
      });

      dispatch({
        type: authActionTypes.SIGN_IN_ADMIN_SUCCESS,
        token,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully logged in.",
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
    } catch (error) {
      console.error(error);
    }
  };
};

const signOutAdminAction = () => {
  return { type: authActionTypes.SIGN_OUT_ADMIN };
};

export { setTokenAction, signInAdminAction, signOutAdminAction };
