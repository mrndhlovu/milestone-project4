import axios from "axios";
import { baseUrl } from "../utils/urls";

const params = {
  headers: {
    "Content-Type": "application/json"
  }
};

const sessionToken = localStorage.getItem("sessionToken");

export async function requestTicketsList() {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/tickets/`, params);
}

export async function requestTicketUpdate(id, body) {
  params.headers["Authorization"] = `Token ${sessionToken}`;
  return axios.put(`${baseUrl}/tickets/update/${id}/`, body);
}

export async function requestTicketDelete(id) {
  return axios.delete(`${baseUrl}/tickets/delete/${id}/`);
}

export async function requestTicketVoteUpdate(id) {
  params.headers["Authorization"] = `Token ${sessionToken}`;
  return axios.get(`${baseUrl}/tickets/api/${id}/vote/`, params);
}

export async function requestProductsList() {
  return axios.get(`${baseUrl}/products/`);
}

export async function requestMembershipsList() {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/memberships/`, params);
}

export async function requestMembershipsDetail(id) {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/memberships/type/${id}/`, params);
}

export async function requestUser() {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/accounts/api/auth/user`, params);
}

export async function requestUserProfile() {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/accounts/api/auth/profile/`, params);
}

export async function requestUserProfileDetail(id) {
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/accounts/api/auth/profile/${id}/`, params);
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
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.post(`${baseUrl}/tickets/api/create/`, body, params);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${baseUrl}/tickets/${id}/`);
}

export async function requestTicketComments(id) {
  return axios.get(`${baseUrl}/comments/`);
}
