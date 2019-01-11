import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
// import SideNav from "../../components/SideNav/SideNav";

let uId = '5c15564ef0adbf8c0fbab4a7'

// function to retrieve userId
// userId = () =>


class Games extends Component {
  // Setting our component's initial state
  state = {
    games: [],
    title: "",
    sport: "",
    authorEmail: "",
    author: "",
    authorId: "",
    playerNumber: "",
    // date: "",
    // time: "",
    gender: "",
    city: "",
    state: "",
    description: "",
    emailToWho: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadGames();
    this.loadUser(uId);
  }

  // Loads all books and sets them to this.state.books
  loadGames = () => {
    API.getGames()
      .then(res =>
        this.setState({
          games: res.data,
          title: "",
          sport: "",
          playerNumber: "",
          date: "",
          time: "",
          gender: "",
          city: "",
          state: "",
          description: ""
        })
      )

      .catch(err => console.log(err));
  };


  // Loads all books  and sets them to this.state.books
  loadUser = id => {
    API.getUser(id)
      .then(res =>
        this.setState({
          author: res.data.name,
          authorEmail: res.data.email
        })
      )

      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteGame = id => {
    console.log("deleteGame firing in Games.js client")
    API.deleteGame(id)
      .then(res => this.loadGames())
      .catch(err => console.log(err));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // When the form is submitted, use the API.saveBook method to save the book data
  // Then reload books from the database
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.title && this.state.author) {
      API.saveGame({
        title: this.state.title,
        author: this.state.author,
        sport: this.state.sport,
        playerNumber: this.state.playerNumber,
        // date: this.state.date,
        // time:this.state.time,
        gender: this.state.gender,
        city: this.state.city,
        state: this.state.state,
        description: this.state.description,
        authorEmail: this.state.authorEmail,
        authorId: uId,
      })
        .then(res => this.loadGames())
        .catch(err => console.log(err));
    }
  };


  sendMail = () => {
    console.log("sendMail hit on books.js")
    API.sendMail({
      emailToWho: this.state.emailToWho
    })
  }
  // sendMail = emailToWho => {
  //   console.log("sendMail hit on books.js")
  //   API.sendMail(emailToWho)
  // }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-10">
            <Jumbotron>
              <h1>WePlay</h1>
            </Jumbotron>
            {/* <SideNav /> */}
          </Col>
        </Row>

        <form size="md-10">
          <Input
            value={this.state.emailToWho}
            type="email"
            onChange={this.handleInputChange}
            name="emailToWho"
            placeholder="Email to who?"
          />
          <FormBtn
            onClick={() => this.sendMail()}
          >Send Mail
              </FormBtn>
        </form>
        <form size="md-10">
          <Input
            value={this.state.title}
            onChange={this.handleInputChange}
            name="title"
            placeholder="Title (required)"
          />
          <Input
            value={this.state.author}
            onChange={this.handleInputChange}
            name="author"
            placeholder="Author (required)"
          />
          <Input
            value={this.state.authorEmail}
            onChange={this.handleInputChange}
            name="authorEmail"
            placeholder="Authors Email (required)"
          />
          <Input
            value={this.state.sport}
            onChange={this.handleInputChange}
            name="sport"
            placeholder="Sport (required)"
          />
          <Input
            value={this.state.playerNumber}
            onChange={this.handleInputChange}
            name="playerNumber"
            placeholder="Players"
          />
          <Input
            value={this.state.date}
            onChange={this.handleInputChange}
            name="date"
            placeholder="Date (required)"
          />
          <Input
            value={this.state.time}
            onChange={this.handleInputChange}
            name="time"
            placeholder="Time"
          />
          <Input
            value={this.state.gender}
            onChange={this.handleInputChange}
            name="gender"
            placeholder="Gender"
          />
          <Input
            value={this.state.city}
            onChange={this.handleInputChange}
            name="city"
            placeholder="City"
          />
          <Input
            value={this.state.state}
            onChange={this.handleInputChange}
            name="state"
            placeholder="State"
          />
          <TextArea
            value={this.state.description}
            onChange={this.handleInputChange}
            name="descrition"
            placeholder="Descripton (Optional)"
          />
          <FormBtn
            disabled={!(this.state.author && this.state.title)}
            onClick={this.handleFormSubmit}
          >
            Submit Event
              </FormBtn>
        </form>

        <Col size="md-6">

          <h1>Current Events</h1>

          {this.state.games.length ? (
            <List>
              {this.state.games.map(game => {
                return (
                  <ListItem key={game._id}>
                    <a href={"/games/" + game._id}>
                      <strong>
                        {game.title} by {game.author}
                      </strong>
                    </a>
                    <h6>Sport: {game.sport}</h6>
                    <h6>Email: {game.authorEmail}</h6>
                    <h6># of Players: {game.playerNumber}</h6>
                    <h6>Location: {game.city}, {game.state}</h6>
                    <h6>Male/Female/Co-ed: {game.gender}</h6>
                    <h6>Description: {game.description}</h6>
                    <DeleteBtn onClick={() => this.deleteGame(game._id)} />
                  </ListItem>
                );
              })}
            </List>
          ) : (
              <h3>No Results to Display</h3>
            )}
        </Col>

      </Container>
    );
  }
}

export default Games;
