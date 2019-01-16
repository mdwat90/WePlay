import React, { Component } from "react";
import "../../components/SideNav/SideNav.css"
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { List, ListItem } from "../../components/List";
import { TextArea, FormBtn } from "../../components/Form";
import { Row, Col, Navbar, NavItem, SideNav, SideNavItem, Modal, Collapsible, CollapsibleItem, Collection, CollectionItem, Badge, Input, Button, Table, Chip } from 'react-materialize';
import Geocode from "react-geocode";
import SimpleMap from "../../components/GoogleMaps/google-maps"

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
    gender: "",
    city: "",
    state: "",
    description: "",
    emailToWho: "",
    userImage: this.props.userImage,
    userID: this.props.userID,
    emailMessageContent: ""
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

  // Deletes a book from the database with a given id, then reloads books from the db
  updateGame = (id, userData) => {
    console.log("Player added to game")
    // this.setState({
    //   isButtonDisabled: true
    // });
    console.log(id)
    console.log(userData)
    API.updateGame(id, userData)
      .then(res => this.loadGames())
      .catch(err => console.log(err.response));
  };

  // Handles updating component state when the user types into the input field
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  // Handles updating component state when the user types into the input field
  handleButtonClick = e => {
    console.log(e)
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
        date: this.state.date,
        time: this.state.time,
        gender: this.state.gender,
        city: this.state.city,
        state: this.state.state,
        description: this.state.description,
        authorEmail: this.state.authorEmail,
        authorId: this.state.userID,
        authorPhoto: this.state.userImage,
      })
        .then(res => this.loadGames())
        .catch(err => console.log(err));
    }
  };

  sendMail = () => {
    console.log("sendMail hit on games.js")
    API.sendMail({
      emailToWho: this.state.emailToWho,
      emailMessageContent: this.state.emailMessageContent
    })
  }

  geocode = (city, state) => {
    Geocode.setApiKey("AIzaSyBFxBvSfL6-CmTt4k6mtU03hLHt9OJgHuI");
    Geocode.fromAddress(`${city}, ${state}`).then(
      response => {
        const { lat, lng } = response.results[0].geometry.location;
        console.log(lat, lng);
      },
      error => {
        console.error(error);
      }
    );
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

                    <div className="center">
                      <h5><strong>
                        {game.title} by {game.author}
                      </strong>
                      </h5>
                    </div>

                    <div className="center description">
                      <h6>Description:</h6>
                      <p id='gameDescription'>{game.description}</p>
                    </div>

                    <Table className='center gameInfo'>
                      <thead>
                        <tr>
                          <th data-field="id" className='center'>Sport</th>
                          <th data-field="name" className='center'>Date</th>
                          <th data-field="name" className='center'>Time</th>
                          <th data-field="price" className='center'>Male | Female | Co-Ed</th>
                        </tr>
                      </thead>

                      <tbody>
                        <tr>
                          <td className='center'>{game.sport}</td>
                          <td className='center'>{game.date}</td>
                          <td className='center'>{game.time} </td>
                          <td className='center'>{game.gender}</td>
                          <td className='center'>{game.description}</td>
                        </tr>
                      </tbody>
                    </Table>

                    <Row className='center icons'>
                      <Col s={3}>
                        <Modal
                          header='Attendees'
                          trigger={<i className="material-icons">people</i>}>
                          <Row>
                            <Col s={12}>
                              {/* Create loop to retrieve all user photos and id's for game */}
                              <Chip>
                                <img src={game.authorPhoto} alt='UserImage' />
                                {game.author}
                              </Chip>
                            </Col>
                          </Row>
                        </Modal>
                        <p>{game.playerNumber} spots left!</p>
                      </Col>
                      <Col s={3}>
                        <Modal
                          header='Location'
                          trigger={<i className="material-icons">location_on</i>}>
                          <div className='container'>
                            <Row>
                              {/* <Button onClick={() => this.geocode(game.city, game.state)}>Send</Button> */}
                              <SimpleMap lat={39.9205411} lng={-105.0866504}></SimpleMap>
                            </Row>
                          </div>
                        </Modal>
                        <p>Location</p>
                      </Col>
                      <Col s={3}>
                        <Modal
                          header='Contact Event Author'
                          trigger={<i className="material-icons">email</i>}>
                          <Row>
                            <Row>
                              <Input
                                s={6}
                                label="From"
                                value={this.state.userID}
                                onChange={this.handleInputChange}
                                name="title"
                                placeholder="From"
                              />
                              <Input
                                s={6}
                                label="Message To"
                                value={this.state.emailToWho}
                                onChange={this.handleInputChange}
                                name="emailToWho"
                                placeholder={game.authorEmail}
                                type="email"
                              />

                            </Row>
                            <Row>
                              <Input 
                              s={12} 
                              label= "Message"
                              value={this.state.emailMessageContent}
                              onChange={this.handleInputChange}
                              name="emailMessageContent"
                              placeholder="So excited for the volleyball game. Where is the exact location?" 
                              type='textarea' 
                              />
                            </Row>
                            <Row className='center'>
                              <Button className="modal-close" onClick={this.sendMail}>Send</Button>

                            </Row>
                          </Row>
                        </Modal>
                        <p>Contact</p>
                      </Col>
                      <Col s={3}>
                        <Modal
                          header='Share'
                          trigger={<i className="material-icons">share</i>}>
                          <Row>
                            <Row>
                              <Input placeholder="Email" s={6} label="Your Email" />
                              <Input placeholder="Recipient" s={6} label="Recipient Email" />
                            </Row>
                            <Row>
                              <Input placeholder="Input message here" s={12} type='textarea' />
                            </Row>
                            <Row className='center'>
                              <Button>Share</Button>
                            </Row>
                          </Row>
                        </Modal>
                        <p>Share</p>
                      </Col>
                    </Row>

                    <Row className='center joinBtn'>
                      <Button waves='light' id={game._id}
                        onClick={() => this.updateGame(game._id, [this.props.userID, this.props.userImage])}
                      // disabled={this.id}
                      >
                        Join!
                        </Button>
                      {/* <DeleteBtn onClick={() => this.deleteGame(game._id)} /> */}
                    </Row>
                  </ListItem>
                );
              })}
            </List>
          ) : (
              <h5 className="center">No Results to Display</h5>
            )}
        </Col>

        <Col s={8}>
          <SideNav
          // trigger={<Button></Button>}
          // options={{ closeOnClick: true }}
          >
            {/* USER SIDENAV SECTION */}
            <SideNavItem userView s={12}
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
              <Button onClick={this.props.auth.logout}>Logout</Button>
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
                    name="description"
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
        </Col>
      </Row>
    );
  }
}

export default Games;