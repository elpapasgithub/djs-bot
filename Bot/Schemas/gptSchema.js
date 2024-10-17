const { Schema, model } = require("mongoose");

let gpt = new Schema({
  GuildId: String,
  ChannelId: String,
});

module.exports = model(`gpt`, gpt);