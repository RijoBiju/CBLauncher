const { BrowserWindow } = require("electron");
const { authorizeIGDB, igdbPost } = require("./igdb");

function loadImage(urls) {
  let win = BrowserWindow.getFocusedWindow();
  win.webContents.send("load-image", urls);
}

function getCoverUrl(gameId) {
  igdbPost(
    "https://api.igdb.com/v4/covers",
    "fields url, game; where game = (gameId);".replace("gameId", gameId)
  )
    .then((response) => response.json())
    .then((data) => loadImage(data))
    .catch((err) => {
      console.error(err);
    });
}

function getGames() {
  igdbPost(
    "https://api.igdb.com/v4/games",
    "fields name, rating; limit 3; where rating > 95;"
  )
    .then((response) => response.json())
    .then((data) => {
      let ids = data.map((id) => data.id);
      getCoverUrl(ids);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  getGames,
};
