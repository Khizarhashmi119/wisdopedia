import * as categoryActionTypes from "../actionTypes/categoryActionTypes";

const initState = {
  categories: [],
  isLoading: false,
  errors: [],
};

const categoriesReducer = (state = initState, action) => {
  switch (action.type) {
    case categoryActionTypes.GET_CATEGORIES:
    case categoryActionTypes.ADD_CATEGORY:
    case categoryActionTypes.DELETE_CATEGORY:
      return {
        ...state,
        isLoading: true,
        errors: [],
      };
    case categoryActionTypes.GET_CATEGORIES_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: action.categories,
        errors: [],
      };
    case categoryActionTypes.ADD_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: [...state.categories, action.category],
        errors: [],
      };
    case categoryActionTypes.DELETE_CATEGORY_SUCCESS:
      return {
        ...state,
        isLoading: false,
        categories: state.categories.filter(({ _id }) => _id !== action.id),
        errors: [],
      };
    case categoryActionTypes.GET_CATEGORIES_FAIL:
    case categoryActionTypes.ADD_CATEGORY_FAIL:
    case categoryActionTypes.DELETE_CATEGORY_FAIL:
      return {
        ...state,
        isLoading: false,
        errors: action.errors,
      };
    default:
      return state;
  }
};

export default categoriesReducer;
