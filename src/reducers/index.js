import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import addRemoveCartItemReducer from "./addRemoveCartItemReducer";
import articleDetailReducer from "./articleDetailReducer";
import articleListReducer from "./articleListReducer";
import articleUpdateReducer from "./articleUpdateReducer";
import authReducer from "./authReducer";
import checkOutReducer from "./checkOutReducer";
import commentsReducer from "./commentsReducer";
import createArticleReducer from "./createArticleReducer";
import createTicketReducer from "./createTicketReducer";
import editTicketReducer from "./editTicketReducer";
import errorsReducer from "./errorsReducer";
import membershipsReducer from "./membershipsReducer";
import messagesReducer from "./messagesReducer";
import pendingOrderReducer from "./pendingOrderReducer";
import ticketDetaiReducer from "./ticketDetailReducer";
import ticketSolutionReducer from "./ticketSolutionReducer";
import ticketsReducer from "./ticketsReducer";
import ticketVoteReducer from "./ticketVoteReducer";
import updateProfileReducer from "./updateProfileReducer";
import userProfileReducer from "./userProfileReducer";
import userReducer from "./userReducer";

export default combineReducers({
  article: createArticleReducer,
  articleDetail: articleDetailReducer,
  articleList: articleListReducer,
  articleUpdate: articleUpdateReducer,
  auth: authReducer,
  cartAddOrRemove: addRemoveCartItemReducer,
  checkout: checkOutReducer,
  comments: commentsReducer,
  editTicket: editTicketReducer,
  errorAlert: errorsReducer,
  form: formReducer,
  memberships: membershipsReducer,
  messages: messagesReducer,
  pending: pendingOrderReducer,
  ticket: createTicketReducer,
  ticketDetail: ticketDetaiReducer,
  tickets: ticketsReducer,
  ticketSolution: ticketSolutionReducer,
  updateProfile: updateProfileReducer,
  user: userReducer,
  userProfile: userProfileReducer,
  vote: ticketVoteReducer
});
