import { createStore, applyMiddleware } from "redux";
import thunkMiddleware from 'redux-thunk';

import rootReducer from "./reducer";

export default createStore(
    rootReducer,
    applyMiddleware(thunkMiddleware)
);
