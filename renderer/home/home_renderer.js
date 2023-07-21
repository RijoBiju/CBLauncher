let gameImage = document.querySelector("#game-button");
gameImage.addEventListener("click", () => {
  if (!(document.activeElement === this)) {
    document.querySelector("#game-image").src =
      "../../assets/games_selected.png";
  }
});

gameImage.addEventListener("blur", () => {
  document.querySelector("#game-image").src = "../../assets/games.png";
});

let libraryImage = document.querySelector("#library-button");
libraryImage.addEventListener("click", () => {
  if (!(document.activeElement === this)) {
    document.querySelector("#library-image").src =
      "../../assets/library_selected.png";
  }
});

libraryImage.addEventListener("blur", () => {
  document.querySelector("#library-image").src = "../../assets/library.png";
});

let settingImage = document.querySelector("#setting-button");
settingImage.addEventListener("click", () => {
  if (!(document.activeElement === this)) {
    document.querySelector("#setting-image").src =
      "../../assets/setting_selected.png";
  }
});

settingImage.addEventListener("blur", () => {
  document.querySelector("#setting-image").src = "../../assets/setting.png";
});

let imageDocuments = document.querySelectorAll(".game-image");
window.electronAPI.handleImage((event, urls) => {
  urls.forEach((item, index) => {
    url = item.replace("//", "https://");
    imageDocuments[index].setAttribute(
      "src",
      url.replace("t_thumb", "t_screenshot_big")
    );
  });
});
