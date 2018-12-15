const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  sport:{ type: String, required: true },
  author: { type: String, required: true },
  players: Number,
  date: {type: Date, required: true },
  time: Number,
  gender: String,
  authorEmail: { type: String, required: true },
  city: String,
  state: String,
  description: String
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
