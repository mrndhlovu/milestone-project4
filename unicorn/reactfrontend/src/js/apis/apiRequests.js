import axios from "axios";

export const requestTicketsList = () => {
  return axios.get("/api/tickets/");
};
