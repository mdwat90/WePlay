const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Games collection and inserts the games below

mongoose.connect(
  process.env.MONGODB_URI ||
  "mongodb://localhost/weplay"
);


const userSeed = [
  {
    name: 'David',
    email: 'dwat@email.com'
  },
  {
    name: 'David',
    email: 'dwat@email.com'
  },
];


db.User
  .remove({})
  .then(() => db.User.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });
