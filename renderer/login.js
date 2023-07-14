let isEmpty = (username, password) => {
  if (!username.replace(" ", "").length || !password.replace(" ", "").length) {
    return 1;
  }
};

document
  .querySelector(".buttons button")
  .addEventListener("click", function () {
    let username = document.querySelector(".input-field #username").value;
    let password = document.querySelector(".input-field #password").value;
    if (isEmpty(username, password)) {
      console.log("interesting");
    }
  });
