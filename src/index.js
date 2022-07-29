import { delayTime } from "../utils/delayTime.js";

// Menu mobile
const hamburgerMenuIcon = document.querySelector(".header__hamburger");
const headerMenuList = document.querySelector(".header__nav-list");

const closeMenu = () => {
  const isOpen = hamburgerMenuIcon.classList.toggle("open");
  headerMenuList.classList.toggle("open");

  hamburgerMenuIcon.setAttribute("aria-expanded", isOpen);

  // For close animation
  if (hamburgerMenuIcon.classList.contains("open")) {
    hamburgerMenuIcon.classList.remove("close");
  } else {
    hamburgerMenuIcon.classList.add("close");
  }
};

headerMenuList.addEventListener("click", (e) => {
  if (e.target.tagName !== "A") return;

  closeMenu();
});
hamburgerMenuIcon.addEventListener("click", closeMenu);

// Typing text: Professions
const professions = ["Electronic Engineer", "Web Developer"];

const professionNode = document.querySelector(".home__profession");

const typingText = ({ text, speed }) => {
  const letters = text.split("");
  let letter = 0;

  const timer = setInterval(() => {
    if (letter === letters.length) {
      clearInterval(timer);
    } else {
      professionNode.textContent += letters[letter];
      letter++;
    }
  }, speed);
};

const deleteText = ({ node, speed }) => {
  const letters = node.textContent.split("");
  let letter = letters.length;

  const timer = setInterval(() => {
    if (letter === 0) {
      clearInterval(timer);
    } else {
      letters.pop();
      node.textContent = letters.join("");
      letter--;
    }
  }, speed);
};

const carouselText = async () => {
  let words = 0;
  const writeSpeed = 120;
  const deleteSpeed = 80;
  const delayToDelete = 500;

  while (true) {
    if (words === professions.length) {
      words = 0;
    }

    const text = professions[words];

    typingText({ text, speed: writeSpeed });

    await delayTime(writeSpeed * text.length + delayToDelete);

    deleteText({ node: professionNode, speed: deleteSpeed });

    await delayTime(writeSpeed * text.length);

    words++;
  }
};

carouselText();

// Button scroll down
const scrollButton = document.querySelector(".btn-scroll");

scrollButton.addEventListener("click", () => {
  const nextSection = document.querySelector(".about");

  window.scrollTo({
    top: nextSection.offsetTop,
  });
});
