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
  const nameInput = document.getElementById('input-name');
  /* players array */

  document.getElementById('name-btn').onclick = getName;
  // throw error if name is too small
  if (nameInput.value.length < 2) {
    const error = document.getElementById('name-error');
    error.style.display = 'flex';

    document.getElementById('close-error').onclick = function() {
      error.style.display = 'none';
    };
  } else {
    player = new Player(nameInput.value, 0);
    userName.push(player);
    document.getElementById('score-name').innerHTML = `${player.name}`;
    document.getElementById('score-score').innerHTML = `${player.score}`;

    /* open mainframe */
    document.getElementById('mainframe').parentElement.style.display = 'flex';
    /* hide name input */
    nameInput.parentElement.parentElement.style.display = 'none';
  }
  console.log(userName);
};
document.getElementById('name-btn').onclick = getName;

/////////////////////////////////////////////////////
/////////////////////* Main Frame */////////////////
///////////////////////////////////////////////////

const url = 'https://restcountries.eu/rest/v2/all';

////////////////////////////////////
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
    // current flag name
    let currentFlagNum = 0;
    let currentFlagId = 1;

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

  ///////////////
  //* Answer *//
  /////////////

  function result() {
    if (correctAnswer == 'Iran (Islamic Republic of)') {
      correctAnswer = 'iran';
    }
    const userAnswer = document.getElementById('flag-input').value;

    if (userAnswer.toLowerCase() === correctAnswer.toLowerCase()) {
      // Correct answer
      currentFlagName.splice(0, 2);
      console.log(currentFlagName);
      document.getElementById('mainframe').firstChild.remove();
      player.score += 30;
      document.getElementById('score-score').innerHTML = `${player.score}`;
      alert('correct');
      newFlag();
    } else {
      // Incorrect answer
      currentFlagName.splice(0, 2);
      console.log(currentFlagName);
      document.getElementById('mainframe').firstChild.remove();
      devSquad.splice();

      alert('Incorrect');
      newFlag();
    }
  }

  const submit = document.getElementById('submit-answer');
  submit.onclick = result;
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

//document.getElementById('player-name').style.display = 'none';
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
}

document.getElementById('showGame').onclick = showGame;
