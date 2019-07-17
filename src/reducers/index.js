import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";

export default combineReducers({
  tickets: ticketsReducer,
  auth: authReducer,
  form: formReducer
});
