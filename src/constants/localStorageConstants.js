export const STRIPE_TOKEN = localStorage.getItem("stripeToken");

export const SESSION_TOKEN = localStorage.getItem("sessionToken");

export const SESSION_LIFE = localStorage.getItem("sessionLife");

export const SUBCRIPTION_ID = localStorage.getItem("subscriptionId");

export const MEMBERSHIP_SELECTED = localStorage.getItem("selectedMembership");

export const CURRENT_MEMBERSHIP = localStorage.getItem("currentMembership");

export const asyncLocalStorage = {
  setItem: async (key, value) => {
    await Promise.resolve();
    localStorage.setItem(key, value);
  },
  getItem: async key => {
    await Promise.resolve();
    return localStorage.getItem(key);
  }
};
