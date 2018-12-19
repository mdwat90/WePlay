import React, { Component } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";
import SideNav from "../../components/SideNav/SideNav";

class Books extends Component {
  // Setting our component's initial state
  state = {
    books: [],
    title: "",
    sport: "",
    authorEmail: "",
    author: "",
    players: "",
    date: "",
    time: "",
    gender: "",
    city: "",
    state: "",
    description: ""
  };

  // When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadBooks();
  }

  // Loads all books  and sets them to this.state.books
  loadBooks = () => {
    API.getBooks()
      .then(res =>
        this.setState({ books: res.data, title: "", sport: "", author: "", authorEmail: "", synopsis: "" })
      )

      .catch(err => console.log(err));
  };

  // Deletes a book from the database with a given id, then reloads books from the db
  deleteBook = id => {
    console.log("deletebook firing in Books.js client")
    API.deleteBook(id)
      .then(res => this.loadBooks())
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
      API.saveBook({
        title: this.state.title,
        author: this.state.author,
        //sport: this.state.sport,
        //players: this.state.players,
        //date: this.state.date,
        //time:this.state.time,
        //gender: this.state.gender,
        //city: this.state.city,
        //state: this.state.state,
        //description: this.state.description,
        //authorEmail: this.state.authorEmail,
      })
        .then(res => this.loadBooks())
        .catch(err => console.log(err));
    }
  };

  render() {
    return (
      <Container fluid>
        <Row>
          <Col size="md-10">
            <Jumbotron>
              <h1>WePlay</h1>
            </Jumbotron>
            <SideNav />
            </Col>
        </Row>
  
  
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
                value={this.state.sport}
                onChange={this.handleInputChange}
                name="sport"
                placeholder="Sport (required)"
              />
              <Input
                value={this.state.players}
                onChange={this.handleInputChange}
                name="players"
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
                value={this.state.authorEmail}
                onChange={this.handleInputChange}
                name="authorEmail"
                placeholder="Authors Email (required)"
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
            
            {this.state.books.length ? (
              <List>
                {this.state.books.map(book => {
                  return (
                    <ListItem key={book._id}>
                      <a href={"/books/" + book._id}>
                        <strong>
                          {book.title} by {book.author}
                        </strong>
                      </a>
                      <h6>Playing: {book.sport}</h6>
                      <h6>Email: {book.authorEmail}</h6>
                      <DeleteBtn onClick={() => this.deleteBook(book._id)} />
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

export default Books;
