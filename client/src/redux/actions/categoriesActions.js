import axios from "axios";
import { v4 } from "uuid";

import * as categoryActionTypes from "../actionTypes/categoryActionTypes";
import * as alertActionTypes from "../actionTypes/alertActionTypes";

const baseURL =
  process.env.NODE_ENV === "production" ? "/" : "http://localhost:5000/api/v1";

const getCategoriesAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: categoryActionTypes.GET_CATEGORIES });
      const response = await axios.get(`${baseURL}/categories`);

      dispatch({
        type: categoryActionTypes.GET_CATEGORIES_SUCCESS,
        categories: response.data,
      });
    } catch (err) {
      console.error(err);
    }
  };
};

const addCategoryAction = (category) => {
  return async (dispatch, getState) => {
    const {
      authState: { token },
    } = getState();

    try {
      dispatch({ type: categoryActionTypes.ADD_CATEGORY });

      const response = await axios.post(
        `${baseURL}/categories`,
        {
          category,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      );

      dispatch({
        type: categoryActionTypes.ADD_CATEGORY_SUCCESS,
        category: response.data,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully category added.",
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
      console.error(err);
    }
  };
};

const deleteCategoryAction = (categoryId) => {
  return async (dispatch, getState) => {
    const {
      authState: { token },
    } = getState();

    try {
      dispatch({ type: categoryActionTypes.DELETE_CATEGORY });

      await axios.delete(`${baseURL}/categories/${categoryId}`, {
        headers: {
          "x-auth-token": token,
        },
      });

      dispatch({
        type: categoryActionTypes.DELETE_CATEGORY_SUCCESS,
        id: categoryId,
      });

      const alertId = v4();

      dispatch({
        type: alertActionTypes.ADD_ALERT,
        alert: {
          id: alertId,
          msg: "Successfully category deleted.",
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
      console.error(err);
    }
  };
};

export { getCategoriesAction, addCategoryAction, deleteCategoryAction };
