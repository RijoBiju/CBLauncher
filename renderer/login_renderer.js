document.querySelector(".register a").addEventListener("click", () => {
  let username = document.querySelector(".input-field #username").value;
  let password = document.querySelector(".input-field #password").value;
  window.electronAPI.addUser(username, password);
});

document.querySelector(".buttons button").addEventListener("click", () => {
  let username = document.querySelector(".input-field #username").value;
  let password = document.querySelector(".input-field #password").value;
  window.electronAPI.verifyUser(username, password);
});

let errorLabel = document.querySelector("#error-message");
window.electronAPI.handleError((event, value) => {
  errorLabel.innerHTML = value;
});
