import { SESSION_TOKEN } from "../constants/localStorageConstants";

export const getRootUrl =
  process.env.NODE_ENV === "production"
    ? "https://the-unicorn-attractor.herokuapp.com"
    : process.env.REACT_APP_DEV_API_URL;

export const TICKETS_EP = `${getRootUrl}/tickets/`;
export const BLOG_EP = `${getRootUrl}/blog/`;
export const COMMENTS_EP = `${getRootUrl}/comments/`;
export const MEMBERSHIP_EP = `${getRootUrl}/memberships/`;
export const AUTH_EP = `${getRootUrl}/accounts/api/auth/`;
export const CHECKOUT_EP = `${getRootUrl}/cart`;

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

export const getCheckoutBody = (product_id, product, donation) => ({
  product_id,
  product,
  donation,
  stripeToken: localStorage.getItem("stripeToken")
});

export const getPageId = () => {
  const location = window.location.pathname.slice(1);
  return location === "" ? "home" : location;
};
