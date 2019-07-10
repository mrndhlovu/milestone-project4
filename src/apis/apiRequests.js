import axios from "axios";

export const requestTicketsList = () => {
  return axios.get("/tickets");
};

export const requestAuthorisation = (username, password) => {
  return (
    axios.post("http://127.0.0.1:8000/rest-auth/login/"), { username, password }
  );
};

export const requestSignup = (
  email,
  username,
  password,
  password1,
  password2
) => {
  return (
    axios.post("/auth/signup/"),
    {
      email: email,
      username: username,
      password: password,
      password1: password1,
      password2: password2
    }
  );
};
