import moment from "moment";
import { Responsive } from "semantic-ui-react";
import { USER_PROFILE, APP_TYPE } from "../constants/constants";

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

export const getDate = dateValue => {
  const newDate = new Date(`${dateValue}`);
  const day = newDate.getDate();
  const month = newDate.getMonth();
  const year = newDate.getFullYear();

  return year + "-" + month + "-" + day;
};

export const getFormatedDate = lastUpdate => {
  // From stackoverflow
  const now = new Date();
  const previous = new Date(lastUpdate);

  const msPerMinute = 60 * 1000;
  const msPerHour = msPerMinute * 60;
  const msPerDay = msPerHour * 24;
  const msPerMonth = msPerDay * 30;
  const msPerYear = msPerDay * 365;

  const elapsed = now - previous;

  const timeAgo = () => {
    if (elapsed < msPerMinute) {
      return `${Math.round(elapsed / 1000)} seconds ago`;
    } else if (elapsed < msPerHour) {
      return `${Math.round(elapsed / msPerMinute)} minutes ago`;
    } else if (elapsed < msPerDay) {
      return `${Math.round(elapsed / msPerHour)} hours ago`;
    } else if (elapsed < msPerMonth) {
      return `${Math.round(elapsed / msPerDay)} days ago`;
    } else if (elapsed < msPerYear) {
      return `${Math.round(elapsed / msPerMonth)} months ago`;
    } else {
      return `${Math.round(elapsed / msPerYear)} years ago`;
    }
  };

  return timeAgo();
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

export const getWidth = () => {
  const isSSR = typeof window === "undefined";

  return isSSR ? Responsive.onlyTablet.minWidth : window.innerWidth;
};

export const validate = values => {
  const formErrors = {};

  if (!values.title) {
    formErrors.title = "A title is required";
  }
  if (!values.description) {
    formErrors.description = "A description is required";
  }
  if (!values.subject) {
    formErrors.subject = "A subject is required";
  }
  if (!values.content) {
    formErrors.content = "Article content is required";
  }

  if (!values.username) {
    formErrors.username = "A username is required";
  }
  if (!values.password) {
    formErrors.password = "A password is required";
  }

  if (!values.confirm_password) {
    formErrors.confirm_password = "A confirmation password is required";
  }
  if (!values.email) {
    formErrors.email = "A email is required";
  }
  if (!values.first_name) {
    formErrors.first_name = "A name is required";
  }

  if (!values.last_name) {
    formErrors.last_name = "lastname is required";
  }
  return formErrors;
};

export const getTicketTotals = tickets => {
  let counts = { bugCount: 0, featureCount: 0, closed: 0 };

  Object.keys(tickets).filter(key => {
    if (tickets[key].is_bug) {
      return { ...counts, bugCount: counts.bugCount++ };
    }
    if (tickets[key].is_feature) {
      return { ...counts, featureCount: counts.featureCount++ };
    }

    if (tickets[key].status === "done") {
      return { ...counts, closed: counts.closed++ };
    }
    return counts;
  });

  return counts;
};

export const getAwsConfig = app => {
  const ARTICLE_CONFIG = app === APP_TYPE.post;

  const config = {
    bucketName: `${process.env.REACT_APP_AWS_BUCKET_NAME}`,
    dirName: `${
      ARTICLE_CONFIG
        ? process.env.REACT_APP_AWS_MEDIA_POST
        : process.env.REACT_APP_AWS_MEDIA_USER
    }`,
    region: `${process.env.REACT_APP_AWS_REGION}`,
    accessKeyId: `${process.env.REACT_APP_AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.REACT_APP_AWS_SECRET_ACCESS_KEY}`
  };

  return config;
};

// from Ben Award Youtube
export const getNewFileName = filename => {
  const date = moment().format("MM-DD-YYYY");
  const randomString = Math.random()
    .toString(36)
    .substring(2, 7);
  const cleanFileName = filename.toLowerCase().replace(/[^a-z0-9]/g, "-");
  const newFilename = `${randomString}-${date}-${cleanFileName}`;
  return newFilename.substring(0, 60);
};

export const emptyFunction = () => {};

const VIA_MESSAGES = {
  tickets: "Signup with a PRO account to file a ticket",
  blog: "You need a PRO account to create post an article",
  "new-article": "Login or signup first to post an article",
  article: "Login or signup first to read an article",
  "ticket-detail": "Read comments and comment with a PRO Account",
  "user-profile": "Your profile page",
  "create-ticket": "File a ticket"
};

export const getViaMessage = via => {
  let message;
  Object.keys(VIA_MESSAGES).forEach(key => {
    if (key === via) message = VIA_MESSAGES[key];
  });
  return message;
};
