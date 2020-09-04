import React, { Component } from 'react'
import { AlbumsList } from './components/AlbumsList'
import { Router, Link, Route, Switch } from 'react-router-dom'
import { Grid, Menu, Segment, Input, Button,Dropdown,Divider } from 'semantic-ui-react'
import { ImagesList } from './components/ImagesList'
import { NotFound } from './components/NoImage'
import { CreateImage } from './components/UploadImage'
import { CreateAlbum } from './components/createAlbum'
import Auth from './auth/Auth'
import { ImagesPins } from './components/ImagesPins'
import { EditTodo } from './components/EditAlbum'

const logo = require('./logo.svg');

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {
}

const mystyle1 = {
  boxShadow:"3px 3px 5px 6px #ccc",
  backgroundColor:'transparent',
  color:'white',
  border:'2px',
  bordercolor:"green",
  width:"600px",
  align:"center"
};

const mystyle2 = {
  boxShadow:"3px 3px 5px 6px #ccc",
  backgroundColor:'transparent',
  color:'white',
  border:'10px',
  bordercolor:"green",
  width:"350px",
  align:"center",
  padding: "2%"
};
const mystyle5 = {
  boxShadow:"3px 3px 5px 6px #ccc",
  backgroundColor:'transparent',
  color:'grey',
  border:'10px',
  bordercolor:"green",
  width:"80%",
  align:"center",
  padding: "2%"
};


export default class App extends Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)

    this.handleLogin = this.handleLogin.bind(this)
    this.handleLogout = this.handleLogout.bind(this)
  }

  handleLogin() {
    this.props.auth.login()
  }

  handleLogout() {
    this.props.auth.logout()
  }

  render() {
    return (
      <div>
        <Segment style={{ padding: '8em 0em' }} vertical>
          <Grid container stackable verticalAlign="middle">
            <Grid.Row>
              <Grid.Column width={16}>
                <Router history={this.props.history}>
                  {this.generateMenu()}
                  
                  {this.generateCurrentPage()}
                </Router>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Segment>
      </div>
      
    )
  }

  generateMenu() {
    const mystyle = {
      backgroundColor: "#ccddf0",
      boxShadow: "3px 3px 5px 6px #ccc"
    };
    const mystyle4 = {
      backgroundColor: "transparent",
      boxShadow: "1px 1px 2px 2px #ccc",
      height:"10px"
    };
    const mystyle3 = {
      backgroundColor: "transparent",
      padding: "10px"
    };
    return (

      <Menu>
        <Menu.Item
          name='My menu'
          style={mystyle}
        >
          <Dropdown text='Menu' style={mystyle4}>
            <Dropdown.Menu>
              <Dropdown.Item text='New' >
                <Link to="/" style={mystyle3}>My Album</Link>
              </Dropdown.Item>
              <Dropdown.Item text='Open...' description='ctrl + o' >
                <Link to="/favs" style={mystyle3}>Favorite</Link>
              </Dropdown.Item>
              

            </Dropdown.Menu>
          </Dropdown>
        </Menu.Item>
        <Menu.Menu  style={mystyle} position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>


    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        // <Menu.Item name="logout" onClick={this.handleLogout}>
        //   Log Out
        // </Menu.Item>
        <Button floated="left"  color="teal" name="logout" onClick={this.handleLogout}>
            Log Out
        </Button>
      )
    } else {
      return (
        // <Menu.Item name="login" onClick={this.handleLogin}>
        //   Log In
        // </Menu.Item>
        <Button floated="left"  color="twitter" name="login" onClick={this.handleLogin}>
        Log In
    </Button>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <div ><h1 style={mystyle1}>Welcome to Your Own Personal Cloud Album!</h1>
      <Divider/>
      <h3 style={mystyle2}>
      What is the best way to store your memories? In a custom-made photobook! You can surround yourself with digital devices but it's a lot different to actually hold a memory in your hands. You can transform your memories into gorgeous keepsakes! 
        </h3>
        <p></p>
        <p></p>
        <p style={mystyle5}>
Make your own photo Album!

With this App, you can easily create an album of your most memorable movents which you have spent with your loved ones. Our online tools make it easy for you to create and carry your own personal album anywhere anytime. All you need is our MyPhotoBook online and a few minutes of your time.
        </p>
      </div>
    }
    return (
      <Switch>
        <Route
          path="/albums/create"
          exact
          render={props => {
            return <CreateAlbum {...props} auth={this.props.auth} />
          }}
        />

        <Route
          path="/albums/edit/:albumId"
          exact
          render={props => {
            return <EditTodo {...props} auth={this.props.auth} />
          }}
        />

        <Route path="/images/:albumId" 
          exact 
          render={props => {
            return <ImagesList {...props} auth={this.props.auth} />
          }} 
        />


        <Route path="/favs" 
          exact 
          render={props => {
            return <ImagesPins {...props} auth={this.props.auth} />
          }} 
        />

        <Route
          path="/images/:albumId/create"
          exact
          render={props => {
            return <CreateImage {...props} auth={this.props.auth} />
          }}
        />

        <Route path="/" exact           
          render={props => {
            return <AlbumsList {...props} auth={this.props.auth} />
          }} />

        <Route component={NotFound} />
      </Switch>
    )
  }
}
