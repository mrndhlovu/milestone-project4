export const getUser = state => state.auth;

export const getUserProfile = state => state.user.data;

export const getErrors = state => state.errorAlert;

export const getMessage = state => state.messages;

export const getTicketDetail = state => state.ticketDetail;

export const getTicketUpdate = state => state.ticketUpdate;

export const getTicketList = state => state.tickets;

export const getTicket = state => state.ticket;

export const getComments = state => state.comments;

export const getVotes = state => state.vote;

export const getMemberships = state => state.memberships.data;

export const getMembershipProfile = state => state.userProfile.data;

export const getCheckout = state => state.checkOut;

export const getCheckoutDetail = state => state.checkoutDetail;

export const getCartAddOrRemove = state => state.cartAddOrRemove;
