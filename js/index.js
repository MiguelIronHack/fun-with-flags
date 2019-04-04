//*  AJAX *//
const url = 'https://restcountries.eu/rest/v2/all';
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
window.onload = getFlags;
////////////////////////
const submitAnswer = document.getElementById('submit-answer');
const inputNameBtn = document.getElementById('name-btn');
const gameTab = document.getElementById('showGame');
const mainFrame = document.getElementById('mainframe');
const home = document.getElementById('home');
const scoreList = document.getElementById('score-list');
const about = document.getElementById('about');
const playerSection = document.getElementById('player-section');
const playerName = document.getElementById('player-name');
const gameFrame = document.getElementById('game-frame');
const aboutMe = document.getElementById('about-me');
/////////// Press Enter ///////////
document.getElementById('flag-input').addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    submitAnswer.click();
  }
});
document.getElementById('input-name').addEventListener('keyup', e => {
  if (e.keyCode === 13) {
    e.preventDefault();
    inputNameBtn.click();
  }
});
////
class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
//*  Timer *//
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
//////////////////////////////////////
///////////*  Name Input *///////////
////////////////////////////////////
let player;
let userName = [];

const getName = () => {
  /* Name input */
  const nameInput = document.getElementById('input-name');
  /* show game tab */

  inputNameBtn.onclick = getName;
  // throw error if the name is too small
  if (nameInput.value.length < 2) {
    error();
  } else {
    // Create new player
    player = new Player(nameInput.value, 0);
    // Clean input
    nameInput.value = '';
    // Create new table row
    const tableBody = document.getElementById('t-body');
    tableBody.insertAdjacentHTML(
      'beforeend',
      `
    <td class='user-name'>${player.name} </td>
    <td> </td>
    <td class='user-score' id='${player.name}'>${player.score} </td>`
    );
    // Start timer
    timer();
    userName.push(player);
    /* Change active nav */
    home.classList = '';
    gameTab.classList = 'active';
    /* open mainframe */
    mainFrame.parentElement.style.display = 'flex';
    /* hide name input */
    nameInput.parentElement.parentElement.style.display = 'none';
  }
};
inputNameBtn.onclick = getName;

/// errors ///
function error() {
  const error = document.getElementById('name-error');
  error.style.display = 'flex';

  document.getElementById('close-error').onclick = function() {
    error.style.display = 'none';
  };
}
function navError() {
  const error = document.getElementById('nav-error');
  error.style.display = 'flex';

  document.getElementById('close-nav-error').onclick = function() {
    error.style.display = 'none';
  };
}
/////////////////////////
/////* Main Frame */////
///////////////////////
let countStreak = 0;
let correctAnswer;
let functionStopper = '';
// Flag Variables //
let flags = [];
let currentFlagName = [];
let currentLevel;
function startGame(flagList) {
  //* Current Level *//

  currentLevel = [
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
    flagList[212],
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
  function newFlag() {
    if (!currentLevel.length) {
      functionStopper = 'stop';
      // Open level finished
      setTimeout(levelFinished, 1000);

      // Change nav to scoreboard after array is empty
      return showScore();
    }
    //////////
    const randomFlag = Math.floor(Math.random() * currentLevel.length);
    currentFlagName.push(currentLevel[randomFlag].name);
    currentFlagName.push(currentLevel[randomFlag].numericCode);
    // Create and append img in the html
    const img = document.createElement('img');
    img.id = `${currentLevel[randomFlag].numericCode}`;
    img.alt = `${currentLevel[randomFlag].name}`;
    img.src = `${currentLevel[randomFlag].flag}`;
    mainFrame.appendChild(img);
    //////// Correct Answer //////////
    correctAnswer = currentFlagName[0];
    correctAnswer.toLowerCase().replace(/\W\s]/g);
  }
  newFlag();
  //* Answer Result *//
  function result() {
    if (correctAnswer == 'Iran (Islamic Republic of)') {
      correctAnswer = 'iran';
    }
    if (correctAnswer == 'Viet Nam') {
      correctAnswer = 'vietnam';
    }
    if (correctAnswer == 'United States of America') {
      correctAnswer = 'usa';
    }

    let userAnswer = document.getElementById('flag-input');

    let removeCorrectAnswerFromArray = currentLevel
      .map(function(e) {
        return e.name;
      })
      .indexOf(currentFlagName[0]);

    if (currentLevel.length) {
      currentLevel.splice(removeCorrectAnswerFromArray, 1);
    }

    if (
      userAnswer.value.toLowerCase().trim() ===
      correctAnswer.toLowerCase().trim()
    ) {
      correct();
      setTimeout(newFlag, 1000);
    } else {
      incorrect();
      // Incorrect answer
      currentFlagName.splice(0, 2);
      mainFrame.firstChild.remove();
      currentLevel.splice();
      newFlag();
    }
    // clean user input
    userAnswer.focus();
    userAnswer.value = '';
  }

  submitAnswer.onclick = result;
  //// level counter ////
}

/* Answer */
function correct() {
  currentFlagName.splice(0, 2);
  mainFrame.firstChild.remove();
  player.score += points + 10;
  document.getElementById(`${player.name}`).innerHTML = `${player.score}`;
  const success = document.getElementById('success');
  success.style.display = 'flex';
  countStreak++;

  if (countStreak == 3) {
    badge(3);
    setTimeout(() => (earnedBadge('bronze'), 2500));
  } else if (countStreak == 10) {
    badge(5);
    setTimeout(() => (earnedBadge('silver'), 2500));
  } else if (countStreak == 20) {
    badge(10);
    setTimeout(() => (earnedBadge('gold'), 2500));
  }
  setTimeout(() => (success.style.display = 'none'), 1000);
}

function incorrect() {
  const incorrect = document.getElementById('incorrect');
  incorrect.style.display = 'flex';
  countStreak = 0;

  setTimeout(() => (incorrect.style.display = 'none'), 1000);
}

function levelFinished() {
  const endOfLevel = document.getElementById('level-finished');
  endOfLevel.style.display = 'flex';

  setTimeout(() => (endOfLevel.style.display = 'none'), 2500);
}
function earnedBadge(trophyType) {
  const bronze = document.getElementById('bronze-modal');
  const silver = document.getElementById('silver-modal');
  const gold = document.getElementById('gold-modal');
  if (trophyType == 'bronze') {
    bronze.style.display = 'flex';
    setTimeout(() => (bronze.style.display = 'none'), 2500);
  } else if (trophyType == 'silver') {
    silver.style.display = 'flex';
    setTimeout(() => (silver.style.display = 'none'), 2000);
  } else if (trophyType == 'gold') {
    gold.style.display = 'flex';
    setTimeout(() => (gold.style.display = 'none'), 2000);
  }
}
// The badge system //
function badge(streak) {
  let trophyTable = document.getElementById('trophies');

  if (streak == 3) {
    bronzeBadge();
  } else if (streak == 5) {
    silverBadge();
  } else if (streak == 10) {
    goldBadge();
  }

  function bronzeBadge() {
    let trophy =
      '<div id="trophy" class="trophy bronze"><i class="fas fa-trophy fa-2x "></i><p>Bronze Trophy</p></div>';
    trophyTable.insertAdjacentHTML('beforeend', trophy);
    points += 10;
  }
  function silverBadge() {
    document.getElementById('trophy');
    let trophy =
      '<div id="trophy" class="trophy silver"><i class="fas fa-trophy fa-2x "></i><p>Silver Trophy</p></div>';
    trophyTable.insertAdjacentHTML('beforeend', trophy);
    points += 25;
  }
  function goldBadge() {
    let trophy =
      '<div id="trophy" class="trophy gold"><i class="fas fa-trophy fa-2x "></i><p>Gold Trophy</p></div>';
    trophyTable.insertAdjacentHTML('beforeend', trophy);
    points += 50;
  }
}

//////////////////////////////////////
///////////*  Show Score *///////////
////////////////////////////////////

function showScore() {
  playerSection.style.display = 'flex';
  playerSection.style.justifyContent = 'center';
  playerName.style.display = 'none';
  gameFrame.style.display = 'none';
  aboutMe.style.display = 'none';

  /* Change nav  */
  gameTab.classList = '';
  home.classList = '';
  scoreList.classList = 'active';
  about.classList = '';
}

/////////////////////////////////////
///////////*  Show Game *///////////
///////////////////////////////////

function showGame() {
  if (functionStopper == 'stop') {
    location.reload();
    return;
  }
  playerSection.style.display = 'none';
  playerName.style.display = 'none';
  gameFrame.style.display = 'flex';
  aboutMe.style.display = 'none';
  /* Change nav  */
  scoreList.classList = '';
  home.classList = '';
  gameTab.classList = 'active';
  about.classList = '';
}

/////////////////////////////////////
///////////*  Show Home *///////////
///////////////////////////////////

function showHome() {
  if (functionStopper == 'stop') {
    location.reload();
    return;
  }
  playerSection.style.display = 'none';
  playerName.style.display = 'block';
  gameFrame.style.display = 'none';
  aboutMe.style.display = 'none';

  /* Change nav  */
  scoreList.classList = '';
  home.classList = 'active';
  gameTab.classList = '';
  about.classList = '';
}
/////////////////////////////////////
///////////*  Show About *///////////
///////////////////////////////////

function showAbout() {
  playerSection.style.display = 'none';
  playerName.style.display = 'none';
  gameFrame.style.display = 'none';
  aboutMe.style.display = 'flex';
  /* Change nav  */
  scoreList.classList = '';
  home.classList = '';
  gameTab.classList = '';
  about.classList = 'active';
}

/* Use Nav */
function setupNavMain(evt) {
  if (!userName.length) {
    evt.preventDefault();
    this.onclick = navError;
  } else if (this.id == 'showGame') {
    this.onclick = showGame;
  } else if (this.id == 'score-list') {
    this.onclick = showScore;
  }

  if (this.id == 'home') {
    this.onclick = showHome;
  }
  if (this.id == 'about') {
    this.onclick = showAbout;
  }
}

const navLinks = document.querySelectorAll('.nav-list a');
navLinks.forEach(link => {
  link.onmouseover = setupNavMain;
});
