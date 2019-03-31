class Player {
  constructor(name, score) {
    this.name = name;
    this.score = score;
  }
  static player() {}
}
// UI
class UI {
  static displayPlayer() {
    const PlayerInGame = [
      {
        name: 'John'
      }
    ];

    const player = PlayerInGame;

    // New Player
    player.forEach(p => UI.addNewPlayer(p));
  }

  static addNewPlayer(p) {
    const PlayerList = document.getElementById('player-list');
  }
}
// Remove input
//
/* Main Frame */
document.getElementById('mainframe').parentElement.remove();
/*  */
/*  Name Input */
//document.getElementById('input-name').parentElement.parentElement.remove();

function getName(e) {
  let userName = [];
  const nameInput = document.getElementById('input-name');

  // throw error if name is too small
  if (!nameInput.value) {
    alert('The name should have at least one character');
  } else {
    userName.push(nameInput.value);
  }

  console.log(userName);
}
document.getElementById('name-btn').onclick = getName;

//nameInput.onkeydown =

// const newPlayer = () => {
//   document.getElementById('input-name').addEventListener('submit', e => {
//     // prevent default submit
//     e.preventDefault();
//     // get form values
//     const name = document.getElementById('name').value;
//     const score = document.getElementById('score').value;

//     // create new item
//     const player = new Player(name, score);
//     // Add item
//     UI.addNewPlayer(player);
//     // clear fields
//     UI.clearFields();
//   });
// };

/*  */
/* Players  */
document.getElementById('player-section').remove();
