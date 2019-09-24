import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducer from "./authReducer";
import checkOutReducer from "./checkOutReducer";
import checkoutOrderDetailReducer from "./checkoutOrderDetailReducer";
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
import addRemoveCartItemReducer from "./addRemoveCartItemReducer";
import pendingOrderReducer from "./pendingOrderReducer";

export default combineReducers({
  auth: authReducer,
  cartAddOrRemove: addRemoveCartItemReducer,
  checkOut: checkOutReducer,
  checkoutDetail: checkoutOrderDetailReducer,
  comments: commentsReducer,
  errorAlert: errorsReducer,
  form: formReducer,
  memberships: membershipsReducer,
  messages: messagesReducer,
  pending: pendingOrderReducer,
  ticket: createTicketReducer,
  ticketDetail: ticketDetaiReducer,
  tickets: ticketsReducer,
  editTicket: editTicketReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  vote: ticketVoteReducer
});
