import axios from "axios";

export async function requestTicketsList() {
  return axios.get("http://127.0.0.1:8000/tickets/");
}

export async function requestAuthorisation(username, password) {
  console.log("send request", username, password);
  return axios.post("http://127.0.0.1:8000/rest-auth/login/", {
    username: username,
    password: password
  });
}

export async function requestSignup(inputs) {
  const { username, email, password1, password2 } = inputs;
  // return console.log("Inputs: ", inputs);
  return axios.post("http://127.0.0.1:8000/rest-auth/registration/", {
    username: username,
    email: email,
    password1: password1,
    password2: password2
  });
}

export async function requestCreateTicket(data) {
  const { title, subject, description } = data;
  return axios.post("http://127.0.0.1:8000/tickets/", {
    title: title,
    subject: subject,
    description: description
  });
}
