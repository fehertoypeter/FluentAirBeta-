// Főmenü és subb-menu kattintási esemény kezelők
document.querySelectorAll(".nav-links > li > a").forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();
    const targetClass = link.getAttribute("data-target");
    loadContent(targetClass);
  });
});

document.querySelectorAll(".subb-menu a").forEach((subLink) => {
  subLink.addEventListener("click", (event) => {
    event.preventDefault();
    const targetClass = subLink.getAttribute("data-target");
    loadContent(targetClass);
  });
});

// Funkció a tartalom betöltésére
function loadContent(targetClass) {
  const containers = document.querySelectorAll(".container > div");

  // Aktuális tartalom kiválasztása
  const activeContent = document.querySelector(`.${targetClass}`);

  // Minden div-nek az unloaded osztályt adjuk
  containers.forEach((container) => {
    container.classList.add("unloaded"); // Az unloaded osztály eltávolítása
    //  container.style.display = "none"; // Az összes div elrejtése
  });

  // Az új tartalom elrejtése
  if (activeContent) {
    // Görgessünk a nézet tetejére azonnal
    //document.querySelector(".container.frosted-glass").scrollTo(0, 0); // Scroll to top

    activeContent.classList.remove("unloaded"); // Az unloaded osztály eltávolítása
    //  activeContent.style.display = "block"; // Az új tartalom megjelenítése
  }
}
