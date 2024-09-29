export function createSection(className = "section") {
  const section = document.createElement("section");
  section.setAttribute("class", className);
  return section;
}

export function createImage(src, className = "section-image") {
  const img = document.createElement("img");
  img.setAttribute("class", className);
  img.src = src;
  return img;
}

export function createButton(text, onClick) {
  const button = document.createElement("button");
  button.textContent = text;
  button.addEventListener("click", onClick);
  return button;
}

export function createParagraph(className = "section-text", text = "") {
  const p = document.createElement("p");
  p.setAttribute("class", className);
  p.textContent = text;
  return p;
}

export function createChoicesContainer(buttons) {
  const choicesContainer = document.createElement("div");
  choicesContainer.setAttribute("class", "choices-container");

  buttons.forEach((button) => choicesContainer.appendChild(button));

  return choicesContainer;
}

export function typeText(element, text, speed = 50, callback) {
  let index = 0;

  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, speed);
    } else if (callback) {
      callback();
    }
  }

  element.textContent = "";
  type();
}

export function clearAndNextPage(currentSectionClass, callback) {
  const currentSection = document.querySelector(`.${currentSectionClass}`);

  if (currentSection) {
    currentSection.classList.add("slide-out");

    setTimeout(() => {
      document.body.innerHTML = "";
      callback();
    }, 1000);
  } else {
    console.error(
      `No element with class "${currentSectionClass}" found to clear.`
    );
    callback();
  }
}
