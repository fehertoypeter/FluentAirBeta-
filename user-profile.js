const userProfile = {
  tests: {
    acousticMemory: {
      settings: {
        checkboxes: {
          checkbox1: false, // Test and Practice mode
          checkbox2: true, // Show Correct Solution
          checkbox3: true, // Enable numeric input pad
          checkbox4: false, // Input numbers in reverse order
        },
        textInput: "4", // Alapértelmezett érték
      },
      results: [
        {
          date: "2024-10-20", // Teszt dátuma
          time: "14:30", // Teszt időpontja
          score: 8, // Sikeresen megoldott feladatok száma
        },
        // További eredmények itt
      ],
    },
    concentration: {
      settings: {
        checkboxes: {
          checkbox1: false, // Checkbox 1 állapota
          checkbox2: false, // Checkbox 2 állapota
          checkbox3: false, // Checkbox 3 állapota
          checkbox4: false, // Checkbox 4 állapota
        },
        textInput: "",
      },
      results: [
        {
          date: "2024-10-19",
          time: "10:15",
          score: 5,
        },
        // További eredmények itt
      ],
    },
  },
};

// Funkció a beállítások betöltésére a HTML felületre
function loadSettings() {
  document.getElementById("testPracticeMode").checked =
    userProfile.tests.acousticMemory.settings.checkboxes.checkbox1;
  document.getElementById("showCorrectSolution").checked =
    userProfile.tests.acousticMemory.settings.checkboxes.checkbox2;
  document.getElementById("enableNumericInput").checked =
    userProfile.tests.acousticMemory.settings.checkboxes.checkbox3;
  document.getElementById("reverseOrderInput").checked =
    userProfile.tests.acousticMemory.settings.checkboxes.checkbox4;
  document.getElementById("numberInput").value =
    userProfile.tests.acousticMemory.settings.textInput;
  console.log("betölti");
}

// Funkció a beállítások frissítésére
function updateSettings() {
  userProfile.tests.acousticMemory.settings.checkboxes.checkbox1 =
    document.getElementById("testPracticeMode").checked;
  userProfile.tests.acousticMemory.settings.checkboxes.checkbox2 =
    document.getElementById("showCorrectSolution").checked;
  userProfile.tests.acousticMemory.settings.checkboxes.checkbox3 =
    document.getElementById("enableNumericInput").checked;
  userProfile.tests.acousticMemory.settings.checkboxes.checkbox4 =
    document.getElementById("reverseOrderInput").checked;
  userProfile.tests.acousticMemory.settings.textInput =
    document.getElementById("numberInput").value;
  console.log("frissíti");
  console.log("Current Settings:", userProfile.tests.acousticMemory.settings);
  toggleInputButtonsVisibility();
}

// Események hozzárendelése a checkboxokhoz és a szöveges inputhoz
document.getElementById("testPracticeMode").onchange = updateSettings;
document.getElementById("showCorrectSolution").onchange = updateSettings;
document.getElementById("enableNumericInput").onchange = updateSettings;
document.getElementById("reverseOrderInput").onchange = updateSettings;
document.getElementById("numberInput").oninput = updateSettings;
