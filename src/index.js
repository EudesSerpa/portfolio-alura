// Menu mobile
const hamburgerMenu = document.querySelector(".header__hamburger");
const headerMenu = document.querySelector(".header__nav");
const headerMenuList = document.querySelector(".header__nav-list");

hamburgerMenu.addEventListener("click", () => {
  hamburgerMenu.classList.toggle("open");
  headerMenuList.classList.toggle("open");
  headerMenu.classList.toggle("open");

  if (hamburgerMenu.classList.contains("open")) {
    hamburgerMenu.classList.remove("close");
  } else {
    hamburgerMenu.classList.add("close");
  }
});
