export const getUser = state => state.auth;

export const getUserProfile = state => state.user;

export const getErrors = state => state.errorAlert;

export const getMessage = state => state.messages;

export const getTicketDetail = state => state.ticketDetail;

export const getTicketUpdate = state => state.editTicket;

export const getTicketList = state => state.tickets;

export const getTicket = state => state.ticket;

export const getComments = state => state.comments;

export const getVotes = state => state.vote;

export const getMemberships = state => state.memberships.data;

export const getMembershipProfile = state => state.userProfile.data;

export const getCheckout = state => state.checkout;

export const getCheckoutDetail = state => state.checkoutDetail;

export const getCartAddOrRemove = state => state.cartAddOrRemove;

export const getCartPendingOrder = state => state.pending;

export const getTicketCheckout = state => state.ticketCheckout;

export const getArticleList = state => state.articleList;

export const getSolution = state => state.ticketSolution;

export const getArticleDetail = state => state.articleDetail;

export const getArticle = state => state.article;

export const getArticleUpdate = state => state.articleUpdate;

export const getProfileUpdate = state => state.updateProfile;
