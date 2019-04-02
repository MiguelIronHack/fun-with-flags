//////////////////////////////
//*  Function Constructor *//
/////////////////////////////

class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}

//////////////////////////////////////
///////////*  Name Input *///////////
////////////////////////////////////
let player;
let userName = [];

const getName = () => {
  /* Name input */
  const nameInput = document.getElementById('input-name');
  /* show game tab */
  const gameTab = document.getElementById('showGame');

  document.getElementById('name-btn').onclick = getName;
  // throw error if the name is too small
  if (nameInput.value.length < 2) {
    error();
  } else {
    player = new Player(nameInput.value, 0);
    userName.push(player);
    document.getElementById('score-name').innerHTML = `${player.name}`;
    document.getElementById('score-score').innerHTML = `${player.score}`;

    /* Change active nav */
    document.getElementById('home').classList = '';
    gameTab.classList = 'active';

    /* open mainframe */
    document.getElementById('mainframe').parentElement.style.display = 'flex';
    /* hide name input */
    nameInput.parentElement.parentElement.style.display = 'none';
  }
  console.log(userName);
};
document.getElementById('name-btn').onclick = getName;

////////////////////
//*  Name Error *//
//////////////////
function error() {
  const error = document.getElementById('name-error');
  error.style.display = 'flex';

  document.getElementById('close-error').onclick = function() {
    error.style.display = 'none';
  };
}

/////////////////////////
/////* Main Frame */////
///////////////////////

const url = 'https://restcountries.eu/rest/v2/all';
let correctAnswer;
//////////// Flag Vars ////////////
const flags = [];
const currentFlagName = [];

function startGame(flagList) {
  //* Current Flag Number *//

  const devSquad = [
    flagList[48],
    flagList[77],
    flagList[107],
    flagList[231],
    flagList[124],
    flagList[208],
    flagList[244],
    flagList[219],
    flagList[179],
    flagList[239],
    flagList[212]
  ];

  flags.push(devSquad);

  //////////// Get a random flag ///////////////
  /////////////////////////////////////////////
  function newFlag() {
    const randomFlag = Math.floor(Math.random() * devSquad.length);
    currentFlagName.push(devSquad[randomFlag].name);
    currentFlagName.push(devSquad[randomFlag].numericCode);

    const img = document.createElement('img');
    img.classList.add('d-0');
    img.id = `${devSquad[randomFlag].numericCode}`;
    img.alt = `${devSquad[randomFlag].name}`;
    img.src = `${devSquad[randomFlag].flag}`;
    document.getElementById('mainframe').appendChild(img);

    console.log(currentFlagName);
    //////// Correct Answer //////////
    correctAnswer = currentFlagName[0];
    console.log(correctAnswer.toLowerCase().replace(/\W\s]/g));

    if (
      document.getElementById(`${currentFlagName[1]}`).id == currentFlagName[1]
    ) {
      document.getElementById(`${currentFlagName[1]}`).classList.toggle('d-0');
    }
    console.log(document.getElementById(`${currentFlagName[1]}`));
  }
  newFlag();

  //////////////////////
  //* Answer Result *//
  ////////////////////

  function result() {
    if (correctAnswer == 'Iran (Islamic Republic of)') {
      correctAnswer = 'iran';
    }
    if (correctAnswer == 'Viet Nam') {
      correctAnswer = 'vietnam';
    }
    const userAnswer = document.getElementById('flag-input').value;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      // Correct answer
      currentFlagName.splice(0, 2);
      console.log(currentFlagName);
      document.getElementById('mainframe').firstChild.remove();
      player.score += 30;
      document.getElementById('score-score').innerHTML = `${player.score}`;
      correct();
      newFlag();
    } else {
      incorrect();
      // Incorrect answer
      currentFlagName.splice(0, 2);
      console.log(currentFlagName);
      document.getElementById('mainframe').firstChild.remove();
      devSquad.splice();

      newFlag();
    }
    document.getElementById('flag-input').value = '';
  }

  const submit = document.getElementById('submit-answer');
  submit.onclick = result;
}

////////////////////////////////
//////*  Correct Answer *//////
//////////////////////////////

function correct() {
  const success = document.getElementById('success');
  success.style.display = 'flex';

  setTimeout(() => (success.style.display = 'none'), 1000);
}

function incorrect() {
  const incorrect = document.getElementById('incorrect');
  incorrect.style.display = 'flex';

  setTimeout(() => (incorrect.style.display = 'none'), 1000);
}

function getFlags() {
  axios
    .get(url)
    .then(res => {
      startGame(res.data);
    })
    .catch(err => {
      console.error(err);
    });
}

///////////////////////////////////////////
window.onload = getFlags;

document.getElementById('game-frame').style.display = 'none';

/*  */
/* Players  */

document.getElementById('player-section').style.display = 'none';

//////////////////////////////////////
///////////*  Show Score *///////////
////////////////////////////////////
function showScore() {
  const scoreList = document.getElementById('player-section');
  const playerName = document.getElementById('player-name');
  const gameFrame = document.getElementById('game-frame');
  scoreList.style.display = 'flex';
  scoreList.style.justifyContent = 'center';
  playerName.style.display = 'none';
  gameFrame.style.display = 'none';

  /* Change nav  */
  document.getElementById('showGame').classList = '';
  document.getElementById('home').classList = '';
  document.getElementById('score-list').classList = 'active';
}
document.getElementById('score-list').onclick = showScore;

/////////////////////////////////////
///////////*  Show Game *///////////
///////////////////////////////////

function showGame() {
  const scoreList = document.getElementById('player-section');
  const playerName = document.getElementById('player-name');
  const gameFrame = document.getElementById('game-frame');

  scoreList.style.display = 'none';
  playerName.style.display = 'none';
  gameFrame.style.display = 'flex';

  /* Change nav  */
  document.getElementById('score-list').classList = '';
  document.getElementById('home').classList = '';
  document.getElementById('showGame').classList = 'active';
}

/////////////////////////////////////
///////////*  Show Home *///////////
///////////////////////////////////

function showHome() {
  const scoreList = document.getElementById('player-section');
  const playerName = document.getElementById('player-name');
  const gameFrame = document.getElementById('game-frame');

  scoreList.style.display = 'none';
  playerName.style.display = 'block';
  gameFrame.style.display = 'none';

  /* Change nav  */
  document.getElementById('score-list').classList = '';
  document.getElementById('home').classList = 'active';
  document.getElementById('showGame').classList = '';
}

/* Use Nav */

function setupNavMain(evt) {
  console.log(this);
  if (!userName.length) {
    evt.preventDefault();
  }

  if (this.id == 'showGame') {
    this.onclick = showGame;
  } else if (this.id == 'home') {
    this.onclick = showHome;
  } else if (this.id == 'score-list') {
    this.onclick = showScore;
  }
}

const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.onclick = setupNavMain;
});
