import {
  GET_CATEGORIES,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORIES_SUCCESS,
  ADD_CATEGORY_SUCCESS,
  DELETE_CATEGORY_SUCCESS,
  GET_CATEGORIES_FAIL,
  ADD_CATEGORY_FAIL,
  DELETE_CATEGORY_FAIL,
} from "../actionTypes";

const initState = {
  categories: [],
  isLoading: false,
  errors: [],
};

const categoriesReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORIES:
    case ADD_CATEGORY:
    case DELETE_CATEGORY:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: payload,
        errors: [],
      };
    case ADD_CATEGORY_SUCCESS:
      const categories = [...state.categories, payload];

      return {
        ...state,
        isLoading: false,
        categories,
        errors: [],
      };
    case DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: state.categories.filter(({ _id }) => _id !== payload),
        errors: [],
      };
    case GET_CATEGORIES_FAIL:
    case ADD_CATEGORY_FAIL:
    case DELETE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: payload,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
