function error() {
  const error = document.getElementById('name-error');
  error.style.display = 'flex';

  document.getElementById('close-error').onclick = function() {
    error.style.display = 'none';
  };
}
