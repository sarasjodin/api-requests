console.log("Min svenska boilerplate med Parcel och Npm är igång!");

document.addEventListener("DOMContentLoaded", function () {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector(".nav");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  if (!hamburgerMenu || !nav) {
    console.error("Hamburger-meny eller navigationsmeny saknas i DOM!");
    return;
  }

  // Toggle menu visibility
  hamburgerMenu.addEventListener("click", function (event) {
    event.stopPropagation(); // Förhindra klick på menyn från att bubbla upp
    nav.classList.toggle("active");
  });

  // Hantera klick utanför menyn för att stänga
  document.addEventListener("click", function (event) {
    if (!hamburgerMenu.contains(event.target) && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  // Hantera dropdown-menyers öppning/stängning
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", function (event) {
      event.preventDefault(); // Förhindra standardlänk-beteende
      const dropdownMenu = this.nextElementSibling;

      if (dropdownMenu && dropdownMenu.classList.contains("dropdown-menu")) {
        dropdownMenu.classList.toggle("active");

        // Stäng alla andra öppna dropdowns
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          if (menu !== dropdownMenu) {
            menu.classList.remove("active");
          }
        });

        // Toggle pil-klass
        this.parentElement.classList.toggle("open");
      }
    });
  });

  // Funktion för att stänga menyn
  function closeMenu() {
    nav.classList.remove("active");
    document
      .querySelectorAll(".dropdown-menu")
      .forEach((menu) => menu.classList.remove("active"));
    document
      .querySelectorAll(".dropdown")
      .forEach((dropdown) => dropdown.classList.remove("open"));
  }
});
