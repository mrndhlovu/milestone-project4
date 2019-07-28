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

export async function requestSignup(inputs) {
  const { username, email, password, password2 } = inputs;
  const body = JSON.stringify({ username, email, password, password2 });

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

export async function requestCreateTicket(data) {
  const { title, subject, description, tags, priority_level } = data;
  const body = JSON.stringify({
    title,
    subject,
    description,
    tags,
    priority_level
  });

  return axios.post(`${baseUrl}/tickets/`, body, params);
}

export async function fetchTicketDetail(id) {
  return axios.get(`${baseUrl}/tickets/${id}/`);
}
