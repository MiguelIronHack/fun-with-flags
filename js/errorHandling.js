function invalidAnswer(input) {
  !input.value
    ? input.setCustomValidity('You can at least try...')
    : input.setCustomValidity('');
}
