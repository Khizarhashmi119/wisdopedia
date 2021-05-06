import axios from "axios";

import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
} from "../actionTypes/categoryActionTypes";

const getCategoriesAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: GET_CATEGORIES });
      const response = await axios.get("/api/v1/categories");
      dispatch({ type: GET_CATEGORIES_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const addCategoryAction = (category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: ADD_CATEGORY });
      const response = await axios.post(
        "/api/v1/categories",
        {
          category,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      dispatch({ type: ADD_CATEGORY_SUCCESS, payload: response.data });
    } catch (err) {
      console.error(err);
    }
  };
};

const deleteCategoryAction = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: DELETE_CATEGORY });
      await axios.delete(`/api/v1/categories/${categoryId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      dispatch({ type: DELETE_CATEGORY_SUCCESS, payload: categoryId });
    } catch (err) {
      console.error(err);
    }
  };
};

export { getCategoriesAction, addCategoryAction, deleteCategoryAction };
