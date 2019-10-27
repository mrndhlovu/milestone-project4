import { getPageId } from "../utils/urls";
import { APP_TYPE } from "./constants";

const HEADER_TEXT = {
  home: {
    headerText: "Unicorn Attractor",
    headerButtonUrl: "/pricing",
    headerButtonText: "Get Started",
    subHeading: "Head start on coding issues and save hours!"
  },
  dashboard: {
    headerText: "Dashboard",
    headerButtonUrl: "/pricing",
    headerButtonText: "See what suits you!",
    subHeading: "How it will work for you?!"
  },
  pricing: {
    headerText: "Pricing",
    headerButtonUrl: "/create-ticket",
    headerButtonText: "File a ticket",
    subHeading: "Problems are everywhere, solutions are here!"
  },
  tickets: {
    headerText: "Tickets",
    headerButtonUrl: "/create-ticket",
    headerButtonText: "Open a ticket",
    subHeading: "Bug fixes are FREE! Features require payment for development!"
  },
  blog: {
    headerText: "Unicorn Blog",
    headerButtonUrl: "/new-article",
    headerButtonText: "Create an article",
    subHeading: "Share your content and your ideas!"
  },
  checkout: {
    headerText: "Shopping Cart",
    headerButtonUrl: "/checkout",
    headerButtonText: "Cart",
    subHeading: "Your shopping cart"
  }
};

export const getDynamicHeader = option => {
  const ticketObject = {
    headerText: "Open a ticket",
    headerButtonUrl: "/tickets",
    headerButtonText: "Tickets List",
    subHeading: "Bug fixes are FREE! Features require payment for development!"
  };

  const articleObject = {
    headerText: "Create your article",
    headerButtonUrl: "/blog",
    headerButtonText: "Article List",
    subHeading: "Share your content and your ideas!"
  };

  if (option === APP_TYPE.post) {
    return articleObject;
  } else {
    return ticketObject;
  }
};

export const getHeaderObject = () => {
  const pageId = getPageId();
  let headerObject;

  Object.keys(HEADER_TEXT).forEach(key => {
    if (pageId === key) {
      headerObject = HEADER_TEXT[key];
    }
  });

  return headerObject;
};
