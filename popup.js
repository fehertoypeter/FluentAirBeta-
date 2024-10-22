const popup = document.querySelector(".settings-popup");
// Function to open the settings popup
document.getElementById("settingsOpen").onclick = () => {
  // Replace the hidden class with the show class to display the popup
  popup.classList.replace("popupHidden", "popupShow");
  // Load the settings (defined in user-profile.js)
  loadSettings();
};

let isPopupVisible = false; // Ellenőrizzük, hogy a popup látható-e
let canClosePopup = true; // Ellenőrizzük, hogy bezárható-e a popup

const numberInput = document.getElementById("numberInput");

document.getElementById("settingsClose").onclick = () => {
  const numberInputValue = numberInput.value;

  // Ellenőrizzük, hogy az input üres vagy 0 és 20 között van-e
  if (
    numberInputValue === "" ||
    Number(numberInputValue) < 0 ||
    Number(numberInputValue) > 20
  ) {
    if (!isPopupVisible) {
      const messagePopup = document.querySelector(".message-popup");
      const popupMessage = document.querySelector(".popup-message");

      messagePopup.classList.remove("popupHidden");
      popupMessage.textContent = "Fill the number";
      numberInput.classList.add("invalid"); // Hozzáadjuk az invalid osztályt
      isPopupVisible = true; // Popup látható

      // 5 másodperc múlva visszaadjuk a popupHidden osztályt
      setTimeout(() => {
        messagePopup.classList.add("popupHidden");
        isPopupVisible = false; // Popup már nem látható
        canClosePopup = true; // Újra bezárható
      }, 5000);
    }

    return; // Megakadályozzuk a további kód végrehajtását
  }

  // Ha az input érvényes, folytatjuk a popup class cserélését, ha bezárható
  if (canClosePopup) {
    popup.classList.replace("popupShow", "popupHidden");
    canClosePopup = false; // Bezárás letiltása
    setTimeout(() => {
      canClosePopup = true; // 1 másodperc múlva újra bezárható
    }, 1000);
  }
};

// Eseménykezelő a numberInput-ra
numberInput.addEventListener("input", () => {
  const numberInputValue = numberInput.value;
  // Ha érvényes számot írtak be, távolítsuk el az invalid osztályt
  if (
    numberInputValue !== "" &&
    Number(numberInputValue) >= 0 &&
    Number(numberInputValue) <= 20
  ) {
    numberInput.classList.remove("invalid");
  }
});
