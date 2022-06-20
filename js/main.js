const hardWords = [
  "Linkedin",
  "Leetcode",
  "Internet",
  "Paradigm",
  "Programming",
  "JavaScript",
  "TypeScript",
  "Constructor",
  "Function",
  "Inheritance",
  "Prettier",
  "Introduction",
  "Arguments",
  "Container",
  "Animation",
  "Facebook",
  "Instagram",
  "Translate",
  "Keyboard",
  "Redragon",
  "mechanical",
  "Bookmark",
  "Windows",
  "Setting",
  "Explorer",
  "Terminal",
  "Appearance",
  "Secondary",
  "Compatible",
  "Stylesheet",
];

// Array Of Normal Words
const normalWords = [
  "Playing",
  "Working",
  "Country",
  "Testing",
  "Youtube",
  "Twitter",
  "Github",
  "Python",
  "Scala",
  "Styling",
  "Cascade",
  "Coding",
  "Funny",
  "Hello",
  "Level",
  "World",
  "Start",
  "Runner",
  "Roles",
  "Class",
  "Super",
  "Spell",
  "Spaces",
  "Object",
  "Booking",
  "Reading",
  "React",
  "Redux",
  "Script",
  "Laptop",
];
// Array Of Easy Words
const easyWords = [
  "Code",
  "Town",
  "Task",
  "Test",
  "Rust",
  "Data",
  "Date",
  "Name",
  "Age",
  "Word",
  "Live",
  "Love",
  "Like",
  "Java",
  "One",
  "Two",
  "Four",
  "Five",
  "Free",
  "Pro",
  "Host",
  "Book",
  "Face",
  "Top",
  "Back",
  "Lift",
  "Easy",
  "Link",
  "Play",
  "Port",
];
let words;
// Catch Selectors
let chooseLevels = document.querySelector(".choose-levels");
let optionChooseLevels = document.querySelectorAll(".choose-levels option");
let aboutGameSpanOne = document.querySelector(".about-game span:nth-child(1)");
let aboutGameSpanTwo = document.querySelector(".about-game span:nth-child(2)");
let nameGame = document.querySelector(".name");
let container = document.querySelector(".container");
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");

if (chooseLevels.value == "Easy") {
  words = easyWords;
} else if (chooseLevels.value == "Normal") {
  words = normalWords;
} else if (chooseLevels.value == "Hard") {
  words = hardWords;
}

// Setting Levels
const lvls = {
  Easy: 9,
  Normal: 7,
  Hard: 5,
};

let defaultLevelName = chooseLevels.value; // Change Level From Here
let defaultLevelSeconds = lvls[chooseLevels.value];

chooseLevels.onchange = () => {
  // Default Level
  defaultLevelName = chooseLevels.value; // Change Level From Here
  defaultLevelSeconds = lvls[chooseLevels.value];
  lvlNameSpan.innerHTML = defaultLevelName;
  aboutGameSpanOne.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  aboutGameSpanTwo.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  scoreTotal.innerHTML = words.length;
  if (chooseLevels.value == "Easy") {
    words = easyWords;
  } else if (chooseLevels.value == "Normal") {
    words = normalWords;
  } else if (chooseLevels.value == "Hard") {
    words = hardWords;
  }
};

if (chooseLevels.value == "Easy") {
  words = easyWords;
} else if (chooseLevels.value == "Normal") {
  words = normalWords;
} else if (chooseLevels.value == "Hard") {
  words = hardWords;
}

// Setting Level Name + Seconds + Score
lvlNameSpan.innerHTML = defaultLevelName;
aboutGameSpanOne.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
aboutGameSpanTwo.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = words.length;

// Disable Paste Event
input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  input.focus();
  // Generate Word Function
  genWords();
  window.localStorage.clear();
  scoreGot.innerHTML = 0;
};

function genWords() {
  // Get Random Word From Array
  let randomWord = words[Math.floor(Math.random() * words.length)];
  // Get Word Index
  let wordIndex = words.indexOf(randomWord);
  // Remove WordFrom Array
  words.splice(wordIndex, 1);
  // Show The Random Word
  theWord.innerHTML = randomWord;
  // Empty Upcoming Words
  upcomingWords.innerHTML = "";
  // Generate Words
  for (let i = 0; i < words.length; i++) {
    // Create Div Element
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  // Call Start Play Function
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(() => {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      // Stop Timer
      clearInterval(start);
      // Compare Words
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Field
        input.value = "";
        // Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function
          genWords();
        } else {
          input.setAttribute("disabled", "");
          let popup = document.createElement("div");
          popup.className = "con";
          document.body.prepend(popup);

          let button = document.createElement("button");
          button.innerHTML = "X";
          popup.append(button);
          button.addEventListener("click", () => popup.remove());

          let heading = document.createElement("h1");
          heading.innerHTML = "Congratz";

          let p = document.createElement("p");
          p.innerHTML = "Reload After 10 Second";
          popup.append(p);

          popup.append(heading);
          setTimeout(() => {
            window.location.reload();
          }, 10000);
        }
      } else {
        input.setAttribute("disabled", "");
        let popup = document.createElement("div");
        popup.className = "ove";
        document.body.prepend(popup);

        let button = document.createElement("button");
        button.innerHTML = "X";
        popup.append(button);
        button.addEventListener("click", () => popup.remove());

        setTimeout(() => {
          window.location.reload();
        }, 3000);

        let heading = document.createElement("h1");
        heading.innerHTML = "Game Over";
        let p = document.createElement("p");
        p.innerHTML = "Reload After 3 Second";
        popup.append(p);
        popup.append(heading);
      }
    }
    window.localStorage.setItem("Score", scoreGot.textContent);
  }, 1000);
}
let ScoLocStr = window.localStorage.getItem("Score");
scoreGot.innerHTML = ScoLocStr;
