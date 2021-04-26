import axios from "axios";

const getCategoriesAction = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: "GET_CATEGORIES" });
      const response = await axios.get("/api/categories");
      dispatch({ type: "GET_CATEGORIES_SUCCESS", payload: response.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "GET_CATEGORIES_FAIL" });
    }
  };
};

const addCategoryAction = (category) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "ADD_CATEGORY" });
      const response = await axios.post(
        "/api/categories",
        {
          category,
        },
        {
          headers: {
            "x-auth-token": localStorage.getItem("token"),
          },
        }
      );
      dispatch({ type: "ADD_CATEGORY_SUCCESS", payload: response.data });
    } catch (err) {
      console.error(err);
      dispatch({ type: "ADD_CATEGORY_FAIL" });
    }
  };
};

const deleteCategoryAction = (categoryId) => {
  return async (dispatch) => {
    try {
      dispatch({ type: "DELETE_CATEGORY" });
      await axios.delete(`/api/categories/${categoryId}`, {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      });
      dispatch({ type: "DELETE_CATEGORY_SUCCESS", payload: categoryId });
    } catch (err) {
      console.error(err);
      dispatch({ type: "DELETE_CATEGORY_FAIL" });
    }
  };
};

export { getCategoriesAction, addCategoryAction, deleteCategoryAction };
