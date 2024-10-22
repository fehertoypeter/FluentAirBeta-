let sidebar = document.querySelector(".sidebar");
let sidebarBtn = document.querySelector(".bx-menu");
console.log(sidebarBtn);

// Toggle sidebar open/close
sidebarBtn.addEventListener("click", () => {
  sidebar.classList.toggle("close");

  // If 'close' class is added, remove all 'showMenu' and 'showSub' classes
  if (sidebar.classList.contains("close")) {
    // Remove 'showMenu' from all elements
    let showMenus = document.querySelectorAll(".showMenu");
    showMenus.forEach((showMenu) => {
      showMenu.classList.remove("showMenu");
    });

    // Remove 'showSub' from all elements inside '.nav-links'
    let navLinks = document.querySelector(".nav-links");
    let showSubs = navLinks.querySelectorAll(".showSub");
    showSubs.forEach((showSub) => {
      showSub.classList.remove("showSub");
    });
  }
});

// Handle icon-link clicks (sub-menu toggle)
let iconLinks = document.querySelectorAll(".icon-link");

iconLinks.forEach((iconLink) => {
  iconLink.addEventListener("click", (e) => {
    // Keresd meg a közvetlenül kapcsolódó .subb-menu elemet
    let subMenu = iconLink.nextElementSibling;

    if (subMenu && subMenu.classList.contains("subb-menu")) {
      // Toggle a showSub classra
      subMenu.classList.toggle("showSub");

      // Ha még zárva van a sidebar, akkor nyissa ki
      if (sidebar.classList.contains("close")) {
        sidebarBtn.click(); // Ezzel szimuláljuk a sidebarBtn kattintást
      }
    }
  });
});

// Function to remove 'active' class from all nav-links and sub-menu items
function removeActiveClasses() {
  let allLinks = document.querySelectorAll(".nav-links li, .subb-menu li");
  allLinks.forEach((link) => {
    link.classList.remove("active");
  });
}

// Handle clicks on nav-links
let navLinks = document.querySelectorAll(".nav-links > li");

navLinks.forEach((navLink) => {
  navLink.addEventListener("click", (e) => {
    // Ha az elemnek nincs subb-menu-je
    if (!navLink.querySelector(".subb-menu")) {
      removeActiveClasses(); // Remove 'active' class from all nav-links and sub-menu items
      navLink.classList.add("active"); // Add 'active' class to the clicked nav-link

      // Ha még nem zártuk be a menüt, akkor zárjuk be
      if (!sidebar.classList.contains("close")) {
        sidebarBtn.click(); // Ezzel zárjuk össze a menüt
      }
    }
  });
});

// Handle clicks on sub-menu items
let subMenus = document.querySelectorAll(".subb-menu li");

subMenus.forEach((subMenuItem) => {
  subMenuItem.addEventListener("click", (e) => {
    e.stopPropagation(); // Megakadályozzuk, hogy a click esemény továbbterjedjen a szülő elemre

    removeActiveClasses(); // Remove 'active' class from all nav-links and sub-menu items

    // Add 'active' class to the clicked sub-menu item
    subMenuItem.classList.add("active");

    // Add 'active' class to the parent li element that contains this subb-menu
    let parentNavLink = subMenuItem.closest(".nav-links > li");
    if (parentNavLink) {
      parentNavLink.classList.add("active");
    }
  });
});

// Eseménykezelő hozzáadása minden linkhez
navLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    // Megakadályozza az alapértelmezett viselkedést
    event.preventDefault();
    console.log("mukodik");
  });
});

// Szélesség
console.log(window.innerWidth);

// Magasság
console.log(window.innerHeight);
