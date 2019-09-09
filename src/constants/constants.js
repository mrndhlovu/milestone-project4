import styled from "styled-components";
import { Container } from "semantic-ui-react";

export const StyledContainerWrapper = styled(Container)`
  padding-top: 1.5rem;
`;

export const unicornFreeServices = [
  "View Tickets",
  "Make donations",
  "View bugs and features status"
];

export const unicornProServices = [
  "Make donations",
  "View bugs and features status",
  "View tickets",
  "Create tickets",
  "Vote on tickets",
  "Comment on tickets",
  "Blog access"
];

export const navLinkText = [
  { header: "Home", key: "home" },
  { header: "Products", key: "products" },
  { header: "Pricing", key: "pricing" },
  { header: "Tickets", key: "tickets" },
  { header: "Blog", key: "blog-article-list" }
];

export const slugify = text => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};

export const getFormatedDate = rawDate => {
  const date = new Date(rawDate);

  return (
    date.getFullYear() +
    "-" +
    ("0" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("0" + date.getDate()).slice(-2) +
    " " +
    ("0" + date.getHours()).slice(-2) +
    ":" +
    ("0" + date.getMinutes()).slice(-2)
  );
};

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

export const MEMBERSHIP_OPTIONS = {
  free: {
    membership_type: "free"
  },
  pro: {
    membership_type: "pro"
  }
};

export const getMembershipType = type => {
  return {
    membership_type: `${type}`
  };
};

export const getTransactionUpdate = () => {
  const subscriptionId = localStorage.getItem("subscriptionId");
  const selectedMembership = localStorage.getItem("selectedMembership");

  return {
    subscription_id: `${subscriptionId}`,
    membership_type: `${selectedMembership}`
  };
};

export const getChoosenMembership = () => {
  const token = localStorage.getItem("stripeToken");
  const selectedMembership = localStorage.getItem("selectedMembership");

  return {
    membership_type: `${selectedMembership}`,
    stripeToken: `${token}`
  };
};
