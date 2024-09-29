import { images } from "./images.js";

import {
  createSection,
  createImage,
  createButton,
  createParagraph,
  createChoicesContainer,
  typeText,
  clearAndNextPage,
} from "./elements.js";

// Opening Page
function generateOpenSection() {
  const openSection = createSection("open-section");

  const openSectionTitleContainer = document.createElement("div");
  openSectionTitleContainer.setAttribute("class", "section-title-container");

  const mainTitle = document.createElement("h1");
  mainTitle.textContent = "Sagas of the North:";
  const subTitle = document.createElement("h2");
  subTitle.textContent = "A Viking's Tale";

  openSectionTitleContainer.appendChild(mainTitle);
  openSectionTitleContainer.appendChild(subTitle);

  const startButton = createButton("Start Game", () => {
    clearAndNextPage("open-section", generateIntroSection);
  });

  startButton.id = "start-button";

  openSection.appendChild(openSectionTitleContainer);
  openSection.appendChild(startButton);

  document.body.appendChild(openSection);
}

generateOpenSection();

// Opening Title
const text =
  "You are a young Viking named Erik, recently arrived in a world full of adventures and ancient mysteries. Your village, Skjald, is thriving, but recently it was attacked by mysterious creatures. Shortly after the attack, residents began to disappear, and strange signs appeared in the surrounding lands. You must solve the mystery of the disappearances and protect your village from further threats...";
const speed = 60;

function generateIntroSection() {
  const introSection = createSection("section");

  const villageImage = createImage(images.village);
  introSection.appendChild(villageImage);

  const introText = createParagraph("section-text");
  introSection.appendChild(introText);

  document.body.appendChild(introSection);

  showIntroText(introText, text, speed);
}

function showIntroText(introText, text, speed) {
  let j = 0;

  function typeText() {
    if (j < text.length) {
      introText.textContent += text.charAt(j);
      j++;
      setTimeout(typeText, speed);
    } else {
      const beginButton = createButton("Begin...", () => {
        clearAndNextPage("section", generateFirstChapter);
      });
      beginButton.id = "begin-button";

      const introSection = document.querySelector(".section");
      introSection.appendChild(beginButton);
    }
  }

  typeText();
}

const startText =
  "You are in the village of Skjald and notice something unusual: the village seems eerily quiet. You have several options for what to do next.";
const returnText =
  "You have returned to the village. The atmosphere is still quiet, but now it feels a bit more familiar.";

let hasVisitedVillage = false; // Флаг для отслеживания, было ли первое посещение деревни
let hasWon = false;
function generateFirstChapter() {
  const section = createSection("section");

  const villageImage = createImage(images.emptyVillage, "section-image");
  section.appendChild(villageImage);

  const introText = createParagraph("section-text");
  section.appendChild(introText);

  document.body.appendChild(section);

  if (!hasVisitedVillage) {
    showStartText(section, startText);
    hasVisitedVillage = true; // Устанавливаем флаг после первого посещения
  } else {
    showStartText(section, returnText);
  }
}

function showStartText(section, textToShow) {
  const textPlace = section.querySelector(".section-text");
  let j = 0; // Переменная для отслеживания позиции в тексте

  function typeText() {
    if (j < textToShow.length) {
      textPlace.textContent += textToShow.charAt(j);
      j++;
      setTimeout(typeText, speed);
    } else {
      // Создаем кнопки для выбора
      const choiceButtons = [
        { text: "Go Home", action: generateHomePage },
        { text: "Explore the Village Outskirts", action: generateExplorePage },
        { text: "Talk to the Remaining Villagers", action: generateTalkPage },
      ];

      const choicesContainer = createChoicesContainer(
        choiceButtons.map((choice) => {
          const button = createButton(choice.text, () => {
            clearAndNextPage("section", choice.action);
          });
          return button;
        })
      );

      section.appendChild(choicesContainer);
    }
  }

  typeText();
}

// Function to generate the Home Page

let hasVisitedHome = false; // Глобальная переменная для отслеживания посещений

function generateHomePage() {
  const section = createSection("section");

  const homeImage = createImage(images.home, "section-image");
  section.appendChild(homeImage);

  const homeText = createParagraph("section-text");
  section.appendChild(homeText);

  document.body.appendChild(section);

  let textToShow;

  if (!hasVisitedHome) {
    textToShow =
      "You enter your home. It looks in order, but you notice that a few important things are missing, including your father's ancient amulet.";
    hasVisitedHome = true; // Устанавливаем флаг после первого посещения
  } else {
    textToShow = "You need to dicide what to do next..";
  }

  typeText(homeText, textToShow, 50, () => {
    const choiceButtons = [
      { text: "Search for Missing Items", action: generateSearchPage },
      { text: "Check Food Supplies", action: generateFoodCheckPage },
      { text: "Back to Village", action: generateFirstChapter },
    ];

    const choicesContainer = createChoicesContainer(
      choiceButtons.map((choice) => {
        const button = createButton(choice.text, () => {
          clearAndNextPage("section", choice.action);
        });
        return button;
      })
    );

    section.appendChild(choicesContainer);
  });
}

function generateSearchPage() {
  const section = createSection("section");

  const searchImage = createImage(images.home, "section-image");
  section.appendChild(searchImage);

  const searchText = createParagraph("section-text");
  section.appendChild(searchText);

  document.body.appendChild(section);

  typeText(
    searchText,
    "You search for the missing items and find several notes with mysterious symbols. They might be important for your investigation.",
    speed,
    () => {
      const choiceButton = createButton("Back", () => {
        clearAndNextPage("section", generateHomePage);
      });

      const choicesContainer = createChoicesContainer([choiceButton]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateFoodCheckPage() {
  const section = createSection("section");

  const foodCheckImage = createImage(images.home, "section-image");
  section.appendChild(foodCheckImage);

  const foodCheckText = createParagraph("section-text");
  section.appendChild(foodCheckText);

  document.body.appendChild(section);

  typeText(
    foodCheckText,
    "You check the food supplies and find that many of the products have spoiled. This might be related to the recent events.",
    speed,
    () => {
      const choiceButton = createButton("Back", () => {
        clearAndNextPage("section", generateHomePage);
      });

      const choicesContainer = createChoicesContainer([choiceButton]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateExplorePage() {
  const section = createSection("section");

  const exploreImage = createImage(images.forest, "section-image");
  section.appendChild(exploreImage);

  const exploreText = createParagraph("section-text");
  section.appendChild(exploreText);

  document.body.appendChild(section);

  typeText(
    exploreText,
    "You are exploring the surroundings of the village and find tracks leading into the forest. The forest seems dark and ominous. Strange sounds come from the depths of the forest.",
    speed,
    () => {
      const choice1 = createButton("Follow the tracks into the forest", () => {
        clearAndNextPage("section", generateFollowTracksPage);
      });

      const choice2 = createButton("Return to the village", () => {
        clearAndNextPage("section", generateFirstChapter);
      });

      const choicesContainer = createChoicesContainer([choice1, choice2]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateFollowTracksPage() {
  const section = createSection("section");

  const followTracksImage = createImage(images.forestSh, "section-image");
  section.appendChild(followTracksImage);

  const followTracksText = createParagraph("section-text");
  section.appendChild(followTracksText);

  document.body.appendChild(section);

  typeText(
    followTracksText,
    "You follow the tracks and find an old cabin bathed in a mystical glow. Inside the cabin, you find mysterious objects and signs. Suddenly, you hear a strange rustle...",
    speed,
    () => {
      const choice1 = createButton("Prepare for battle", () => {
        clearAndNextPage("section", generateBattlePage);
      });

      const choice2 = createButton("Run back to the village", () => {
        clearAndNextPage("section", generateFirstChapter);
      });

      const choicesContainer = createChoicesContainer([choice1, choice2]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateBattlePage() {
  const section = createSection("section");

  const battleImage = createImage(images.battle, "section-image");
  section.appendChild(battleImage);

  const battleText = createParagraph("section-text");
  section.appendChild(battleText);

  document.body.appendChild(section);

  typeText(
    battleText,
    "You are surrounded... What will you do next?",
    speed,
    () => {
      const choice1 = createButton("Fight", () => {
        clearAndNextPage("section", generateBattleEndingPage);
      });

      const choice2 = createButton("Surrender", () => {
        clearAndNextPage("section", generateYouLostPage);
      });

      const choicesContainer = createChoicesContainer([choice1, choice2]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateYouLostPage() {
  const section = createSection("section");

  const lostImage = createImage(images.loss, "section-image");
  section.appendChild(lostImage);

  const lostText = createParagraph("section-text");
  section.appendChild(lostText);

  document.body.appendChild(section);

  typeText(
    lostText,
    "You fought bravely, but there were too many enemies... Now you're drinking grog with Thor!",
    speed,
    () => {
      const choice1 = createButton("Return to the beginning", () => {
        clearAndNextPage("section", generateFirstChapter);
      });

      const choicesContainer = createChoicesContainer([choice1]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateBattleEndingPage() {
  let player = {
    health: 100,
    strength: 10,
  };

  let vikings = {
    health: 90,
    strength: 7,
  };

  const section = document.createElement("section");
  section.setAttribute("class", "section");

  const battleImage = document.createElement("img");
  battleImage.setAttribute("class", "section-image");
  battleImage.src = images.battle;
  section.appendChild(battleImage);

  const battleText = document.createElement("p");
  battleText.setAttribute("class", "section-text");
  section.appendChild(battleText);

  document.body.appendChild(section);

  async function battle() {
    while (player.health > 0 && vikings.health > 0) {
      const playerAttack = Math.floor(Math.random() * player.strength) + 5;
      const vikingsAttack = Math.floor(Math.random() * vikings.strength) + 2;

      vikings.health -= playerAttack;
      player.health -= vikingsAttack;

      // Update battle status text
      battleText.textContent = `You dealt ${playerAttack} damage to the vikings. Vikings have ${vikings.health} HP left.\n`;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      battleText.textContent += `The vikings dealt ${vikingsAttack} damage to you. You have ${player.health} HP left.\n`;
      await new Promise((resolve) => setTimeout(resolve, 1000));

      if (player.health <= 0 || vikings.health <= 0) {
        break;
      }
    }

    // Determine battle outcome
    if (vikings.health <= 0) {
      battleImage.src = images.win;
      battleText.textContent = "You have won, and the village is now safe!";
    } else if (player.health <= 0) {
      battleImage.src = images.loss;
      battleText.textContent =
        "You fought bravely, but there were too many enemies... Now you're drinking grog with Thor!";
    }

    const choicesContainer = document.createElement("div");
    choicesContainer.setAttribute("class", "choices-container");

    // Add button to return to the start
    const choice1 = document.createElement("button");
    choice1.textContent = "Return to the village";
    choice1.addEventListener("click", () => {
      document.body.innerHTML = "";
      generateNewVillagePage();
    });

    choicesContainer.appendChild(choice1);
    section.appendChild(choicesContainer);
  }

  // Start battle
  battle();
}
function generateTalkPage() {
  const section = createSection("section");

  const talkImage = createImage(images.villagePer, "section-image");
  section.appendChild(talkImage);

  const talkText = createParagraph("section-text");
  section.appendChild(talkText);

  document.body.appendChild(section);

  typeText(
    talkText,
    "You find one of the few remaining villagers. He looks worried and says he has seen shadows and heard strange voices in the forest.",
    50,
    () => {
      const choice1 = createButton("Ask about the shadows and voices", () => {
        clearAndNextPage("section", generateShadowsPage);
      });

      const choice2 = createButton("Ask for help with the search", () => {
        clearAndNextPage("section", generateHelpPage);
      });

      const choicesContainer = createChoicesContainer([choice1, choice2]);
      section.appendChild(choicesContainer);
    }
  );
}
function generateShadowsPage() {
  const section = createSection("section");

  const shadowsImage = createImage(images.forest, "section-image");
  section.appendChild(shadowsImage);

  const shadowsText = createParagraph("section-text");
  section.appendChild(shadowsText);

  document.body.appendChild(section);

  typeText(
    shadowsText,
    "You ask the villager about the shadows and voices. He explains that the shadows might be related to an ancient curse that has long plagued the village.",
    50,
    () => {
      const choice1 = createButton("Ask for help with the search", () => {
        clearAndNextPage("section", generateHelpPage);
      });

      const choicesContainer = createChoicesContainer([choice1]);
      section.appendChild(choicesContainer);
    }
  );
}
function generateHelpPage() {
  const section = createSection("section");

  const helpImage = createImage(images.forest, "section-image");
  section.appendChild(helpImage);

  const helpText = createParagraph("section-text");
  section.appendChild(helpText);

  document.body.appendChild(section);

  typeText(
    helpText,
    "You ask the villager to help you with the search. He agrees, and together you head into the forest to investigate the strange events.",
    50,
    () => {
      const choice1 = createButton("Follow the tracks into the forest", () => {
        clearAndNextPage("section", generateFollowTracksPage);
      });

      const choice2 = createButton("Return to the village", () => {
        clearAndNextPage("section", generateFirstChapter);
      });

      const choicesContainer = createChoicesContainer([choice1, choice2]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateNewVillagePage() {
  const section = createSection("section");

  const searchImage = createImage(images.newVillage, "section-image");
  section.appendChild(searchImage);

  const searchText = createParagraph("section-text");
  section.appendChild(searchText);

  document.body.appendChild(section);

  typeText(
    searchText,
    `After your victory, the village erupted in celebration. Music, dancing, and feasts filled the air as everyone rejoiced in their newfound safety.

The village chief approached you, expressing gratitude for your bravery. He invited you to embark on a sea voyage to explore new lands, saying, “Your courage deserves new adventures. Join us on this journey and continue your epic story.”`,
    speed,
    () => {
      const choiceButton = createButton("Start a new Journey", () => {
        clearAndNextPage("section", generateNewJourneyPage);
      });

      const choicesContainer = createChoicesContainer([choiceButton]);
      section.appendChild(choicesContainer);
    }
  );
}

function generateNewJourneyPage() {
  const section = createSection("section");

  const searchImage = createImage(images.newJourney, "section-image");
  section.appendChild(searchImage);

  const searchText = createParagraph("section-text");
  section.appendChild(searchText);

  document.body.appendChild(section);

  typeText(
    searchText,
    `And so began your journey to the far north. But that’s a story for another time.`,
    speed,
    () => {
      const choiceButton = createButton("Start Page", () => {
        clearAndNextPage("section", generateOpenSection);
      });

      const choicesContainer = createChoicesContainer([choiceButton]);
      section.appendChild(choicesContainer);
    }
  );
}
