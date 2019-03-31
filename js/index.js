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
//document.getElementById('input-name').parentElement.parentElement.remove();
var userName = [];
const getName = () => {
  const nameInput = document.getElementById('input-name');
  /* players array */

  document.getElementById('name-btn').onclick = getName;
  // throw error if name is too small
  if (!nameInput.value) {
    alert('The name should have at least one character');
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

////////////// Flag ////////////
const flag = document.getElementById('mainframe');
flag.style.background = 'url(../img/portugal.png) no-repeat';
flag.style.backgroundSize = 'cover';
///////////////////////////////////////
document
  .getElementById('submit-answer')
  .addEventListener('click', function answer() {
    const answer = document.getElementById('flag-input').value;
    //console.log(answer);
    const flagName = (document.getElementById(
      'mainframe'
    ).style.backgroundImage = '../img/china.png');
    console.log(flagName.valueOf(flagName));
  });
////////////////////////////////////////
document.getElementById('player-name').style.display = 'none';
/*  */

/*  */
/* Players  */
document.getElementById('player-section').remove();
