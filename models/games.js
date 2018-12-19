const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const gameSchema = new Schema({
  title: { type: String, required: true },
  sport:{ type: String, required: true },
  date: {type: Date, required: true },
  gender: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  playerNumber: Number,
  time: Number,
  description: String,
  authorEmail: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  author: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
  players: [
    {
      type: Schema.Types.ObjectId,
      ref: "User"
    }
  ],
});

const Game = mongoose.model("Game", gameSchema);

module.exports = Game;
