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

/////////////////////////////////////////////////////
/////////////////////* Main Frame */////////////////
///////////////////////////////////////////////////

////////////////////////////////
///////////*  AJAX *///////////
//////////////////////////////

const mainframe = document.getElementById('mainframe');
const url = 'https://restcountries.eu/rest/v2/all';

function displayFlag(flagList) {
  //console.log('Country List', flagList);

  flagList.forEach(flag => {
    flags.push(flag);
    ////////////////////////////////////////
    ////////////* Add images  *////////////
    const img = document.createElement('img');
    img.classList.add('d-0');
    img.id = `${flag.numericCode}`;
    img.alt = `${flag.name}`;
    img.src = `${flag.flag}`;
    mainframe.appendChild(img);
    /////////////////////////////////////
  });

  const randomFlag = Math.floor(Math.random() * 250);

  currentFlagName.push(flagList[randomFlag].name);
  currentFlagName.push(flagList[randomFlag].numericCode);

  console.log(currentFlagName[1]);

  console.log(document.getElementById(`${currentFlagName[1]}`));

  if (
    document.getElementById(`${currentFlagName[1]}`).id == currentFlagName[1]
  ) {
    document.getElementById(`${currentFlagName[1]}`).classList.toggle('d-0');
  }
}

//////////// Current Flag ////////////
const currentFlagName = [];

function getFlags() {
  axios
    .get(url)
    .then(res => {
      displayFlag(res.data);
    })
    .catch(err => {
      console.error(err);
    });
}
// all the flags
const flags = [];

///////////////////////////////////////////
const submit = document.getElementById('submit-answer');
window.onload = getFlags;

////////////////////////////////////////

////////////////////////////////////
////////////////////////////////////

// if (china.style.display !== 'none') {
//   document
//     .getElementById('submit-answer')
//     .addEventListener('click', function answer() {
const answer = document.getElementById('flag-input').value;
console.log(answer);
//       console.log(answer);

//       console.log(china.alt.toLowerCase());

//       if (answer.toLowerCase() === china.alt.toLowerCase()) {
//         alert('correct!');
//         china.style.display = 'none';
//         france.style.display = 'flex';
//       }
//     });
// }

////////////////////////////////////////
//document.getElementById('player-name').style.display = 'none';
document.getElementById('game-frame').style.display = 'none';

/*  */

/*  */
/* Players  */
document.getElementById('player-section').remove();
