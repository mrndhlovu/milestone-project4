import axios from "axios";

const params = {
  headers: {
    "Content-Type": "application/json"
  }
};

export async function requestTicketsList() {
  return axios.get("http://127.0.0.1:8000/tickets/");
}

export async function requestLogin(username, password) {
  const body = JSON.stringify({ username, password });
  return axios.post(
    "http://127.0.0.1:8000/accounts/api/auth/login",
    body,
    params
  );
}

export async function requestSignup(inputs) {
  const { username, email, password, password2 } = inputs;
  const body = JSON.stringify({ username, email, password, password2 });

  return axios.post(
    "http://127.0.0.1:8000/accounts/api/auth/register",
    body,
    params
  );
}

export async function requestCreateTicket(data) {
  const { title, subject, description, tags, priority_level } = data;
  return axios.post("http://127.0.0.1:8000/tickets/", {
    title: title,
    subject: subject,
    description: description,
    priority_level: priority_level,
    tags: tags
  });
}

export async function fetchTicketDetail(id) {
  return axios.get(`http://127.0.0.1:8000/tickets/${id}/`);
}
