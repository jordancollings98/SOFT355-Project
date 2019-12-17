var modal = document.getElementById('loginModal');

//Modal force closes when clicked out of.
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
