const { mongoose } = require("mongoose");
const { UserSchema } = require("./models/User");
const { formPageError } = require("./errors");

let userExists = async (User, username) =>
  await User.findOne({ username }).exec();

async function addUserToDatabase(username, password) {
  let User = mongoose.model("User", UserSchema);
  if (await userExists(User, username)) {
    formPageError("User already exists. Contact dev");
  } else {
    let userModel = new User({ username, password });
    await userModel.save().catch((err) => formPageError(err));
  }
}

async function loadHash(username) {
  let User = mongoose.model("User", UserSchema);
  let doc = await userExists(User, username);
  if (doc) return doc.password;
  return false;
}

module.exports = {
  addUserToDatabase,
  loadHash,
};
