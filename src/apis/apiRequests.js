import axios from "axios";
import { getRootUrl } from "../utils/urls";
import {
  STRIPE_TOKEN,
  SESSION_TOKEN,
  SUBCRIPTION_ID,
  MEMBERSHIP
} from "../constants/localStorageConstants";

const authQueryParams = {
  headers: {
    Authorization: `Token ${SESSION_TOKEN}`,
    "Content-Type": "application/json"
  }
};

const queryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};

const params = {
  headers: {
    "Content-Type": "text/plain"
  }
};

localStorage.setItem("membership", "pro");

const SELECTED_MEMBERSHIP = {
  membership_type: `${MEMBERSHIP}`
};

const transcationUpdates = {
  subscription_id: `${SUBCRIPTION_ID}`,
  membership_type: `${MEMBERSHIP}`
};

const choosenMembership = {
  membership_type: `${MEMBERSHIP}`,
  stripeToken: `${STRIPE_TOKEN}`
};

export async function requestTicketsList() {
  return axios.get(`${getRootUrl}/tickets/`);
}

export async function requestTicketUpdate(id, body) {
  return axios.put(`${getRootUrl}/tickets/update/${id}/`, body);
}

export async function requestTicketDelete(id) {
  return axios.delete(`${getRootUrl}/tickets/delete/${id}/`, authQueryParams);
}

export async function requestTicketVoteUpdate(id) {
  return axios.get(`${getRootUrl}/tickets/api/${id}/vote/`, authQueryParams);
}

export async function requestProductsList() {
  return axios.get(`${getRootUrl}/products/`);
}

export async function requestMembershipsList() {
  return axios.get(`${getRootUrl}/memberships/types/`);
}

export async function requestUserMembershipsProfile() {
  return axios.get(`${getRootUrl}/memberships/user-profile/`, authQueryParams);
}

export async function requestCancelSubsricption() {
  return axios.post(
    `${getRootUrl}/memberships/cancel-subscription/`,
    null,
    authQueryParams
  );
}

export async function requestSelectedMemberships() {
  return axios.post(
    `${getRootUrl}/memberships/select/`,
    SELECTED_MEMBERSHIP,
    authQueryParams
  );
}

export async function requestMembershipPayment() {
  params.headers["Authorization"] = `Token ${SESSION_TOKEN}`;
  return axios.post(
    `${getRootUrl}/memberships/payments/`,
    choosenMembership,
    params
  );
}

export async function requestTransactionUpdate() {
  params.headers["Authorization"] = `Token ${SESSION_TOKEN}`;

  return axios.post(
    `${getRootUrl}/memberships/update-transaction/`,
    transcationUpdates,
    params
  );
}

export async function requestUser() {
  return axios.get(`${getRootUrl}/accounts/api/auth/user`, authQueryParams);
}

export async function requestUserProfile() {
  return axios.get(`${getRootUrl}/accounts/api/auth/profile/`, authQueryParams);
}

export async function requestUserProfileDetail(id) {
  return axios.get(
    `${getRootUrl}/accounts/api/auth/profile/${id}/`,
    authQueryParams
  );
}

export async function requestSignup(body) {
  return axios.post(
    `${getRootUrl}/accounts/api/auth/signup`,
    body,
    queryParams
  );
}

export async function requestLogin(body) {
  return axios.post(`${getRootUrl}/accounts/api/auth/login`, body, queryParams);
}

export async function requestLogout() {
  return axios.post(
    `${getRootUrl}/accounts/api/auth/logout`,
    null,
    authQueryParams
  );
}

export async function requestCreateTicket(body) {
  return axios.post(`${getRootUrl}/tickets/api/create/`, body, authQueryParams);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${getRootUrl}/tickets/${id}/`);
}

export async function requestTicketComments() {
  return axios.get(`${getRootUrl}/comments/`);
}

export async function requestCreateComment(body) {
  return axios.post(
    `${getRootUrl}/comments/create-comment/`,
    body,
    authQueryParams
  );
}

export async function requestCreateReply(body) {
  return axios.post(
    `${getRootUrl}/comments/create-reply/`,
    body,
    authQueryParams
  );
}
