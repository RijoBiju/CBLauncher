require("dotenv").config();

function authenticatePOST() {
  let clientId = process.env.IGDB_CLIENT_ID;
  let clientSecret = process.env.IGDB_CLIENT_SECRET;
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
    .then((data) => console.log(data))
    .catch((error) => console.error(error));
}

module.exports = {
  authenticatePOST,
};
