require("dotenv").config();
const { storeItem, retrieveItem } = require("./models/Store");

let clientId = process.env.IGDB_CLIENT_ID;
let clientSecret = process.env.IGDB_CLIENT_SECRET;

function authenticate() {
  let access_token = retrieveItem("access_token");
  if (!access_token) {
    let url =
      "https://id.twitch.tv/oauth2/token?client_id={clientId}&client_secret={clientSecret}&grant_type=client_credentials"
        .replace("{clientId}", clientId)
        .replace("{clientSecret}", clientSecret);
    fetch(url, {
      method: "POST",
      header: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        storeItem("access_token", data.access_token);
        storeItem("expires_in", data.expires_in);
      })
      .catch((error) => console.error(error));
  }
}

function IGDBPost(url, data) {
  let access_token = retrieveItem("access_token");
  fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Client-ID": clientId,
      Authorization: "Bearer access_token".replace(
        "access_token",
        access_token
      ),
    },
    body: data,
  })
    .then((response) => console.log(response.json()))
    .then((data) => console.log(data))
    .catch((err) => {
      console.error(err);
    });
}

module.exports = {
  authenticate,
  IGDBPost,
};
