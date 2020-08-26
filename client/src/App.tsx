import React, { Component } from 'react'
import { AlbumsList } from './components/AlbumsList'
import { Router, Link, Route, Switch } from 'react-router-dom'
import { Grid, Menu, Segment, Input } from 'semantic-ui-react'
import { ImagesList } from './components/ImagesList'
import { NotFound } from './components/NoImage'
import { CreateImage } from './components/UploadImage'
import { CreateAlbum } from './components/createAlbum'
import Auth from './auth/Auth'
import { ImagesDiscover } from './components/ImagesSearch'
import { ImagesPins } from './components/ImagesPins'

export interface AppProps {
  auth: Auth
  history: any
}

export interface AppState {
}

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
    return (
      <Menu>
        <Menu.Item name="home" >
          <Link to="/">My Album</Link>
        </Menu.Item>
        <Menu.Item name="Favorite">
          <Link to="/pins">Favorite</Link>
        </Menu.Item>
        {/* <Menu.Item name="gallery">
          <Link to="/images">Search</Link>
        </Menu.Item> */}
        <Menu.Menu position="right">{this.logInLogOutButton()}</Menu.Menu>
      </Menu>

    )
  }

  logInLogOutButton() {
    if (this.props.auth.isAuthenticated()) {
      return (
        <Menu.Item name="logout" onClick={this.handleLogout}>
          Log Out
        </Menu.Item>
      )
    } else {
      return (
        <Menu.Item name="login" onClick={this.handleLogin}>
          Log In
        </Menu.Item>
      )
    }
  }

  generateCurrentPage() {
    if (!this.props.auth.isAuthenticated()) {
      return <div><h1>Welcome to Your Own Personal Cloud Album!</h1>
      <h2>Please login to create Album</h2>
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

        <Route path="/images/:albumId" 
          exact 
          render={props => {
            return <ImagesList {...props} auth={this.props.auth} />
          }} 
        />

        <Route path="/images" 
          exact 
          render={props => {
            return <ImagesDiscover {...props} auth={this.props.auth} />
          }}
        />

        <Route path="/pins" 
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
