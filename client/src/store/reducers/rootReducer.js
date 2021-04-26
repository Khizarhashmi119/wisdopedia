import { combineReducers } from "redux";

import authReducer from "./authReducer";
import blogsReducer from "./blogsReducer";
import categoriesReducer from "./categoriesReducer";
import alertsReducer from "./alertsReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  blogsState: blogsReducer,
  categoriesState: categoriesReducer,
  alertsState: alertsReducer,
});

export default rootReducer;
