import { combineReducers } from "redux";

import authReducer from "./authReducer";
import blogsReducer from "./blogsReducer";
import commentsReducer from "./commentsReducer";
import categoriesReducer from "./categoriesReducer";
import alertsReducer from "./alertsReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  blogsState: blogsReducer,
  commentsState: commentsReducer,
  categoriesState: categoriesReducer,
  alertsState: alertsReducer,
});

export default rootReducer;
