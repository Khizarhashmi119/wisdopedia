import { combineReducers } from "redux";

import authReducer from "./authReducer";
import blogsReducer from "./blogsReducer";
import alertsReducer from "./alertsReducer";

const rootReducer = combineReducers({
  authState: authReducer,
  blogsState: blogsReducer,
  alertsState: alertsReducer,
});

export default rootReducer;
