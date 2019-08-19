import axios from "axios";
import { baseUrl } from "../utils/urls";

const params = {
  headers: {
    "Content-Type": "application/json"
  }
};

const sessionToken = localStorage.getItem("sessionToken");

export async function requestTicketsList() {
  return axios.get(`${baseUrl}/tickets/`);
}

export async function requestTicketVoteUpdate(id) {
  params.headers["Authorization"] = `Token ${sessionToken}`;
  return axios.get(`${baseUrl}/tickets/api/${id}/vote/`, params);
}

export async function requestProductsList() {
  return axios.get(`${baseUrl}/products/`);
}

export async function requestMembershipsList() {
  return axios.get(`${baseUrl}/memberships/`);
}

export async function requestUser() {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/accounts/api/auth/user`, params);
}

export async function requestUserProfile(id) {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/profiles/api/auth/profile/`, params);
}

export async function requestSignup(body) {
  return axios.post(`${baseUrl}/accounts/api/auth/signup`, body, params);
}

export async function requestLogin(body) {
  return axios.post(`${baseUrl}/accounts/api/auth/login`, body, params);
}

export async function requestLogout(sessionToken) {
  params.headers["Authorization"] = `Token ${sessionToken}`;
  return axios.post(`${baseUrl}/accounts/api/auth/logout`, null, params);
}

export async function requestCreateTicket(body) {
  return axios.post(`${baseUrl}/tickets/api/create/`, body, params);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${baseUrl}/tickets/${id}/`);
}
