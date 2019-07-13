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
  const { username, email, password1, password2 } = inputs;
  // return console.log("Inputs: ", inputs);
  return axios.post("http://127.0.0.1:8000/rest-auth/registration/", {
    username: username,
    email: email,
    password1: password1,
    password2: password2
  });
}
