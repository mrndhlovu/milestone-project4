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
  const hasMembership = getUser();
  return (
    hasMembership &&
    hasMembership.currentMembership &&
    hasMembership.userId &&
    token
  );
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
