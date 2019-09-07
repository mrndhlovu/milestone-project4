import { MEMBERSHIP_OPTIONS } from "../constants/constants";

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
