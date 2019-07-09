import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";
import authReducer from "./authReducer";

export default combineReducers({
  tickets: ticketsReducer,
  auth: authReducer
});
