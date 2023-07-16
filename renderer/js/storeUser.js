const { mongoose } = require("mongoose");
const { UserSchema } = require("./models/User");

let userExists = (User, username) => User.findOne({ username });

async function addUserToDatabase(username, password) {
  let User = mongoose.model("User", UserSchema);
  if (userExists(User, username)) {
    console.log("User already exists");
  } else {
    let userModel = new User({ username, password });
    await userModel
      .save()
      .then((doc) => console.log(doc))
      .catch((err) => console.log(err));
  }
}

module.exports = {
  addUserToDatabase,
};
