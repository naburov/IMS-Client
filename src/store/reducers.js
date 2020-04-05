import { combineReducers } from "redux";
import { fileReducer } from "./file/reducers";
import { viewReducer } from "./view/reducers";
import { analysisReducer } from "./analysis/reducers";

export default combineReducers({
    files:fileReducer,
    view:viewReducer, 
    analysis:analysisReducer
})