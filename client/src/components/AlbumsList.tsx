import * as React from 'react'
import { AlbumModel } from '../types/AlbumModel'
import {UpdateAlbumInfo} from '../types/UpdateAlbumInfo'
import { getAlbums, deleteAlbum ,editAlbum} from '../api/Albums-api'
import { Card, Button, Divider, Icon } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'
import { Link } from 'react-router-dom'
import * as moment1 from 'moment'

interface AlbumsListProps {
  history: History
  auth: Auth
}

interface AlbumsListState {
  albums: AlbumModel[]
}

export class AlbumsList extends React.PureComponent<AlbumsListProps, AlbumsListState> {
  state: AlbumsListState = {
    albums: []
  }

  createAlbumHandler = () => {
    this.props.history.push(`/albums/create`)
  }

  onAlbumDelete = async (albumId: string) => {
    try {
      await deleteAlbum(albumId, this.props.auth.getIdToken())
      this.setState({
        albums: this.state.albums.filter(album => album.id != albumId)
      })
    } catch {
      alert('Image deletion failed')
    }
  }

  onAlbumEdit = async (albumId: string) => {
    this.props.history.push(`/albums/edit/${albumId}`)
  }


  async componentDidMount() {
    try {
      const albums = await getAlbums(this.props.auth.getIdToken())
      this.setState({
        albums
      })
    } catch (e) {
      alert(`Failed to fetch albums: ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>My Albums</h1>

        <Button
          primary
          size="huge"
          color="red"
          className="add-button"
          onClick={this.createAlbumHandler}
        >
          Create Album
        </Button>

        <Divider clearing />

        <Card.Group>
          {this.state.albums.map(album => {
            return       <Card key={album.id}>
            <Card.Content>
              <Card.Header>
                <Link to={`/images/${album.id}`}>{album.name}</Link>
                <Button
                      icon
                      color="red"
                      size="mini"
                      onClick={() => this.onAlbumDelete(album.id)}
                      floated="right"
                    >
                      <Icon name="delete" />
                </Button>
                <Button
                      icon
                      color="green"
                      size="mini"
                      onClick={() => this.onAlbumEdit(album.id)}
                      floated="right"
                    >
                      <Icon name="edit" />
                </Button>
              </Card.Header>
              <Card.Description>Description:  {album.description}</Card.Description>
              <Card.Description>Location:  {album.location}</Card.Description>
              <Card.Description>Date:  { album.timestamp}</Card.Description>
              <Card.Description>Images:  {album.imageCount}</Card.Description>
            </Card.Content>
            </Card>
          })}
        </Card.Group>
      </div>
    )
  }
}
