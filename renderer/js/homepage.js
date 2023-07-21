const { BrowserWindow } = require("electron");
const { authorizeIGDB, igdbPost } = require("./igdb");

let urls = [];

function loadImage(data) {
  data.forEach((item) => {
    let coverUrl = item.url;
    urls.push(coverUrl);
  });
  if (urls.length === 3) {
    console.log(urls);
    let win = BrowserWindow.getFocusedWindow();
    win.webContents.send("load-image", urls);
  }
}

function getCoverUrl(gameId) {
  igdbPost(
    "https://api.igdb.com/v4/covers",
    "fields url; where game = gameId;".replace("gameId", gameId)
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
    .then((data) =>
      data.forEach((item) => {
        let gameId = item.id;
        getCoverUrl(gameId);
      })
    )
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  getGames,
};
