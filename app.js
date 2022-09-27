const navBar = document.querySelector(".navBar");
const appContainer = document.querySelector(".appContainer");
const listingsContainer = document.querySelector(".listingsContainer");
const animeCard = document.querySelector(".animeCard");
const getAnimeCharButton = document.querySelector(".getAnimeCharButton");
const charImg = document.querySelector(".charImg");
const infoDiv = document.querySelector(".infoDiv");
const getShowInfoButton = document.querySelector(".getShowInfoButton");
const haikyuuButton = document.querySelector("#haikyuuButton");
const onePieceButton = document.querySelector("#onePieceButton");
const mhaButton = document.querySelector("#mhaButton");

let localCharacterImage = [];
let localCharacterName = [];
let charId = 0;
let showNum = 0;
let numOfChars = 0;
listingsContainer.style.display = "none";

haikyuuButton.addEventListener("click", getHaikyuu);

async function getHaikyuu() {
  appContainer.style.backgroundImage = "url('./background.png')";
  charImg.src = "./transparentimg.png";
  infoDiv.innerText = null;
  localCharacterImage = [];
  localCharacterName = [];
  showNum = 20583;
  listingsContainer.style.display = "flex";
  await axios
    .get(`https://api.jikan.moe/v4/anime/20583/characters`)
    .then((res) => {
      const animeArray = res.data.data;
      animeArray.forEach((el) => {
        localCharacterImage.push(el.character.images.webp.image_url);
        localCharacterName.push(el.character.name);
      });
      numOfChars = localCharacterImage.length;
    });
}

onePieceButton.addEventListener("click", getOnePiece);

async function getOnePiece() {
  appContainer.style.backgroundImage = "url('./onepiece.png')";
  charImg.src = "./transparentimg.png";
  infoDiv.innerText = null;
  localCharacterImage = [];
  localCharacterName = [];
  animeCard.style.display = "flex";
  showNum = 21;
  listingsContainer.style.display = "flex";
  await axios
    .get(`https://api.jikan.moe/v4/anime/21/characters`)
    .then((res) => {
      const animeArray = res.data.data;
      animeArray.forEach((el) => {
        localCharacterImage.push(el.character.images.webp.image_url);
        localCharacterName.push(el.character.name);
      });
      numOfChars = localCharacterImage.length;
    });
}

async function mha() {
  appContainer.style.backgroundImage = "url('./mha.png')";
  charImg.src = "./transparentimg.png";
  infoDiv.innerText = null;
  localCharacterImage = [];
  localCharacterName = [];
  animeCard.style.display = "flex";
  showNum = 31964;
  listingsContainer.style.display = "flex";
  await axios
    .get(`https://api.jikan.moe/v4/anime/31964/characters`)
    .then((res) => {
      const animeArray = res.data.data;
      animeArray.forEach((el) => {
        localCharacterImage.push(el.character.images.webp.image_url);
        localCharacterName.push(el.character.name);
      });
      numOfChars = localCharacterImage.length;
    });
}

mhaButton.addEventListener("click", mha);

let isAiring = "";

const showInfoFunc = () => {
  axios.get(`https://api.jikan.moe/v4/anime/${showNum}`).then((res) => {
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
  const max = Math.floor(numOfChars);
  charId = Math.floor(Math.random() * (max - min) + min);
  charImg.src = localCharacterImage[charId];
  infoDiv.innerText = `Name: ${localCharacterName[charId]} \n`;
});

getShowInfoButton.addEventListener("click", () => {
  showInfoFunc();
});
