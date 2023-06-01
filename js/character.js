const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const characterId = urlParams.get("id");

const characterImage = document.getElementById("characterImage");
const characterName = document.getElementById("characterName");
const characterGender = document.getElementById("characterGender");
const characterSpecies = document.getElementById("characterSpecies");
const characterStatus = document.getElementById("characterStatus");
const characterLocation = document.getElementById("characterLocation");
const characterEpisodes = document.getElementById("characterEpisodes");

const fetchCharacterDetails = async () => {
  const characterUrl = `https://rickandmortyapi.com/api/character/${characterId}`;
  const characterResponse = await fetch(characterUrl);
  const characterData = await characterResponse.json();

  characterImage.src = characterData.image;
  characterName.textContent = characterData.name;
  characterGender.textContent = `Gender: ${characterData.gender}`;
  characterSpecies.textContent = `Species: ${characterData.species}`;
  characterStatus.textContent = `Status: ${characterData.status}`;
  characterLocation.textContent = `Location: ${characterData.location.name}`;

  const episodesUrl = "https://rickandmortyapi.com/api/episode";
  const episodesResponse = await fetch(episodesUrl);
  const episodesData = await episodesResponse.json();

  const characterEpisodeIds = characterData.episode.map((episodeUrl) =>
    episodeUrl.split("/").pop()
  );
  const characterEpisodesInfo = episodesData.results.filter((episode) =>
    characterEpisodeIds.includes(episode.id.toString())
  );

  let episodesTableHTML =
    "<tr><th>Episode</th><th>Name</th><th>Air Date</th></tr>";
  characterEpisodesInfo.forEach((episode) => {
    episodesTableHTML += `<tr><td>${episode.episode}</td><td>${episode.name}</td><td>${episode.air_date}</td></tr>`;
  });

  characterEpisodes.innerHTML = episodesTableHTML;
};

fetchCharacterDetails();

const backButton = document.getElementById("backButton");
backButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
