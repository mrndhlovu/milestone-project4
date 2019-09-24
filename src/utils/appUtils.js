import { USER_PROFILE } from "../constants/constants";

const cart = JSON.parse(localStorage.getItem("cart"));

export const getSelectedMemberShip = () =>
  localStorage.getItem("selectedMembership");

export const getUser = () => JSON.parse(localStorage.getItem("customer"));

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

export const destroyLocalStorage = keys => {
  keys.forEach(key => {
    localStorage.removeItem(key);
  });
};

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
  localStorage.setItem("currentMembership", currentMembership);
  localStorage.setItem("customer", profile);
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

export const getCurrentMembership = () => {
  const membership = localStorage.getItem("currentMembership");

  if (membership === "pro") return "pro";
  else if (membership === "free") return "free";
  else return "guest";
};

export const getChoosenMembership = () => {
  const token = localStorage.getItem("stripeToken");
  const selectedMembership = localStorage.getItem("selectedMembership");

  return {
    membership_type: `${selectedMembership}`,
    stripeToken: `${token}`
  };
};

export const getMembershipType = () => {
  return {
    membership_type: `${"pro"}`
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

export const getObjectLength = object => {
  return object !== "" && Object.keys(object).length;
};

export const itemInCart = () => {
  if (cart && cart.membershipType) {
    return true;
  }
  return false;
};

export const hasMembership = query => {
  const membership = localStorage.getItem("currentMembership");
  if (membership === query) return true;
  return false;
};

export const hasSelectedMembership = query => {
  if (cart && cart.membershipType === query) {
    return true;
  }
  return false;
};

export const getMembershipButtonText = () => {
  if (hasMembership("free")) {
    return {
      free: hasMembership("free") ? "Your current membership" : "Add to cart",
      pro: hasSelectedMembership("pro") ? "item in your cart" : "Add to cart"
    };
  } else if (hasMembership("pro")) {
    return {
      free: "Downgrade to unicorn-free",
      pro: "item in your cart"
    };
  } else {
    return {
      free: hasSelectedMembership("free") ? "item in your cart" : "Add to cart",
      pro: hasSelectedMembership("pro") ? "item in your cart" : "Add to cart"
    };
  }
};
