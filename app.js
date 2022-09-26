const navBar = document.querySelector(".navBar");
const appContainer = document.querySelector(".appContainer");
const listingsContainer = document.querySelector(".listingsContainer");
const animeCard = document.querySelector(".animeCard");
const getAnimeCharButton = document.querySelector(".getAnimeCharButton");
const charImg = document.querySelector(".charImg");
const infoDiv = document.querySelector(".infoDiv");
const getShowInfoButton = document.querySelector(".getShowInfoButton");
const localCharacterImage = [];
const localCharacterName = [];
const localVoiceActorName = [];
let charId = 0;
axios.get(`https://api.jikan.moe/v4/anime/20583/characters`).then((res) => {
  const animeArray = res.data.data;
  animeArray.forEach((el) => {
    localCharacterImage.push(el.character.images.webp.image_url);
    localCharacterName.push(el.character.name);
    localVoiceActorName.push(el.voice_actors[0].person.name);
  });
});
let isAiring = "";

const showInfoFunc = () => {
  axios.get(`https://api.jikan.moe/v4/anime/20583`).then((res) => {
    if (res.data.data.airing === false) {
      isAiring = "Nope";
    } else {
      isAiring = "Yeah, Totally!";
    }

    charImg.src = res.data.data.images.jpg.image_url;
    infoDiv.innerText = `
        Show name?! ${res.data.data.title} \n
        Still being made?! ${isAiring} \n
        When was this made?! ${res.data.data.year} \n    
        And how many episodes are there?! ${res.data.data.episodes} \n
        Did you know ${res.data.data.title} is ranked ${res.data.data.rank} out of all anime?!
        `;
  });
};

getAnimeCharButton.addEventListener("click", () => {
  const min = Math.ceil(0);
  const max = Math.floor(83);
  charId = Math.floor(Math.random() * (max - min) + min);
  charImg.src = localCharacterImage[charId];
  infoDiv.innerText = `Name: ${localCharacterName[charId]} \n
  Actor's Name: ${localVoiceActorName[charId]}`;
});

getShowInfoButton.addEventListener("click", () => {
  showInfoFunc();
});
