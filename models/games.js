const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  sport:{ type: String, required: true },
  date: String,
  gender: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  playerNumber: Number,
  time: String,
  description: String,
  authorEmail: String,
  author: String,
  authorId: String,
  authorPhoto: String,
  players: [{email: String, photo: String}]
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
