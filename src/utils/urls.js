import { SESSION_TOKEN } from "../constants/localStorageConstants";

export const getRootUrl =
  process.env.NODE_ENV === "production"
    ? "https://the-unicorn-attractor.herokuapp.com"
    : process.env.REACT_APP_DEV_API_URL;

export const authQueryParams = {
  headers: {
    Authorization: `Token ${SESSION_TOKEN}`,
    "Content-Type": "application/json"
  }
};

export const params = {
  headers: {
    "Content-Type": "text/plain"
  }
};

export const queryParams = {
  headers: {
    "Content-Type": "application/json"
  }
};
