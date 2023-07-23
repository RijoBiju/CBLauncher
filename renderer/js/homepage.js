const { BrowserWindow } = require("electron");
const { authorizeIGDB, igdbPost } = require("./igdb");

function loadImage(urls) {
  let win = BrowserWindow.getFocusedWindow();
  console.log(urls);
  console.log(urls.length);
  if (urls.length === 3) {
    win.webContents.send("load-image", urls);
  } else {
    win.webContents.send("load-popular", urls);
  }
}

function getCoverUrl(gameId) {
  console.log(gameId);
  let yo = "fields url, game; where game = (gameId);".replace("gameId", gameId);
  console.log(yo);
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

function searchGames(searchString) {
  console.log("search '{}'; fields name, cover;".replace("{}", searchString));
  igdbPost(
    "https://api.igdb.com/v4/games",
    'search "{}"; fields name, category, version_parent; where category = 0 & version_parent = null;'.replace(
      "{}",
      searchString
    )
  )
    .then((response) => response.json())
    .then(async (data) => {
      console.log(data);
      let ids = await data.map((game_id) => game_id.id);
      // let first_set = ids.slice(0, 3);
      // let second_set = ids.slice(3, 8);
      // getCoverUrl(first_set);
      // getCoverUrl(second_set);
      getCoverUrl(ids);
    })
    .catch((err) => {
      console.error(err);
    });
}

function getGames() {
  igdbPost(
    "https://api.igdb.com/v4/games",
    "fields name, aggregated_rating; limit 12; where aggregated_rating >= 90; sort aggregated_rating desc;"
  )
    .then((response) => response.json())
    .then(async (data) => {
      let ids = await data.map((game_id) => game_id.id);
      // let first_set = ids.slice(0, 3);
      // let second_set = ids.slice(3, 8);
      // getCoverUrl(first_set);
      // getCoverUrl(second_set);
      getCoverUrl(ids);
    })
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  getGames,
  searchGames,
};
