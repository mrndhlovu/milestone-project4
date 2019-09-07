export const getPageId = () => {
  const location = window.location.pathname.slice(1);
  const pageId = location === "" ? "home" : location;

  return pageId;
};
