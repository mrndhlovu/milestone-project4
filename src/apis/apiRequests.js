import axios from "axios";
import { baseUrl } from "../utils/urls";

const params = {
  headers: {
    "Content-Type": "application/json"
  }
};

export async function requestTicketsList() {
  return axios.get(`${baseUrl}/tickets/`);
}

export async function requestProductsList() {
  return axios.get(`${baseUrl}/products/`);
}

export async function requestUser() {
  const sessionToken = localStorage.getItem("sessionToken");
  params.headers["Authorization"] = `Token ${sessionToken}`;

  return axios.get(`${baseUrl}/accounts/api/auth/user`, params);
}

export async function requestSignup(inputs) {
  const body = JSON.stringify({ inputs });
  return axios.post(`${baseUrl}/accounts/api/auth/signup`, body, params);
}

export async function requestLogin(username, password) {
  const body = JSON.stringify({ username, password });
  return axios.post(`${baseUrl}/accounts/api/auth/login`, body, params);
}

export async function requestLogout(sessionToken) {
  params.headers["Authorization"] = `Token ${sessionToken}`;
  return axios.post(`${baseUrl}/accounts/api/auth/logout`, null, params);
}

export async function requestCreateTicket(body) {
  return axios.post(`${baseUrl}/tickets/`, body, params);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${baseUrl}/tickets/${id}/`);
}
