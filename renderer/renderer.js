document.querySelector(".buttons button").addEventListener("click", () => {
  let username = document.querySelector(".input-field #username").value;
  let password = document.querySelector(".input-field #password").value;
  window.electronAPI.addUserToDatabase(username, password);
});

document.querySelector(".register a").addEventListener("click", () => {
  let username = document.querySelector(".input-field #username").value;
  let password = document.querySelector(".input-field #password").value;
  window.electronAPI.addUserToDatabase(username, password);
});

const errorLabel = document.querySelector(".form #error-message");

window.electronAPI.handleError((event, value) => {
  errorLabel.innerHTML = value;
});
