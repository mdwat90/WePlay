import React, { Component } from "react";
import "../../components/SideNav/SideNav.css"
import DeleteBtn from "../../components/DeleteBtn";
//import { List, ListItem } from "../../components/List";
import API from "../../utils/API";
import {List, ListItem} from "../../components/List"
import { TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Navbar, NavItem, SideNav, SideNavItem, Modal, Collapsible, CollapsibleItem, Collection, CollectionItem, Badge, Input, Button, Table } from 'react-materialize';
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
    date: "",
    time: "",
    //gender: "",
    city: "",
    state: "",
    description: "",
    emailToWho: "",
    userImage: this.props.userImage,
    userID: this.props.userID

  };

  //When the component mounts, load all books and save them to this.state.books
  componentDidMount() {
    this.loadGames();
    this.loadUser(this.state.userID);
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
        authorId: this.state.userID,
      })
        .then(res => this.loadGames())
        .catch(err => console.log(err));
    }
  };

  sendMail = () => {
    console.log("sendMail hit on games.js")
    API.sendMail({
      emailToWho: this.state.emailToWho
    })
  }


  render() {
    return (

      <Row>
        <Col s={8} offset='s4'>
          <Navbar className="cyan darken-3 center">
            <h4>WePlay</h4>
            <NavItem>
            </NavItem>
          </Navbar>



          <h3 className="center">Current Games</h3>

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
              <h5 className="center">No Results to Display</h5>
            )}
        </Col>


        <SideNav 
          // trigger={<Button></Button>}
          // options={{ closeOnClick: true }}
        >
          {/* USER SIDENAV SECTION */}
          <SideNavItem userView
            user={{
              background: "https://media.istockphoto.com/photos/abstract-blue-background-picture-id875762470?k=6&m=875762470&s=612x612&w=0&h=FYhQuC9CZlxOZW-rAkEvQ0jq1onsY18bUN9a2HBQd3k=",
              image: this.state.userImage,
              name: this.state.author,
              email: this.state.authorEmail
            }}
          />
          {/* <SideNavItem>{this.state.author}</SideNavItem>
          <SideNavItem>{this.state.userID}</SideNavItem> */}
          <SideNavItem>
            <button onClick={this.props.auth.logout}>Logout</button>
          </SideNavItem>
          <SideNavItem subheader>Filters</SideNavItem>
          {/* FILTER FOR GENDER */}
          {/* FILTER DATE */}
          <Row>
            <SideNavItem >
              <Input s={12} label='Date Selector' name='on' type='date' onChange={function (e, value) { }} />
            </SideNavItem>
          </Row>
          <SideNavItem>
            <Input name='coed' type='checkbox' value='coed' label='Co-Ed' defaultChecked='checked' />
          </SideNavItem>
          <SideNavItem>
            <Input name='male' type='checkbox' value='male' label='Male Only' />
          </SideNavItem>
          <SideNavItem>
            <Input name='female' type='checkbox' value='female' label='Female Only' />
          </SideNavItem>
          <br></br>
          {/* FILTER SPORT-AUTOPOPULATE FROM DB */}
          <SideNavItem>
            <Row>
              <Input s={12} type='select' label="Select Sport">
                <option value='all'>All</option>
                <option value='1'>Soccer</option>
                <option value='2'>Tennis</option>
                <option value='3'>Football</option>
              </Input>
            </Row>
          </SideNavItem>
          {/* FILTER LOCATION- AUTOPOPULATE FROM DB */}
          <SideNavItem>
            <Row>
              <Input s={12} type='select' label="Select Loation">
                <option value='all'>All</option>
                <option value='1'>Denver</option>
                <option value='2'>Centennial</option>
                <option value='3'>Aurora</option>
              </Input>
            </Row>
          </SideNavItem>

          <br></br>
          <SideNavItem divider />
          <br></br>
          {/* DROP DOWN UPCOMING GAMES */}

          <Collapsible>
            <Badge>4</Badge>
            <CollapsibleItem header='Upcoming Games' icon='arrow_drop_down'>
              <Collection>
                {/* THIS WILL DISPLAY 4 UPCOMING GAMES */}
                <CollectionItem>
                  <Modal
                    header='Tennis'
                    trigger={<Button className="white" flat waves="teal">Tennis</Button>}>
                    <Table>
                      <thead>
                        <tr>
                          <th data-field="id">Sport</th>
                          <th data-field="name">Location</th>
                          <th data-field="price">Date</th>
                          <th data-field="price">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tennis</td>
                          <td>Denver</td>
                          <td>January 26, 2019</td>
                          <td>2:00pm</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th data-field="id">Descripton</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>SPORTS GAME DESCRIPTION</td>
                        </tr>
                      </tbody>

                    </Table>
                  </Modal>
                </CollectionItem>
                {/* THIS WILL AUTO POPULATE FROM DB */}
                <CollectionItem >
                  <Modal
                    header='Football'
                    trigger={<Button className="white" flat waves="teal">Football</Button>}>
                    <Table>
                      <thead>
                        <tr>
                          <th data-field="id">Sport</th>
                          <th data-field="name">Location</th>
                          <th data-field="price">Date</th>
                          <th data-field="price">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Football</td>
                          <td>Denver</td>
                          <td>January 26, 2019</td>
                          <td>2:00pm</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th data-field="id">Descripton</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>SPORTS GAME DESCRIPTION</td>
                        </tr>
                      </tbody>

                    </Table>
                  </Modal>
                </CollectionItem>
                <CollectionItem > <Modal
                  header='Game'
                  trigger={<Button className="white" flat waves="teal">Game</Button>}>
                  <Table>
                    <thead>
                      <tr>
                        <th data-field="id">Sport</th>
                        <th data-field="name">Location</th>
                        <th data-field="price">Date</th>
                        <th data-field="price">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Game</td>
                        <td>Denver</td>
                        <td>January 26, 2019</td>
                        <td>2:00pm</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th data-field="id">Descripton</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SPORTS GAME DESCRIPTION</td>
                      </tr>
                    </tbody>

                  </Table>
                </Modal></CollectionItem>
                <CollectionItem> <Modal
                  header='Soccer'
                  trigger={<Button className="white" flat waves="teal">Soccer</Button>}>
                  <Table>
                    <thead>
                      <tr>
                        <th data-field="id">Sport</th>
                        <th data-field="name">Location</th>
                        <th data-field="price">Date</th>
                        <th data-field="price">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Soccer</td>
                        <td>Denver</td>
                        <td>January 26, 2019</td>
                        <td>2:00pm</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th data-field="id">Descripton</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SPORTS GAME DESCRIPTION</td>
                      </tr>
                    </tbody>

                  </Table>
                </Modal>
                </CollectionItem>
              </Collection>
            </CollapsibleItem>

            <br></br>
            {/* DROP DOWN OF GAMES CREATE */}
            <CollapsibleItem header='Created Games' icon="arrow_drop_down">
              <Collection>
                {/* SHOWS 4 CREATED GAMES-NEWEST CREATED LISTED FIRST */}
                <CollectionItem>
                  <Modal
                    header='Tennis'
                    trigger={<Button className="white" flat waves="teal">Tennis</Button>}>
                    <Table>
                      <thead>
                        <tr>
                          <th data-field="id">Sport</th>
                          <th data-field="name">Location</th>
                          <th data-field="price">Date</th>
                          <th data-field="price">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Tennis</td>
                          <td>Denver</td>
                          <td>January 26, 2019</td>
                          <td>2:00pm</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th data-field="id">Descripton</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>SPORTS GAME DESCRIPTION</td>
                        </tr>
                      </tbody>

                    </Table>
                  </Modal>
                </CollectionItem>
                <CollectionItem > <Modal
                  header='Football'
                  trigger={<Button className="white" flat waves="teal">Football</Button>}>
                  <Table>
                    <thead>
                      <tr>
                        <th data-field="id">Sport</th>
                        <th data-field="name">Location</th>
                        <th data-field="price">Date</th>
                        <th data-field="price">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Football</td>
                        <td>Denver</td>
                        <td>January 26, 2019</td>
                        <td>2:00pm</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th data-field="id">Descripton</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SPORTS GAME DESCRIPTION</td>
                      </tr>
                    </tbody>

                  </Table>
                </Modal>
                </CollectionItem>
                <CollectionItem > <Modal
                  header='Game'
                  trigger={<Button className="white" flat waves="teal">Game</Button>}>
                  <Table>
                    <thead>
                      <tr>
                        <th data-field="id">Sport</th>
                        <th data-field="name">Location</th>
                        <th data-field="price">Date</th>
                        <th data-field="price">Time</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>Game</td>
                        <td>Denver</td>
                        <td>January 26, 2019</td>
                        <td>2:00pm</td>
                      </tr>
                    </tbody>
                    <thead>
                      <tr>
                        <th data-field="id">Descripton</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>SPORTS GAME DESCRIPTION</td>
                      </tr>
                    </tbody>

                  </Table>
                </Modal>
                </CollectionItem>
                {/* THIS IS WHAT A PAST CREATED GAME LOOKS LIKE */}
                <CollectionItem>
                  <Modal className="red lighten-5"
                    header='Soccer'
                    trigger={<Button className="white" flat waves="red">Soccer</Button>}>
                    <Table>
                      <thead>
                        <tr>
                          <th data-field="id">Sport</th>
                          <th data-field="name">Location</th>
                          <th data-field="price">Date</th>
                          <th data-field="price">Time</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Soccer</td>
                          <td>Denver</td>
                          <td>November 10, 2018</td>
                          <td>2:00pm</td>
                        </tr>
                      </tbody>
                      <thead>
                        <tr>
                          <th data-field="id">Descripton</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>SPORTS GAME DESCRIPTION</td>
                        </tr>
                      </tbody>

                    </Table>
                  </Modal>
                </CollectionItem>
              </Collection>
            </CollapsibleItem>
          </Collapsible>

          <br></br>
          {/* NEW GAME BUTTON MODAL POPUP */}
          <SideNavItem className='center' >
            <Modal
              header='New Game'
              trigger={<Button>Create Game</Button>}>
              <Row>
                <Input
                  s={6}
                  value={this.state.title}
                  onChange={this.handleInputChange}
                  name="title"
                  placeholder="Title (required)"
                />
                <Input s={6}
                  value={this.state.author}
                  onChange={this.handleInputChange}
                  name="author"
                  placeholder="Player Name(required)"
                />
                <Input s={6}
                  value={this.state.authorEmail}
                  onChange={this.handleInputChange}
                  name="authorEmail"
                  placeholder="Player Email (required)"
                />
                <Input
                  label="Select Sport"
                  value={this.state.sport}
                  onChange={this.handleInputChange}
                  name="sport"
                  placeholder="Sport (required)"
                />
                <Row>
                  {/* <Input s={9} 
                    type='select' 
                    label="Select Sport" 
                    onChange={this.handleInputChange}>
                    <option value='1'>Sport 1</option>
                    <option value='2'>Sport 2</option>
                    <option value='3'>Sport 3</option>
                  </Input> */}
                  <Input
                    value={this.state.playerNumber}
                    onChange={this.handleInputChange}
                    name="playerNumber"
                    placeholder="Number of Players"
                    type="number"
                  />
                </Row>

                <Input
                  value={this.state.date}
                  onChange={this.handleInputChange}
                  name="date"
                  placeholder="Date (required)"
                  type='date'
                />
                <Input
                  value={this.state.time}
                  onChange={this.handleInputChange}
                  name="time"
                  placeholder="Time"
                  type='time'
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
                <Row s={4} offset='s4'>
                  <Input
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                    name="gender"
                    placeholder="Gender"
                  />
                  {/* <Input
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                    name="gender"
                    type='checkbox'
                    label='CoEd'
                    defaultValue='checked'
                  />
                  <Input
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                    name="gender"
                    type='checkbox'
                    label='Male Only'
                  />
                  <Input
                    value={this.state.gender}
                    onChange={this.handleInputChange}
                    name="gender"
                    type='checkbox' label='Female Only' />*/}
                </Row>
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
              </Row>
            </Modal>
          </SideNavItem>
        </SideNav>

      </Row>
    );
  }
}

export default Games;