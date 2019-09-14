import { MEMBERSHIP_OPTIONS, USER_PROFILE } from "../constants/constants";

export const getPageId = () => {
  const location = window.location.pathname.slice(1);
  const pageId = location === "" ? "home" : location;

  return pageId;
};

export const getSelectedMemberShip = choice => {
  let selectedMembership;

  Object.keys(MEMBERSHIP_OPTIONS).forEach(option => {
    if (choice === MEMBERSHIP_OPTIONS[option].membership_type)
      return (selectedMembership = MEMBERSHIP_OPTIONS[option].membership_type);
  });

  return selectedMembership;
};

export const getUser = () => JSON.parse(localStorage.getItem("client"));

export const isTicketOwner = id => {
  if (getUser()) {
    return getUser().userId === id;
  } else {
    return false;
  }
};

export const hasProMembership = () => {
  if (getUser()) {
    return getUser().currentMembership === "pro";
  } else {
    return false;
  }
};
export const isAuthenticated = () => {
  const token = localStorage.getItem("sessionToken");

  return getUser() && getUser().currentMembership && getUser().userId && token;
};

export const destroyLocalStorage = () => window.localStorage.clear();

export const createUserProfile = (
  username,
  userId,
  email,
  currentMembership
) => {
  const profile = JSON.stringify({
    ...USER_PROFILE,
    username,
    userId,
    email,
    currentMembership
  });

  localStorage.setItem("client", profile);
};

export const refresh = () => window.location.reload();

export const capitalizeFirstLetter = string =>
  string.charAt(0).toUpperCase() + string.slice(1);

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

export const getMembershipType = type => {
  return {
    membership_type: `${type}`
  };
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

export const slugify = text => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
