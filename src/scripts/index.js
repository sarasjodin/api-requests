/* console.log(
  'Ny version av JavaScript laddad - Timestamp:',
  new Date().toISOString()
); */

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

// Variabler
let courses = [];
let filteredCourses = [];
let lastFilteredOrder = []; // Sparar senaste filtrerade ordningen
let currentSortColumn = null;
let sortStates = {};
let debounceTimer;

// Hämta JSON-data och rendera tabellen
async function fetchCourses() {
  try {
    const response = await fetch(
      'https://webbutveckling.miun.se/files/ramschema_ht24.json'
    );
    console.log('Response från fetch:', response);
    if (!response.ok) throw new Error(`HTTP-fel! Status: ${response.status}`);

    courses = await response.json();
    filteredCourses = [...courses];
    console.log('Kurser hämtade:', courses);
    lastFilteredOrder = [...filteredCourses];
    displayCourses(filteredCourses);
  } catch (error) {
    console.error('Failed to fetch course data:', error);
    document.getElementById('table-body').innerHTML =
      '<tr><td colspan="3">Kunde inte ladda kurser. Försök igen senare.</td></tr>';
  }
}

// *Debounce-för att vänta innan sökning sker
function debounce(func, delay) {
  return function (...args) {
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func(...args), delay);
  };
}

// Visar kurser i tabellen
function displayCourses(data) {
  let tableBody = document.getElementById('table-body');
  let activeElement = document.activeElement; // Spara aktivt element
  let rows = data
    .map(
      (course) =>
        `<tr>
      <td>${course.code}</td>
      <td>${course.coursename}</td>
      <td>${course.progression}</td>
    </tr>`
    )
    .join('');

  tableBody.innerHTML = ''; // Rensa innehållet innan ny inladdning
  setTimeout(() => {
    tableBody.innerHTML = rows;
    updateStatus(data.length);

    // Återställ fokus om det var på sökrutan
    if (activeElement && activeElement.id === 'search') {
      activeElement.focus();
    }
  }, 10);
}

// Filtrera kurser endast vid Enter-tangent
document.getElementById('search').addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    // Kontrollera om Enter trycks
    event.preventDefault();
    filterCourses();
  }
});

// Gör att "Sök"-knappen kör samma funktion som Enter-knappen
document.getElementById('search-button').addEventListener('click', function () {
  /* console.log('Sök-knappen klickad');  */ // För debugging
  filterCourses();
});

// Anropa debounce vid varje inmatning
document.getElementById('search').addEventListener(
  'input',
  debounce(() => {
    let searchField = document.getElementById('search');
    filterCourses();
    searchField.focus(); // Behåller fokus i sökrutan
  }, 1000)
);

// Sorteringsfunktion (asc - desc - default)
function sortCourses(columnIndex) {
  let headers = document.querySelectorAll('th');

  /* console.log(`Sortering klickad på kolumn ${columnIndex}`); */

  // Återställ den gamla sorteringen när klick på ny kolumn
  if (currentSortColumn !== columnIndex) {
    if (currentSortColumn !== null) {
      sortStates[currentSortColumn] = 'default';
    }
    currentSortColumn = columnIndex;
  }

  // asc - desc - default
  if (!sortStates[columnIndex] || sortStates[columnIndex] === 'default') {
    sortStates[columnIndex] = 'asc';
  } else if (sortStates[columnIndex] === 'asc') {
    sortStates[columnIndex] = 'desc';
  } else {
    sortStates[columnIndex] = 'default';
  }

  /* console.log(
    `Sorteringsläge för kolumn ${columnIndex}: ${sortStates[columnIndex]}`
  ); */

  // Ta bort alla sorteringspilar och "active"-klasser
  headers.forEach((th) => {
    th.removeAttribute('data-sort');
    th.classList.remove('active');
  });

  // Om "default" - Återställ listan till filtrerad ordning och ta bort pil
  if (sortStates[columnIndex] === 'default') {
    /* console.log(`Återställer till senaste filtreringsordningen`); */
    currentSortColumn = null;
    displayCourses(lastFilteredOrder);
    return;
  }

  // Bestäm sorteringsriktning o uppdatera UI
  let sortDirection = sortStates[columnIndex] === 'asc' ? 1 : -1;
  headers[columnIndex].setAttribute('data-sort', sortStates[columnIndex]);
  headers[columnIndex].classList.add('active');

  /* console.log(`Sorterar ${sortStates[columnIndex]} ordning`); */

  // Sortera kurserna
  filteredCourses.sort((a, b) => {
    let key =
      columnIndex === 0
        ? 'code'
        : columnIndex === 1
          ? 'coursename'
          : 'progression';
    let textA = a[key].toLowerCase();
    let textB = b[key].toLowerCase();

    return textA.localeCompare(textB) * sortDirection;
  });

  displayCourses(filteredCourses);
}

// Filtreringsfunktion
function filterCourses() {
  let searchQuery = document.getElementById('search').value.toLowerCase();
  /* console.log(`Söker efter: "${searchQuery}"`); */

  filteredCourses = courses.filter(
    (course) =>
      course.code.toLowerCase().includes(searchQuery) ||
      course.coursename.toLowerCase().includes(searchQuery)
  );

  /* console.log(
    `Filtrering klar. Antal kurser som matchar: ${filteredCourses.length}`
  ); */

  lastFilteredOrder = [...filteredCourses]; // Spara filtreringsordning för default

  updateStatus(filteredCourses.length);

  if (currentSortColumn !== null) {
    /* console.log(`Sortering kvarstår för kolumn ${currentSortColumn}`); */
    sortCourses(currentSortColumn);
  } else {
    /* console.log('Inga aktiva sorteringar, visar filtrerade kurser'); */
    displayCourses(filteredCourses);
  }
}

// Uppdatera antal kurser
updateStatus(filteredCourses.length);

// Rensa sökning och sortering
document.getElementById('clear-search').addEventListener('click', function () {
  /* console.log('Rensning av sökning och sortering initierad...'); */

  document.getElementById('search').value = ''; // Rensa sökfältet
  filteredCourses = [...courses]; // Återställ tabellen till alla kurser
  lastFilteredOrder = [...filteredCourses]; // Återställ defaultvärde

  /* console.log('Tabell återställd till originalinläsning'); */

  // Återställ sorteringsstatus
  sortStates = {};
  currentSortColumn = null;

  /* console.log('Alla sorteringsvärden nollställda'); */

  // Ta bort ALLA sorteringspilar och "active"-klasser från kolumner
  document.querySelectorAll('th').forEach((th) => {
    th.removeAttribute('data-sort');
    th.classList.remove('active');
  });

  /* console.log('Alla sorteringspilar och highlights borttagna'); */

  // Tvinga en omritning av tabellen
  setTimeout(() => {
    displayCourses(filteredCourses);
    /* console.log('Tabell uppdaterad'); */
  }, 10);

  document.getElementById('search-status').textContent =
    'Sökningen har rensats, alla kurser visas.';
});

// Koppla sorteringsfunktion till HTML-tabellen
window.sortCourses = sortCourses;

// Kör fetch vid sidstart
fetchCourses();

function updateStatus(count) {
  let statusElement = document.getElementById('results-status');
  statusElement.textContent = `${count} courses found`;
}
