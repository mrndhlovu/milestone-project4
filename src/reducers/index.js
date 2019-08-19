import { combineReducers } from "redux";
import ticketsReducer from "./ticketsReducer";
import authReducer from "./authReducer";
import { reducer as formReducer } from "redux-form";
import createTicketReducer from "./createTicketReducer";
import ticketDetaiReducer from "./ticketDetailReducer";
import errorsReducer from "./errorsReducer";
import messagesReducer from "./messagesReducer";
import userReducer from "./userReducer";
import userProfileReducer from "./userProfileReducer";
import membershipsReducer from "./membershipsReducer";
import ticketVoteReducer from "./ticketVoteReducer";

export default combineReducers({
  tickets: ticketsReducer,
  auth: authReducer,
  form: formReducer,
  ticket: createTicketReducer,
  ticketDetail: ticketDetaiReducer,
  errorAlert: errorsReducer,
  messages: messagesReducer,
  user: userReducer,
  memberships: membershipsReducer,
  vote: ticketVoteReducer,
  userProfile: userProfileReducer
});
