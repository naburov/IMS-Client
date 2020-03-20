import { combineReducers } from "redux";
import { fileReducer } from "./file/reducers";
import { viewReducer } from "./view/reducers";

export default combineReducers({
    files:fileReducer,
    view:viewReducer
})