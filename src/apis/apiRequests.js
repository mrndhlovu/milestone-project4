import axios from "axios";

export const requestTicketsList = () => {
  return axios.get("/tickets");
};

export async function requestAuthorisation(username, password) {
  console.log("send request", username, password);
  return axios.post("http://127.0.0.1:8000/rest-auth/login/", {
    username: username,
    password: password
  });
}

export async function requestSignup(inputs) {
  return axios.post("http://127.0.0.1:8000/rest-auth/registration/", {
    data: inputs
  });
}
