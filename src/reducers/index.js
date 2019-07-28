import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import createTicketReducer from "./createTicketReducer";
import ticketDetaiReducer from "../reducers/ticketDetailReducer";
import errorsReducer from "../reducers/errorsReducer";
import messagesReducer from "../reducers/messagesReducer";
import userReducer from "../reducers/userReducer";

export default combineReducers({
  tickets: ticketsReducer,
  auth: authReducer,
  form: formReducer,
  ticket: createTicketReducer,
  ticketDetail: ticketDetaiReducer,
  errorAlert: errorsReducer,
  messages: messagesReducer,
  user: userReducer
});
