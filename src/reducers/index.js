import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import checkOutReducer from "./checkOutReducer";
import commentsReducer from "./commentsReducer";
import createTicketReducer from "./createTicketReducer";
import editTicketReducer from "./editTicketReducer";
import errorsReducer from "./errorsReducer";
import membershipsReducer from "./membershipsReducer";
import messagesReducer from "./messagesReducer";
import ticketDetaiReducer from "./ticketDetailReducer";
import ticketsReducer from "./ticketsReducer";
import ticketVoteReducer from "./ticketVoteReducer";
import userProfileReducer from "./userProfileReducer";
import userReducer from "./userReducer";

export default combineReducers({
  auth: authReducer,
  checkOut: checkOutReducer,
  comments: commentsReducer,
  errorAlert: errorsReducer,
  form: formReducer,
  memberships: membershipsReducer,
  messages: messagesReducer,
  ticket: createTicketReducer,
  ticketDetail: ticketDetaiReducer,
  tickets: ticketsReducer,
  ticketUpdate: editTicketReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  vote: ticketVoteReducer
});
