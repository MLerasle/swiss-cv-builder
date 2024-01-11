import smoothscroll from "smoothscroll-polyfill";

export const scrollToElement = (id) => {
  // Polyfill that fixes smooth scroll bug in Safari
  smoothscroll.polyfill();

  const element = document.getElementById(id).offsetTop;

  window.scrollTo({
    left: 0,
    top: element,
    behavior: "smooth",
  });
};
