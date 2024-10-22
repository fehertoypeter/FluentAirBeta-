let sequence = [];
let inputSequence = [];
let numDigits = 4;
let currentIndex = 0;
let gameStarted = false;
let isReverseOrder = false;
const answerValue = []; // Inicializáljuk az answerValue tömböt

const inputNumbersContainer = document.getElementById("inputNumbers");
const answerNumberInput = document.getElementById("answerNumberInput");
const feedback = document.getElementById("feedback");
const numButtons = document.querySelectorAll(".num-button");
const orderButtons = document.querySelectorAll(".order-button");
const startGameButton = document.getElementById("startGame");
let checkButton = document.getElementById("check");
const inputButtonsDiv = document.getElementById("input-buttons");
let animationInterval; // Globális változó a hang animációs intervallumhoz

toggleInputButtonsVisibility();

const inputButtons = document.querySelectorAll(".input-button[data-digit]"); // Csak a digit gombok
const clearInputButton = document.getElementById("clearInput");

// Gomb eseménykezelők hozzáadása
inputButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Kiolvassuk a data-digit értéket
    const digit = button.getAttribute("data-digit");

    // Beírjuk az input mezőbe
    answerNumberInput.value += digit; // Hozzáadjuk a digit-et az input mezőhöz

    // (Opcionálisan) megjeleníthetjük az aktuális inputot valahol
    console.log("Current input value:", answerNumberInput.value);
  });
});

// Törlés gomb eseménykezelő
clearInputButton.addEventListener("click", () => {
  // Töröljük az utolsó karaktert az input mezőből
  answerNumberInput.value = answerNumberInput.value.slice(0, -1);
});

function startGame() {
  // Load the value of numDigits from the user profile (user-profile.js)
  numDigits = parseInt(userProfile.tests.acousticMemory.settings.textInput);
  console.log(numDigits);
  answerNumberInput.value = "";
  answerNumberInput.style.backgroundColor = "white";
  sequence = generateRandomSequence(numDigits);
  inputSequence = [];
  currentIndex = 0;
  updateInputNumbersDisplay();
  feedback.textContent = "";
  gameStarted = true;
  playSequenceSounds(sequence);
  inputFocus();
  closeFeedbackBox();
  inputButtonsDiv.style.pointerEvents = "auto"; // Aktiváljuk a szám beviteli gombokat.
}

// Feladvány ellenőrzése
function checkInputSequence() {
  // Letiltjuk az szám beviteli gombokat
  inputButtonsDiv.style.pointerEvents = "none";
  // Megkapjuk az input mező értékét (a számokat stringként)
  let answerValue = document.getElementById("answerNumberInput").value;
  console.log(answerValue);

  // Ellenőrizzük, hogy a beírt számok hosszúsága megegyezik-e a sequence hosszával
  if (answerValue.length !== sequence.length) {
    displayResult(false);
    displayFeedback(false, sequence); // Hibás megoldás esetén hívjuk a visszajelzést
    return;
  }

  // Ellenőrizzük, hogy a checkbox4 értéke micsoda (true = fordított sorrend kell)
  const isReverseOrder =
    userProfile.tests.acousticMemory.settings.checkboxes.checkbox4;

  // Ha fordított sorrend szükséges, akkor fordítjuk meg az answerValue-t
  const inputToCheck = isReverseOrder
    ? answerValue.split("").reverse().join("") // Megfordítjuk a felhasználó által beírt számokat
    : answerValue;

  // A sequence tömböt konvertáljuk stringgé, hogy könnyebb legyen összehasonlítani
  const sequenceString = sequence.join("");

  // Ellenőrizzük, hogy a beírt számok helyesek-e (fordított vagy normál sorrendben)
  if (inputToCheck === sequenceString) {
    displayResult(true); // Sikeres egyezés
    displayFeedback(true, sequence); // Helyes megoldás esetén hívjuk a visszajelzést
  } else {
    displayResult(false); // Nem egyezik
    displayFeedback(false, sequence); // Hibás megoldás esetén hívjuk a visszajelzést
  }
}

// Visszajelzés megjelenítése
function displayFeedback(isCorrect, sequence) {
  const feedbackBox = document.querySelector(".feedback-box");
  const feedbackMessage = feedbackBox.querySelector("p");

  // Ellenőrizzük, hogy checkbox2 be van-e pipálva és a megoldás rossz
  if (
    userProfile.tests.acousticMemory.settings.checkboxes.checkbox2 &&
    !isCorrect
  ) {
    feedbackBox.classList.add("open"); // .open class hozzáadása

    if (userProfile.tests.acousticMemory.settings.checkboxes.checkbox4) {
      // Fordított sorrend kellett
      const reversedSequence = sequence.slice().reverse().join(""); // A sequence értéket megfordítjuk
      feedbackMessage.textContent = `Sequence: ${reversedSequence}`;
    } else {
      // Megegyező sorrend kellett
      feedbackMessage.textContent = `Sequence: ${sequence.join("")}`;
    }
  }
}
function closeFeedbackBox() {
  const feedbackBox = document.querySelector(".feedback-box");
  if (feedbackBox.classList.contains("open")) {
    feedbackBox.classList.remove("open");
  }
}

// Random számokat generál
function generateRandomSequence(length) {
  const sequence = [];
  for (let i = 0; i < length; i++) {
    sequence.push(Math.floor(Math.random() * 10));
  }
  console.log(sequence);
  return sequence;
}

//Válasz ellenörzése színnel
function displayResult(isCorrect) {
  answerNumberInput.style.backgroundColor = isCorrect ? "#CDDA32" : "#e08a8a";
}

function animateBars() {
  const bars = document.querySelectorAll(".bar"); // Az összes bar elem
  const barNone = document.querySelectorAll(".bar-none"); // Az összes bar elem

  bars.forEach((bar) => {
    // Véletlen idő 100 és 300 ms között
    const randomTime = Math.random() * 100 + 100; // 100 - 300 ms közötti véletlen idő

    // Hozzáadjuk a height100 osztályt
    bar.classList.add("height100");

    // Eltávolítjuk a height100 osztályt a randomTime elteltével
    setTimeout(() => {
      bar.classList.remove("height100");
    }, randomTime);
  });
  barNone.forEach((barnone) => {
    // Véletlen idő 100 és 300 ms között
    const randomTime = Math.random() * 100 + 100; // 100 - 300 ms közötti véletlen idő

    // Hozzáadjuk a height100 osztályt
    barnone.classList.add("height50");

    // Eltávolítjuk a height100 osztályt a randomTime elteltével
    setTimeout(() => {
      barnone.classList.remove("height50");
    }, randomTime);
  });
}

function playSequenceSounds(sequence) {
  const bars = document.querySelectorAll(".bar"); // Kiválasztjuk az összes .bar elemet

  // Hozzáadjuk a voice osztályt az összes .bar elemhez
  bars.forEach((bar) => {
    bar.classList.add("voice");
  });

  let currentIndex = 0;

  function playNextSound() {
    if (currentIndex < sequence.length) {
      const number = sequence[currentIndex];
      const audio = new Audio("tests/acoustic-memory/audio/" + number + ".mp3");
      audio.play();

      audio.onended = function () {
        currentIndex++;
        playNextSound();
      };
    } else {
      // Amikor a hangok lejátszása befejeződött, levesszük a voice osztályt
      bars.forEach((bar) => {
        bar.classList.remove("voice");
      });

      // Animációs intervallum leállítása
      clearInterval(animationInterval);

      // Eltávolítjuk a height100 osztályt véglegesen
      bars.forEach((bar) => {
        bar.classList.remove("height100");
      });
    }
  }

  playNextSound(); // Elindítjuk a hangfájlok lejátszását

  // Animációs intervallum indítása
  animationInterval = setInterval(animateBars, 300); // 300 ms-enként animál
}

//Numeric Pad megjelenítése
function toggleInputButtonsVisibility() {
  // Ellenőrizzük a checkbox3 értékét
  if (userProfile.tests.acousticMemory.settings.checkboxes.checkbox3) {
    inputButtonsDiv.classList.remove("unloaded"); // Eltávolítjuk a hidden osztályt
  } else {
    inputButtonsDiv.classList.add("unloaded"); // Hozzáadjuk a hidden osztályt
  }
}

//Focust Rak az input mezőre
function inputFocus() {
  // Ellenőrizzük a checkbox3 értékét a userProfile-ban
  if (!userProfile.tests.acousticMemory.settings.checkboxes.checkbox3) {
    // Ha checkbox3 értéke false, akkor fókuszáljunk a 'answerNumberInput' mezőre

    if (answerNumberInput) {
      answerNumberInput.focus(); // Kurzor elhelyezése
    }
  }
  console.log("lefut");
}

function updateInputNumbersDisplay() {
  answerNumberInput.textContent = inputSequence
    .filter((item) => !isNaN(item))
    .join("");
}
document.getElementById("startGame").onclick = function () {
  if (this.id === "startGame") {
    startGame();
    this.textContent = "Check"; // Szöveg átállítása
    this.id = "check"; // ID átállítása
  } else {
    checkInputSequence();
    this.textContent = "New Round"; // Szöveg visszaállítása
    this.id = "startGame"; // ID visszaállítása
  }
};
