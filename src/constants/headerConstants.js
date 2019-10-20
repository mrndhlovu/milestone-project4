import { getPageId } from "../utils/urls";

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
    headerButtonText: "Create a ticket",
    subHeading: "Head start on coding issues and save hours!"
  },
  blog: {
    headerText: "Unicorn Blog",
    headerButtonUrl: "/new-article",
    headerButtonText: "Create article",
    subHeading: "Head start on coding issues and save hours!"
  },
  checkout: {
    headerText: "Shopping Cart",
    headerButtonUrl: "/checkout",
    headerButtonText: "Cart",
    subHeading: "Your shopping cart"
  }
};

export const getHeaderElements = () => {
  const pageId = getPageId();
  let headerObject;

  Object.keys(HEADER_TEXT).forEach(header => {
    if (pageId === header) {
      headerObject = HEADER_TEXT[header];
    }
  });

  return headerObject;
};
