const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  sport:{ type: String, required: true },
  date: Schema.Types.Mixed,
  gender: { type: String, required: true },
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  playerNumber: Number,
  time: Schema.Types.Mixed,
  description: String,
  authorEmail: String,
  author: String,
  authorId: String,
  authorPhoto: Schema.Types.Mixed,
  players: Schema.Types.Mixed,
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
