export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://the-unicorn-attractor.herokuapp.com"
    : process.env.REACT_APP_DEV_API_URL;
