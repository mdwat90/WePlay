import axios from "axios";

export default {
  // Gets all games
  getGames: function() {
    console.log("getGames in the API client side")
    return axios.get("/api/games");
  },
  // Gets the book with the given id
  getGame: function(id) {
    console.log("getGames in the API client side")
    return axios.get("/api/games/" + id);
  },
  // Deletes the book with the given id
  deleteGame: function(id) {
    console.log("deleteGame firing in the API client side")
    return axios.delete("/api/games/" + id);
  },
  // Saves a book to the database
  saveGame: function(bookData) {
    console.log("saveGame firing in the API client side")
    console.log(bookData)
    return axios.post("/api/games", bookData);
  },

  // Gets the book with the given id
  getUser: function(id) {
    console.log("getGames in the API client side")
    return axios.get("/api/users/" + id);
  },
};
