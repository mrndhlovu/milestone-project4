import store from "../store";

export const getAccountUpdate = state => state.account;
export const getArticle = state => state.article;
export const getArticleDetail = state => state.articleDetail;
export const getArticleList = state => state.articleList;
export const getArticleUpdate = state => state.articleUpdate;
export const getCartAddOrRemove = state => state.cartAddOrRemove;
export const getCartPendingOrder = state => state.pending;
export const getCheckout = state => state.checkout;
export const getCheckoutDetail = state => state.checkoutDetail;
export const getComments = state => state.comments;
export const getErrors = state => state.errorAlert;
export const getMembershipProfile = state => state.userProfile.data;
export const getMemberships = state => state.memberships;
export const getMessage = state => state.messages;
export const getProfileUpdate = state => state.updateProfile;
export const getSolution = state => state.ticketSolution;
export const getTicket = state => state.ticket;
export const getTicketCheckout = state => state.ticketCheckout;
export const getTicketDetail = state => state.ticketDetail;
export const getTicketList = state => state.tickets;
export const getTicketUpdate = state => state.editTicket;
export const getUpload = state => state.upload;
export const getUser = state => state.auth;
export const getUserProfile = state => state.user;
export const getVotes = state => state.vote;

export const getUserMembership = state => {
  const userMembership = getUserProfile(state);
  if (userMembership.dataReceived) {
    return userMembership.data.current_membership.membership;
  }
  return userMembership.data;
};
