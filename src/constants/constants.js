import styled from "styled-components";
import { Container } from "semantic-ui-react";

export const StyledContainerWrapper = styled(Container)`
  padding-top: 1.5rem;
`;

export const UNICORN_FREE_SERVICES = [
  "View Tickets",
  "Make donations",
  "View bugs and features status"
];

export const UNICORN_PRO_SERVICES = [
  "Make donations",
  "View bugs and features status",
  "View tickets",
  "Create tickets",
  "Vote on tickets",
  "Comment on tickets",
  "Blog access"
];

export const NAVIGATION_LINKS = [
  { header: "Home", key: "home" },
  { header: "Dashboard", key: "dashboard" },
  { header: "Pricing", key: "pricing" },
  { header: "Tickets", key: "tickets" },
  { header: "Blog", key: "blog-article-list" }
];

export const MEMBERSHIP_OPTIONS = {
  free: {
    membership_type: "free"
  },
  pro: {
    membership_type: "pro"
  }
};

export const USER_PROFILE = {
  username: "",
  userId: "",
  email: "",
  currentMembership: ""
};

export const INITIAL_STATE = {
  data: {},
  dataReceived: false,
  hasError: false,
  isLoading: false
};

export const AUTH_INITIAL_STATE = {
  hasError: false,
  isLoading: false,
  isAuthenticated: false
};
