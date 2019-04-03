window.onload = getFlags;
const submitAnswer = document.getElementById('submit-answer');
const gameTab = document.getElementById('showGame');

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

///////////*  Timer *///////////
let points = 30;
function timer() {
  moveProgressBar();
  let timeLeft = 30;
  let timerDiv = document.getElementById('progress-bar');
  setInterval(countDown, 1000);
  submitAnswer.addEventListener('click', resetTimer);
  function countDown() {
    if (timeLeft == 0) {
      timerDiv.innerHTML = '0 bonus points';
    } else {
      timerDiv.innerText = `${timeLeft} bonus points`;
      timeLeft--;
      points--;
    }
  }
  // reset timer
  function resetTimer() {
    timeLeft = 30;
    points = 30;
  }
}
// Progress bar
function moveProgressBar() {
  const e = document.getElementById('progress-bar');
  submitAnswer.addEventListener('click', resetWidth);

  let width = 100;
  let id = setInterval(moveBar, 500);
  function moveBar() {
    if (width < 40) {
      clearInterval(id);
    } else {
      width--;
      e.style.width = width + '%';
    }
  }
  function resetWidth() {
    width = 100;
  }
}

const getName = () => {
  /* Name input */
  const nameInput = document.getElementById('input-name');
  /* show game tab */

  document.getElementById('name-btn').onclick = getName;
  // throw error if the name is too small
  if (nameInput.value.length < 2) {
    error();
  } else {
    // Create new player
    player = new Player(nameInput.value, 0);
    // Clean input
    document.getElementById('input-name').value = '';
    // Create new table row
    const tableBody = document.getElementById('t-body');
    tableBody.insertAdjacentHTML(
      'beforeend',
      `
    <td>${player.name} </td>
    <td id='${player.name}'>${player.score} </td>`
    );
    // Start timer
    timer();

    userName.push(player);

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

/////////////////////////
/////* Main Frame */////
///////////////////////

const url = 'https://restcountries.eu/rest/v2/all';
let correctAnswer;

//////////// Flag Vars ////////////
const flags = [];

const currentFlagName = [];

function startGame(flagList) {
  //* Current Level *//

  const currentLevel = [
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
  let level2 = [
    flagList[205],
    flagList[218],
    flagList[236],
    flagList[111],
    flagList[114],
    flagList[175],
    flagList[181],
    flagList[152],
    flagList[144],
    flagList[133],
    flagList[116]
  ];

  flags.push(currentLevel);

  //////////// Get a random flag ///////////////
  /////////////////////////////////////////////
  function newFlag() {
    if (!currentLevel.length) return showScore();
    const randomFlag = Math.floor(Math.random() * currentLevel.length);
    currentFlagName.push(currentLevel[randomFlag].name);
    currentFlagName.push(currentLevel[randomFlag].numericCode);
    // Create and append img in the html
    const img = document.createElement('img');
    img.classList.add('d-0');
    img.id = `${currentLevel[randomFlag].numericCode}`;
    img.alt = `${currentLevel[randomFlag].name}`;
    img.src = `${currentLevel[randomFlag].flag}`;
    document.getElementById('mainframe').appendChild(img);

    console.log(currentFlagName);
    //////// Correct Answer //////////
    correctAnswer = currentFlagName[0];
    correctAnswer.toLowerCase().replace(/\W\s]/g);

    if (
      document.getElementById(`${currentFlagName[1]}`).id == currentFlagName[1]
    ) {
      document.getElementById(`${currentFlagName[1]}`).classList.toggle('d-0');
    }
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

    let removeCorrectAnswerFromArray = currentLevel
      .map(function(e) {
        return e.name;
      })
      .indexOf(currentFlagName[0]);

    !currentLevel.length
      ? currentLevel.push(level2)
      : currentLevel.splice(removeCorrectAnswerFromArray, 1);

    console.log(currentLevel);

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      // Correct answer
      currentFlagName.splice(0, 2);
      document.getElementById('mainframe').firstChild.remove();
      player.score += points + 1;
      document.getElementById(`${player.name}`).innerHTML = `${player.score}`;
      correct();
      newFlag();
    } else {
      incorrect();
      // Incorrect answer
      currentFlagName.splice(0, 2);
      console.log(currentFlagName);
      document.getElementById('mainframe').firstChild.remove();
      currentLevel.splice();
      newFlag();
    }
    document.getElementById('flag-input').value = '';
  }
  submitAnswer.onclick = result;
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

//////////////
//*  AJAX *//
////////////
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

document.getElementById('player-section').style.display = 'none';

/* Players  */

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
  gameTab.classList = '';
  document.getElementById('home').classList = '';
  document.getElementById('score-list').classList = 'active';
}

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
  gameTab.classList = 'active';
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
  gameTab.classList = '';
}

/* Use Nav */

function setupNavMain(evt) {
  if (!userName.length) {
    evt.preventDefault();
  } else if (this.id == 'showGame') {
    this.onclick = showGame;
  } else if (this.id == 'home') {
    this.onclick = showHome;
  } else if (this.id == 'score-list') {
    this.onclick = showScore;
  }
}

const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.onmouseover = setupNavMain;
});
