const { mongoose } = require("mongoose");

module.exports = {
  UserSchema: mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, min: 8, required: true },
  }),
};
