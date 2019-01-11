import axios from "axios";

export default {
  // Gets all books
  getBooks: function() {
    console.log("getBooks in the API client side")
    return axios.get("/api/games");
  },
  // Gets the book with the given id
  getBook: function(id) {
    console.log("getBooks in the API client side")
    return axios.get("/api/games/" + id);
  },
  // Deletes the book with the given id
  deleteBook: function(id) {
    console.log("deleteBook firing in the API client side")
    return axios.delete("/api/games/" + id);
  },
  // Saves a book to the database
  saveBook: function(gameData) {
    console.log("saveBook firing in the API client side")
    console.log(gameData)
    return axios.post("/api/games", gameData);
  },
  // sends mail
  sendMail: function(emailToWho) {
    console.log("sendMail hit in API.js client side")
    console.log(emailToWho)
    return axios.post("/api/sendMail", emailToWho)
  }
};
