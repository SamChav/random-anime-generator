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
const guessingGameButton = document.querySelector(".guessingGameButton");
const guessingGameWrapper = document.querySelector(".guessingGameWrapper");
const guessInput = document.querySelector(".guessInput");
const guessSubmit = document.querySelector(".guessSubmit");
const resetScoreButton = document.querySelector(".resetScoreButton");

let localCharacterImage = [];
let localCharacterName = [];
let charId = 0;
let showNum = 0;
let numOfChars = 0;
let isAiring = "";
let guessAttempts = 0;
let score = 0;
let numOfEpisodes = '';

listingsContainer.style.display = "none";
guessingGameWrapper.style.display = "none";
resetScoreButton.style.display = "none";

async function getHaikyuu() {
  guessingGameWrapper.style.display = "none";
  appContainer.style.backgroundImage = "url('./background.png')";
  resetScoreButton.style.display = "none";
  guessingGameButton.innerHTML = "Guessing Game!";
  guessingGameButton.style.display = "block";
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

async function getOnePiece() {
  guessingGameWrapper.style.display = "none";
  appContainer.style.backgroundImage = "url('./onepiece.png')";
  resetScoreButton.style.display = "none";
  guessingGameButton.innerHTML = "Guessing Game!";
  guessingGameButton.style.display = "block";
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
  guessingGameWrapper.style.display = "none";
  appContainer.style.backgroundImage = "url('./mha.png')";
  resetScoreButton.style.display = "none";
  guessingGameButton.innerHTML = "Guessing Game!";
  guessingGameButton.style.display = "block";
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

getAnimeCharButton.addEventListener("click", () => {
  guessingGameButton.innerHTML = "Guessing Game!";
  guessingGameButton.style.display = "block";
  charImg.style.filter = "blur(0px)";
  infoDiv.style.display = "flex";
  resetScoreButton.style.display = "none";
  guessingGameWrapper.style.display = "none";
  const min = Math.ceil(0);
  const max = Math.floor(numOfChars);
  charId = Math.floor(Math.random() * (max - min) + min);

  charImg.src = localCharacterImage[charId];

  infoDiv.innerText = `Name: ${localCharacterName[charId]} \n`;
});

const showInfoFunc = () => {
  guessingGameWrapper.style.display = "none";
  resetScoreButton.style.display = "none";
  charImg.style.filter = "blur(0px)";
  infoDiv.style.display = "flex";
  guessingGameButton.innerHTML = "Guessing Game!";
  guessingGameButton.style.display = "block";
  axios.get(`https://api.jikan.moe/v4/anime/${showNum}`).then((res) => {
    if (res.data.data.airing === false) {
      isAiring = "Nope";
    } else {
      isAiring = "Yeah, Totally!";
    }
    res.data.data.episodes === null ? numOfEpisodes = "OH NO, I DON'T KNOW!" : numOfEpisodes = res.data.data.episodes
    charImg.src = res.data.data.images.jpg.image_url;
    infoDiv.innerText = `
        Show name?! ${res.data.data.title} \n
        Still being made?! ${isAiring} \n
        When was this made?! ${res.data.data.year} \n    
        And how many episodes are there?! ${numOfEpisodes} \n
        Did you know ${res.data.data.title} is ranked ${res.data.data.rank} out of all anime?!
        `;
  });
};

const openGuessingGame = (e) => {
  e.preventDefault();
  guessingGameButton.style.display = "none";
  resetScoreButton.style.display = "block";
  guessAttempts = 0;
  guessingGameWrapper.style.display = "flex";
  const min = Math.ceil(0);
  const max = Math.floor(numOfChars);
  charId = Math.floor(Math.random() * (max - min) + min);
  charImg.src = localCharacterImage[charId];
  infoDiv.innerText = `Name: ${localCharacterName[charId]} \n`;
  infoDiv.style.display = "none";
  charImg.style.filter = "blur(18px)";
  infoDiv.innerText = `Guesses: ${guessAttempts} / 5`;
  infoDiv.style.display = "flex";
};

const userGuessLogic = (e) => {
  e.preventDefault();
  const userGuess = e.target.form[0].value;
  guessInput.value = "";
  if (
    guessAttempts === 0 &&
    !localCharacterName[charId].toLowerCase().split(", ").includes(userGuess.toLowerCase())
  ) {
    charImg.style.filter = "blur(9px)";
    guessAttempts++;
    guessInput.value = "";
    infoDiv.innerText = `WRONG! \n Guesses: ${guessAttempts} / 5`;
  } else if (
    guessAttempts === 1 &&
    !localCharacterName[charId].toLowerCase().split(", ").includes(userGuess)
  ) {
    charImg.style.filter = "blur(7px)";
    guessAttempts++;
    guessInput.value = "";
    infoDiv.innerText = `WRONG! \n Guesses: ${guessAttempts} / 5`;
  } else if (
    guessAttempts === 2 &&
    !localCharacterName[charId].toLowerCase().split(", ").includes(userGuess)
  ) {
    charImg.style.filter = "blur(5px)";
    guessAttempts++;
    guessInput.value = "";
    infoDiv.innerText = `WRONG! \n Guesses: ${guessAttempts} / 5`;
  } else if (
    guessAttempts === 3 &&
    !localCharacterName[charId].toLowerCase().split(", ").includes(userGuess)
  ) {
    charImg.style.filter = "blur(3px)";
    guessAttempts++;
    guessInput.value = "";
    infoDiv.innerText = `WRONG! \n Guesses: ${guessAttempts} / 5`;
  } else if (
    localCharacterName[charId].toLowerCase().split(", ").includes(userGuess)
  ) {
    infoDiv.style.display = "flex";
    charImg.style.filter = "blur(0px)";
    guessInput.value = "";
    score++;
    infoDiv.innerText = `Name: ${localCharacterName[charId]} \n YOU WIN!!!\n Current Score: ${score}`;
    guessingGameWrapper.style.display = "none";
    guessingGameButton.innerHTML = "Play again?";
    guessingGameButton.style.display = "block";
  } else {
    infoDiv.style.display = "flex";
    charImg.style.filter = "blur(0px)";
    guessInput.value = "";
    score--;
    infoDiv.innerText = `Name: ${localCharacterName[charId]} \n YOU LOST!!! \n Current Score: ${score}`;
    guessingGameWrapper.style.display = "none";
    guessingGameButton.innerHTML = "Play again?";
    guessingGameButton.style.display = "block";
  }
};

const resetScore = () => {
  score = 0;
  infoDiv.innerText = `Current Score: ${score}`;
};

mhaButton.addEventListener("click", mha);
onePieceButton.addEventListener("click", getOnePiece);
haikyuuButton.addEventListener("click", getHaikyuu);
getShowInfoButton.addEventListener("click", showInfoFunc);
guessingGameButton.addEventListener("click", openGuessingGame);
guessSubmit.addEventListener("click", userGuessLogic);
resetScoreButton.addEventListener("click", resetScore);
