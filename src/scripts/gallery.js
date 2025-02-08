console.log("Min svenska boilerplate med Parcel och Npm är igång!");

document.addEventListener("DOMContentLoaded", () => {
  const hamburgerMenu = document.querySelector(".hamburger-menu");
  const nav = document.querySelector(".nav");
  const dropdownToggles = document.querySelectorAll(".dropdown > a");

  // Toggle menu visibility
  hamburgerMenu.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Close menu when clicking outside
  document.addEventListener("click", (event) => {
    if (!hamburgerMenu.contains(event.target) && !nav.contains(event.target)) {
      nav.classList.remove("active");
      document
        .querySelectorAll(".dropdown-menu")
        .forEach((menu) => menu.classList.remove("active"));
      document
        .querySelectorAll(".dropdown")
        .forEach((dropdown) => dropdown.classList.remove("open")); // Stäng pilar
    }
  });

  // Handle dropdown toggling for all views
  dropdownToggles.forEach((toggle) => {
    toggle.addEventListener("click", (event) => {
      event.preventDefault(); // Prevent link navigation
      const parentDropdown = toggle.parentNode; // li.dropdown
      const dropdownMenu = toggle.nextElementSibling;

      if (dropdownMenu) {
        // Stäng alla andra dropdowns och deras pilar
        document.querySelectorAll(".dropdown-menu").forEach((menu) => {
          if (menu !== dropdownMenu) {
            menu.classList.remove("active");
          }
        });
        document.querySelectorAll(".dropdown").forEach((dropdown) => {
          if (dropdown !== parentDropdown) {
            dropdown.classList.remove("open"); // Stäng andra pilar
          }
        });

        // Öppna/stäng den valda dropdownen
        dropdownMenu.classList.toggle("active");
        parentDropdown.classList.toggle("open"); // Uppdatera pilens klass
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", () => {
  const galleryItems = document.querySelectorAll(".gallery-item img");
  const modal = document.querySelector(".modal");
  const modalImage = document.querySelector(".modal-image");

  // Klick för att visa modal
  galleryItems.forEach((item) => {
    item.addEventListener("click", () => {
      modalImage.src = item.src;
      modal.classList.add("active");
    });
  });

  // Klick utanför bilden för att stänga modal
  modal.addEventListener("click", (e) => {
    if (e.target !== modalImage) {
      modal.classList.remove("active");
    }
  });
});
