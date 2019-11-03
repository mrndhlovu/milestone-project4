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
  { header: "Home", key: "/home" },
  { header: "Dashboard", key: "/dashboard" },
  { header: "Pricing", key: "/pricing" },
  { header: "Tickets", key: "/tickets" },
  { header: "Blog", key: "/blog" }
];

export const FOOTER_LINKS = [
  { header: "Blog", key: "blog" },
  { header: "Cart", key: "checkout" },
  { header: "Pricing", key: "pricing" },
  { header: "Tickets", key: "tickets" },
  { header: "Dashboard", key: "dashboard" }
];

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

export const DONATION_AMOUNTS = Object.freeze({
  three: 3,
  five: 5,
  ten: 10,
  fifteen: 15
});

export const APP_TYPE = Object.freeze({
  membership: "membership",
  post: "post",
  ticket: "ticket"
});

export const MEMBERSHIP_TYPE = Object.freeze({ pro: "pro", free: "free" });

export const COMMENT_TYPE = Object.freeze({
  comment: "comment",
  reply: "reply"
});

export const ACCOUNT_CHANGE_OPTION = Object.freeze({
  downgrade: "downgrade",
  deactivate: "deactivate"
});

export const TICKET_STATUS = Object.freeze({
  todo: "todo",
  doing: "doing",
  done: "done",
  is_bug: "is_bug",
  is_feature: "is_feature"
});

export const EDIT_FIELDS = [
  "description",
  "title",
  "subject",
  "priority_level",
  "content"
];

export const DEFAULT_IMAGES = {
  user: "https://unicorn-ecommerce.s3-eu-west-1.amazonaws.com/deafult.png",
  signup:
    "https://unicorn-ecommerce.s3-eu-west-1.amazonaws.com/defaults/unicorn-signup-image.jpg",
  login:
    "https://unicorn-ecommerce.s3-eu-west-1.amazonaws.com/defaults/unicorn-login-image.png",
  homeImage1:
    "https://unicorn-ecommerce.s3-eu-west-1.amazonaws.com/defaults/unicorn-image_1.jpg",
  homeImage2:
    "https://unicorn-ecommerce.s3-eu-west-1.amazonaws.com/defaults/unicorn_image_2.jpg"
};
