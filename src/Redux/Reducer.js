import { combineReducers } from "redux";
import flightReducer from "../module/flightReducer";


const appReducer = combineReducers({
    flightReducer:flightReducer
});
export default appReducer;
