import axios from "axios";

export const requestTicketsList = () => {
  return axios.get("/api/tickets/");
};

export const requestAuthorisation = (username, password) => {
  return axios.post("/auth/login/"), { username: username, password: password };
};

export const requestSignup = (username, password) => {
  return (
    axios.post("/auth/login/"),
    {
      username,
      password,
      email,
      password1,
      password2
    }
  );
};
