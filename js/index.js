/* Fun With Flags */

document.getElementById('btn').addEventListener('click', a => {
  let result = 'no';
  let userAnswer = document.getElementById('input');

  let mainframe = document.getElementById('mainframe');

  userAnswer.value == 'china' ? (result = 'yes') : (result = 'no');
  let random = Math.floor(Math.random() * 10);
  // random background
  let mainBg = `url(../img/${random}.png) no-repeat`;
  // After Answer

  if (result === 'yes') {
    let correctA;
    let bgChange = mainframe.style;
    function correctAnswerBg() {
      bgChange.background = window.setTimeout(
        (bgChange.background = mainBg),
        1000
      );
      bgChange.backgroundSize = 'cover';
      correctA = window.setTimeout(window.alert, 10, 'Correct!');
    }
    window.onload = correctAnswerBg();
  }
});

//mainframe.style.display = 'none';
//userAnswer.style.display = 'none';
//userBtn.style.display = 'none';

//mainframe.addEventListener('click', e => (e.style.display = 'flex'));

mainframe.addEventListener('click', function(e) {
  mainframe.style.visibility = 'visible';
  let userInput = e.target.value;
});
