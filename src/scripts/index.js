document.addEventListener('DOMContentLoaded', function () {
  const hamburgerMenu = document.querySelector('.hamburger-menu');
  const nav = document.querySelector('.nav');

  if (!hamburgerMenu || !nav) {
    console.error('Hamburger-meny eller navigationsmeny saknas i DOM!');
    return;
  }

  // Toggle huvudmenyn vid klick på hamburgermenyn
  hamburgerMenu.addEventListener('click', function (event) {
    event.stopPropagation(); // Förhindra att klick bubbla upp
    nav.classList.toggle('active');
  });

  // Stäng menyn vid klick utanför
  document.addEventListener('click', function (event) {
    if (!hamburgerMenu.contains(event.target) && !nav.contains(event.target)) {
      closeMenu();
    }
  });

  // Funktion för att stänga menyn
  function closeMenu() {
    nav.classList.remove('active');
  }
});

let courses = []; // Alla kurser från JSON
let filteredCourses = []; // För att lagra de filtrerade kurserna
let currentSortColumn = null; // Håller koll på vilken kolumn som sorteras
let sortDirection = 1; // 1 = stigande, -1 = fallande

// Hämta JSON-data och rendera tabellen
async function fetchCourses() {
  try {
    const response = await fetch(
      'https://webbutveckling.miun.se/files/ramschema_ht24.json'
    );
    courses = await response.json();
    filteredCourses = [...courses]; // Börja med att visa alla kurser
    displayCourses(filteredCourses);
  } catch (error) {
    console.error('Failed to fetch course data:', error);
  }
}

// Visar kurser i tabellen
function displayCourses(data) {
  let tableBody = document.getElementById('table-body');
  tableBody.innerHTML = ''; // Rensa tidigare innehåll

  data.forEach((course) => {
    let row = `<tr>
                    <td>${course.code}</td>
                    <td>${course.coursename}</td>
                    <td>${course.progression}</td>
                  </tr>`;
    tableBody.innerHTML += row;
  });

  updateStatus(data.length); // Uppdatera aria-live
}

// Filtrera kurser endast vid Enter-tangent
document.getElementById('search').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // Kontrollera om Enter trycks
    event.preventDefault(); // Förhindra standardbeteende
    filterCourses();
  }
});

function sortCourses(columnIndex) {
  console.log('Sorting column:', columnIndex);

  let headers = document.querySelectorAll('th');

  // Om användaren klickar på en ny kolumn, resetta sorteringsriktningen
  if (currentSortColumn !== columnIndex) {
    sortDirection = 1; // Starta om från stigande sortering
  } else {
    sortDirection *= -1; // Växla riktning om samma kolumn klickas
  }

  // Ta bort sorteringspilar och "active"-klasser från alla kolumner
  headers.forEach((th) => {
    th.removeAttribute('data-sort');
    th.classList.remove('active');
  });

  // Hämta det th-element som klickades
  let columnHeader = headers[columnIndex];

  // Sätt sorteringsriktning i attribut och lägg till aktiv klass
  let sortOrder = sortDirection === 1 ? 'asc' : 'desc';
  columnHeader.setAttribute('data-sort', sortOrder);
  columnHeader.classList.add('active');

  // Uppdatera currentSortColumn till den nu sorterade kolumnen
  currentSortColumn = columnIndex;

  // Sortera listan baserat på sorteringsriktning
  filteredCourses.sort((a, b) => {
    let textA, textB;

    if (columnIndex === 0) {
      textA = a.code.toLowerCase();
      textB = b.code.toLowerCase();
    } else if (columnIndex === 1) {
      textA = a.coursename.toLowerCase();
      textB = b.coursename.toLowerCase();
    } else if (columnIndex === 2) {
      textA = a.progression.toLowerCase();
      textB = b.progression.toLowerCase();
    }

    return textA.localeCompare(textB) * sortDirection;
  });

  // Uppdatera tabellen med sorterade data
  displayCourses(filteredCourses);
}

// Filtrera kurser baserat på sökfältet
function filterCourses() {
  let searchQuery = document.getElementById('search').value.toLowerCase();

  filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery) ||
      course.coursename.toLowerCase().includes(searchQuery)
  );

  // Om sortering redan har använts, behåll sorteringen
  if (currentSortColumn !== null) {
    sortCourses(currentSortColumn);
  } else {
    displayCourses(filteredCourses);
  }
}

// Uppdatera aria-live för skärmläsare
function updateStatus(count) {
  let statusElement = document.getElementById('results-status');
  statusElement.textContent = `${count} courses found`;
}

// Sortera tabellen baserat på klickad kolumn
window.sortCourses = function (columnIndex) {
  console.log('Sorting column:', columnIndex);

  currentSortColumn = columnIndex; // Sparar vilken kolumn som sorteras

  if (filteredCourses.length === 0) {
    console.warn('No data to sort!'); // Om listan är tom
    return;
  }

  filteredCourses.sort((a, b) => {
    let textA, textB;

    if (columnIndex === 0) {
      textA = a.code.toLowerCase();
      textB = b.code.toLowerCase();
    } else if (columnIndex === 1) {
      textA = a.coursename.toLowerCase();
      textB = b.coursename.toLowerCase();
    } else if (columnIndex === 2) {
      textA = a.progression.toLowerCase();
      textB = b.progression.toLowerCase();
    }

    return textA.localeCompare(textB) * sortDirection;
  });

  // Växla mellan stigande och fallande sortering
  sortDirection *= -1;

  displayCourses(filteredCourses);
};

window.sortCourses = sortCourses;

// Kör fetch-funktionen vid sidans start
fetchCourses();
