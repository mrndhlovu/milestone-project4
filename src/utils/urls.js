import { SESSION_TOKEN } from "../constants/localStorageConstants";
import { hasSelectedMembership } from "../utils/appUtils";

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

export const getPageId = () => {
  const location = window.location.pathname.slice(1);
  return location === "" ? "home" : location;
};

export const getRedirectParam = membershipType => {
  let location = getPageId();

  if (location === "pricing" && !hasSelectedMembership(membershipType)) {
    return "/signup";
  } else {
    return "/cart";
  }
};
