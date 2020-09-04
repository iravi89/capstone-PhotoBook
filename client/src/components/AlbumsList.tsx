import * as React from 'react'
import { AlbumModel } from '../types/AlbumModel'
import {UpdateAlbumInfo} from '../types/UpdateAlbumInfo'
import { getAlbums, deleteAlbum ,editAlbum} from '../api/Albums-api'
import { Card, Button, Divider, Icon,Label } from 'semantic-ui-react'
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
      alert('Album Deleted')
    } catch {
      alert('Album deletion failed')
    }
  }

  onAlbumEdit = async (albumId: string) => {
    this.props.history.push(`/albums/edit/${albumId}`)
  }


 async componentDidMount()  {
    try {
      const albums = await getAlbums(this.props.auth.getIdToken())
      this.setState({
        albums
      })

      //console.log('Hello:'+ albums[0].imgCnt)
    } catch (e) {
      alert(`Failed to fetch albums: ${e.message}`)
    }
  }

  render() {
    const mystyle1 = {
      boxShadow:"3px 3px 5px 6px #ccc",
      backgroundColor:'#dee7ff',
      width:"500px",
      font: "120px"
      
    };
    const mystyle3 = {
      boxShadow:"3px 3px 5px 6px #ccc",
      backgroundColor:'#3399ff',
      width:"50px",
      height:"50px",
      text:"dfd"
    };
    const mystyle2 = {
      boxShadow:"5px 5px 10px grey",
      backgroundColor:'transparent',
      color:'grey',
      border:'20px',
      bordercolor:"green",
      padding:"10px"
    };

    const mystyle4 =
    { 
      background:"transparent",
      padding: "5%",
      color:"#ffffff",
      boxShadow:"10px 10px 10px 10px #ccc",
    };

    return (
      <div style={mystyle4} >
        <h1 style={mystyle2}  >My Albums</h1>

        <Button
          //style={mystyle3}
          
          //primary
          size="medium"
          color="orange"
          //className="add-button" 
          circular={true}
          onClick={this.createAlbumHandler}
          label="New"
          
        >
          
        </Button>


        <Divider clearing />

        <Card.Group>
          {this.state.albums.map(album => {

            return       <Card style={mystyle1} key={album.id}>
            <Card.Content>
              <Card.Header>
                <Link to={`/images/${album.id}`}>
                <Label color="orange" attached="top left"   size="medium" >{album.name}</Label>
                  </Link>
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
              
              <Card.Description textAlign="left" >Description:  {album.description}</Card.Description>
              <Card.Description>Location:  {album.location}</Card.Description>
              <Card.Description>Date:  { album.timestamp}</Card.Description>
              <Card.Description>Images:  {album.imgCnt}</Card.Description>
            </Card.Content>
            </Card>
          })}
        </Card.Group>
      </div>
    )
  }
}
