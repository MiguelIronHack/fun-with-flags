function invalidAnswer(input) {
  !input.value
    ? input.setCustomValidity('You can at least try...')
    : input.setCustomValidity('');
}

// function invalidName(t) {
//   if (!t.value) {
//     t.setCustomValidity('The name should be at least two characters long');
//   } else {
//     t.setCustomValidity('');
//   }
// }
