const { BrowserWindow } = require("electron");

function isValidUsername(username) {
  if (username.indexOf(" ") >= 0 || !username.replace(" ", "").length) {
    return false;
  }
  return true;
}

function isValidPassword(password) {
  if (!(password.length >= 8) || !password.replace(" ", "").length) {
    return false;
  }
  return true;
}

module.exports = {
  isValidUsername,
  isValidPassword,
};
