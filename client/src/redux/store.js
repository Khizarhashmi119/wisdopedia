import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers/rootReducer";

const middlewares = [thunk];
const storeEnhancer = [applyMiddleware(...middlewares)];

const store = createStore(rootReducer, composeWithDevTools(...storeEnhancer));

export default store;
