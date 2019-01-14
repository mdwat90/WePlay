const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 5000;
const routes = require("./routes");
//This has to be required when started in order for the...
//nodemailer file to obtain the keys from the .env file
require("./controllers/nodeMailer");

// Define middleware here
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Serve up static assets (usually on heroku)
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}
// Add routes, both API and view
app.use(routes);

// Connect to the Mongo DB!
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || ("mongodb://localhost/weplay");
mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// console.logs that the server is up and running
app.listen(port, () => console.log(`🌎  ==> API Server now listening on PORT ${port}!`));



