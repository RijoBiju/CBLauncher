const { mongoose } = require("mongoose");
const { UserSchema } = require("./models/User");

async function addUserToDatabase(username, password) {
  let User = mongoose.model("User", UserSchema);
  let userModel = new User({ username, password });
  await userModel.save().catch((err) => console.log(err));
}

module.exports = {
  addUserToDatabase,
};
