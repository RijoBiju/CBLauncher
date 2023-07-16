document.querySelector(".buttons button").addEventListener("click", () => {
  let username = document.querySelector(".input-field #username").value;
  let password = document.querySelector(".input-field #password").value;
  window.electronAPI.addUserToDatabase(username, password);
});
