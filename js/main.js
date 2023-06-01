let currentPage = 1;
const previousBtn = document.querySelector("#previousBtn");
const nextBtn = document.querySelector("#nextBtn");
const currentPageElement = document.querySelector("#currentPage");
const searchInput = document.querySelector("#searchInput");

const totalPages = 42; // Liczba wszystkich stron

const apiRick = async (pagina) => {
  let url = `https://rickandmortyapi.com/api/character/?page=${pagina}`;
  const api = await fetch(url);
  const data = await api.json();
  console.log(data);
  const divRes = document.querySelector("#result");
  divRes.innerHTML = ""; // Czyszczenie zawartości przed dodaniem nowych wierszy

  data.results.map((item) => {
    const divItem = document.createElement("div");
    divItem.classList.add("card");

    // Dodanie animacji po kliknięciu na obrazek
    divItem.innerHTML = `
<img src="${item.image}" class="card-img-top" alt="..." onclick="showCharacterDetails('${item.id}')">
<div class="card-body">
  <h5 class="card-title">${item.name}</h5>
  <p class="card-text"><b>Species: </b>${item.species}</p>
</div>
`;

    divRes.appendChild(divItem);
  });

  // Aktualizacja przycisków paginacji
  previousBtn.disabled = !data.info.prev;
  nextBtn.disabled = !data.info.next;

  // Aktualizacja numeru bieżącej strony
  currentPageElement.textContent = `Page: ${pagina}/${totalPages}`;
};

const previousPage = () => {
  if (currentPage > 1) {
    currentPage--;
    apiRick(currentPage);
  }
};

const nextPage = () => {
  if (currentPage < totalPages) {
    currentPage++;
    apiRick(currentPage);
  }
};

const goToPage = () => {
  const pageNumberInput = document.querySelector("#pageNumber");
  const pageNumber = parseInt(pageNumberInput.value);
  if (pageNumber >= 1 && pageNumber <= 42) {
    currentPage = pageNumber;
    apiRick(currentPage);
  }
};

const searchCharacters = () => {
  const searchTerm = searchInput.value;
  if (searchTerm.trim() !== "") {
    const url = `https://rickandmortyapi.com/api/character/?name=${searchTerm}`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const divRes = document.querySelector("#result");
        divRes.innerHTML = ""; // Czyszczenie zawartości przed dodaniem nowych wierszy

        if (data.results.length === 0) {
          const divItem = document.createElement("div");
          divItem.classList.add("no-results");
          divItem.textContent = "No results found.";
          divRes.appendChild(divItem);
        } else {
          data.results.map((item) => {
            const divItem = document.createElement("div");
            divItem.classList.add("card");

            divItem.innerHTML = `
              <img src="${item.image}" class="card-img-top" alt="..." onclick="showCharacterDetails('${item.id}')">
              <div class="card-body">
                <h5 class="card-title">${item.name}</h5>
                <p class="card-text"><b>Species: </b>${item.species}</p>
              </div>
            `;

            divRes.appendChild(divItem);
          });
        }
      })
      .catch((error) => {
        const divRes = document.querySelector("#result");
        divRes.innerHTML = ""; // Czyszczenie zawartości przed dodaniem nowych wierszy

        const divItem = document.createElement("div");
        divItem.classList.add("no-results");
        divItem.textContent = "Nie ma takiej osoby.";
        divRes.appendChild(divItem);

        console.log(error);
      });
  }
};

// Zdarzenie "keydown" na elemencie searchInput
searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    searchCharacters();
  }
});

const showCharacterDetails = (characterId) => {
  // Przeniesienie do nowej karty z informacjami o postaci
  window.open(`character.html?id=${characterId}`, "_blank");
};

apiRick(currentPage);
currentPageElement.textContent = `Page: ${currentPage}/${totalPages}`;
