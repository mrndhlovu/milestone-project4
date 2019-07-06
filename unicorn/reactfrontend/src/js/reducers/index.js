import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";
import authReducer from "./authoReducer";

export default combineReducers({
  tickets: ticketsReducer,
  auth: authReducer
});
