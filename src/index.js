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

// Contact form validations
const form = document.querySelector(".contact__form");
const formInputs = document.querySelectorAll(".form__input");

const states = {
  VALID: "valid",
  INVALID: "invalid",
};

const constraints = {
  name: {
    required: true,
    errorMessages: {
      required: "Name field cannot be empty",
    },
  },
  email: {
    required: true,
    regex:
      /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/,
    errorMessages: {
      required: "Email field cannot be empty",
      regex: "Email format is invalid",
    },
  },
  subject: {
    required: true,
    regex: /^\w{2,}/i,
    errorMessages: {
      required: "Subject field cannot be empty",
      regex: "Subject  must be a word with at least 2 letters",
    },
  },
  message: {
    required: true,
    minLength: 10,
    errorMessages: {
      required: "Message field cannot be empty",
      minLength: "Message must be at least 10 characters long",
    },
  },
};

const setClassName = ({ node, className }) => {
  node.classList.add(className);
};

const removeClassName = ({ node, className }) => {
  node.classList.remove(className);
};

const renderInlineError = ({ errorElement, error }) => {
  errorElement.innerHTML = `
    <span class="visually-hidden">Error: </span>
    ${error}
  `;
};

const clearInlineError = ({ errorElement }) => {
  errorElement.innerText = "";
};

const clearValidationStates = ({ node }) => {
  Object.values(states).forEach((state) => {
    removeClassName({ node, className: state });
  });
};

const renderValidationState = ({ node, state }) => {
  clearValidationStates({ node });

  if (state === states.INVALID) {
    setClassName({ node, className: states.INVALID });
  } else {
    setClassName({ node, className: states.VALID });
  }
};

const validateField = ({ name, value }) => {
  const { required, regex, minLength, errorMessages } = constraints[name];
  let isValid = true;
  let error = "";

  if (required && !value) {
    error = errorMessages.required;
  } else if (regex && !regex.test(value)) {
    error = errorMessages.regex;
  } else if (minLength && value.length < minLength) {
    error = errorMessages.minLength;
  }

  if (error) {
    isValid = false;
  }

  return { isValid, error };
};

const checkInput = ({ field }) => {
  const { name, value } = field;
  const formItem = field.closest(".form__item");

  const { isValid, error } = validateField({ name, value });

  if (isValid) {
    field.setAttribute("aria-invalid", false);
    renderValidationState({ node: formItem, state: states.VALID });
  } else {
    field.setAttribute("aria-invalid", true);
    renderValidationState({ node: formItem, state: states.INVALID });
  }

  return { error };
};

const validateHoneypot = () => {
  const isFillOut = document.getElementById("honeypot").value;

  if (isFillOut) return true;

  return false;
};

const validateForm = () => {
  let isValid = true;

  [...formInputs].forEach((input) => {
    const { error } = checkInput({ field: input });

    if (error) isValid = false;
  });

  return isValid;
};

form.addEventListener("focusout", (e) => {
  if (e.target.tagName !== "INPUT" && e.target.tagName !== "TEXTAREA") return;

  const { error } = checkInput({ field: e.target });
  const errorElement = document.getElementById(`${e.target.name}-error`);

  if (error) {
    renderInlineError({ errorElement, error });
    return;
  }

  clearInlineError({ errorElement });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const isBotxD = validateHoneypot();
  if (isBotxD) {
    console.log("You're a bot 🤖. Hahaha! Or not?");
    return;
  }

  const isValid = validateForm();

  if (!isValid) {
    const firstErrorElement = document.querySelector("[aria-invalid=true]");
    firstErrorElement.focus();
    return;
  }

  const formItems = document.querySelectorAll(".form__item");
  formItems.forEach((node) => {
    clearValidationStates({ node });
  });

  form.reset();

  console.log("Form sent successfully!");
});
