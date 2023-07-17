function isValidUsername(username) {
  if (username.indexOf(" ") >= 0 || !username.replace(" ", "").length) {
    window.electronAPI.handleError((event, value) => {
      errorLabel.innerHTML = value;
    });
    return false;
  }
  return true;
}

function isValidPassword(password) {
  if (!(password.length >= 8) || !password.replace(" ", "").length) {
    window.electronAPI.handleError((event, value) => {
      errorLabel.innerHTML = value;
    });
    return false;
  }
  return true;
}

module.exports = {
  isValidUsername,
  isValidPassword,
};
