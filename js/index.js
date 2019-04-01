class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
}
// UI
// class UI {
//   static displayPlayer() {
//     const PlayerInGame = [
//       {
//         name: 'John'
//       }
//     ];

//     const player = PlayerInGame;

//     // New Player
//     player.forEach(p => UI.addNewPlayer(p));
//   }

//   static addNewPlayer(p) {
//     const PlayerList = document.getElementById('player-list');
//   }
// }
// Remove input
//

//////////////////////////////////////
///////////*  Name Input *///////////
////////////////////////////////////

var userName = [];
const getName = () => {
  const nameInput = document.getElementById('input-name');
  /* players array */

  document.getElementById('name-btn').onclick = getName;
  // throw error if name is too small
  if (nameInput.value.length < 2) {
    const error = document.getElementById('name-error');
    error.style.display = 'flex';

    document.getElementById('close-error').onclick = function(e) {
      error.style.display = 'none';
    };
  } else {
    let player = new Player(nameInput.value, 0);
    userName.push(player);
    /* open mainframe */
    document.getElementById('mainframe').parentElement.style.display = 'flex';
    /* hide name input */
    nameInput.parentElement.parentElement.style.display = 'none';
  }
  console.log(userName);
};
document.getElementById('name-btn').onclick = getName;
////////////////////////////////////
//////////* Main Frame *///////////
//////////////////////////////////

////////////// Flags ////////////
//const china = document.getElementById('china');

////////////////////////////////
///////////*  AJAX *///////////
//////////////////////////////

const mainframe = document.getElementById('mainframe');
const url = 'https://restcountries.eu/rest/v2/all';

function displayFlag(flagList) {
  console.log('display', flagList);
  flagList.forEach(flag => {
    const img = document.createElement('img');
    img.alt = `${flag.name}`;
    img.src = `${flag.flag}`;
    mainframe.appendChild(img);
    //console.log(flag.name);
  });
}

function getFlags() {
  console.log(axios);
  axios
    .get(url)
    .then(res => {
      displayFlag(res.data);
    })
    .catch(err => {
      console.error(err);
    });
}

const submit = document.getElementById('submit-answer');
submit.onclick = getFlags;

////////////////////////////////////////

////////////////////////////////////
////////////////////////////////////

if (china.style.display !== 'none') {
  document
    .getElementById('submit-answer')
    .addEventListener('click', function answer() {
      const answer = document.getElementById('flag-input').value;
      console.log(answer);

      console.log(china.alt.toLowerCase());

      if (answer.toLowerCase() === china.alt.toLowerCase()) {
        alert('correct!');
        china.style.display = 'none';
        france.style.display = 'flex';
      }
    });
}

////////////////////////////////////////
document.getElementById('player-name').style.display = 'none';
//document.getElementById('game-frame').style.display = 'none';

/*  */

/*  */
/* Players  */
document.getElementById('player-section').remove();
