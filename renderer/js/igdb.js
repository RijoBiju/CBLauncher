require("dotenv").config();
const { storeItem, retrieveItem } = require("./models/Store");

let clientId = process.env.IGDB_CLIENT_ID;
let clientSecret = process.env.IGDB_CLIENT_SECRET;

function authorizeIGDB() {
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
        console.log(data);
        storeItem("access_token", data.access_token);
        storeItem("expires_in", data.expires_in);
      })
      .catch((error) => console.error(error));
  }
}

async function igdbPost(url, data) {
  let access_token = retrieveItem("access_token");
  return await fetch(url, {
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
  });
}

module.exports = {
  authorizeIGDB,
  igdbPost,
};
