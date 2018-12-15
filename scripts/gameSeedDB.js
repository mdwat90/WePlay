const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Games collection and inserts the games below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/weplay"
);


const gameSeed = [
  {
    title: "Soccer @ Piedmont",
    sport: 'Soccer',
    author: "David Watson",
    date: new Date(Date.now()),
    authorEmail: 'mdwat@email.com'
  },
  {
    title: "Soccer @ Piedmont",
    sport: 'Soccer',
    author: "David Watson",
    date: new Date(Date.now()),
    authorEmail: 'mdwat@email.com'
  },
  {
    title: "Soccer @ Piedmont",
    sport: 'Soccer',
    author: "David Watson",
    date: new Date(Date.now()),
    authorEmail: 'mdwat@email.com'
  },
];

db.Game
  .remove({})
  .then(() => db.Game.collection.insertMany(gameSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });