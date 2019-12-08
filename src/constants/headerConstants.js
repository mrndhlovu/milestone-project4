export const HEADER_TEXT = {
  home: {
    headerText: "Unicorn Attractor",
    headerButtonUrl: "/tickets",
    headerButtonText: "Get Started",
    subHeading: "Head start on coding issues and save hours!"
  },
  dashboard: {
    headerText: "Dashboard",
    headerButtonUrl: "/blog",
    headerButtonText: "Checkout the Blog!",
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
    headerButtonUrl: "/pricing",
    headerButtonText: "Create an account",
    subHeading: "Bug fixes are FREE! Features require payment for development!"
  },
  "user-profile": {
    headerText: "Your profile",
    headerButtonUrl: "/create-ticket",
    headerButtonText: "Open a ticket",
    subHeading: "Bug fixes are FREE! Features require payment for development!",
    image: ""
  },
  blog: {
    headerText: "Unicorn Blog",
    headerButtonUrl: "/new-article",
    headerButtonText: "Post an article",
    subHeading: "Share your content and your ideas!"
  },
  checkout: {
    headerText: "Cart is empty",
    headerButtonUrl: "/checkout",
    headerButtonText: "",
    subHeading: ""
  },
  "open-ticket": {
    headerText: "Open a ticket",
    headerButtonUrl: "/tickets",
    headerButtonText: "Tickets List",
    subHeading: "Bug fixes are FREE! Features require payment for development!"
  },
  "create-article": {
    headerText: "Create your article",
    headerButtonUrl: "/blog",
    headerButtonText: "Article List",
    subHeading: "Share your content and your ideas!"
  }
};

export const getHeaderObject = pageId => {
  let headerObject;

  Object.keys(HEADER_TEXT).forEach(key => {
    if (pageId === key) {
      headerObject = HEADER_TEXT[key];
    }
  });

  return headerObject;
};
