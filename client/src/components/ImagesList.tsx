import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getImages, deleteImage,pinImage } from '../api/images-api'
import { getAlbum } from '../api/Albums-api'
import { Card, Divider, Button, Icon, Image,} from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'
import { updateImageCounter } from '../api/Albums-api'

interface ImagesListProps {
  history: History
  auth: Auth
  match: {
    params: {
      albumId: string
    }
  }
}

interface ImagesListState {
  images: ImageModel[]
  imageIsPin:boolean
  albumName: string
  albumLoc:string
}

export class ImagesList extends React.PureComponent<
  ImagesListProps,
  ImagesListState
> {
  state: ImagesListState = {
    images: [],
    imageIsPin:false,
    albumName: '',
    albumLoc:''
  }

  handleCreateImage = () => {
    this.props.history.push(`/images/${this.props.match.params.albumId}/create`)
  }

  onImageDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId, this.props.auth.getIdToken())
      await updateImageCounter(this.props.match.params.albumId,this.props.auth.getIdToken(),-1)
      this.setState({
        images: this.state.images.filter(image => image.imageId != imageId)
      })
      alert('Image Deleted')
    } catch {
      alert('Image deletion failed')
    }
  }

  onImagePin = async (imageId: string) => {
    try {
      await pinImage(imageId, this.props.auth.getIdToken())
      //console.log('Favourite image', replyInfo)
      
      alert('Saved to My Favourite')
    } catch {
      alert('Saving image failed')
    }
  }

  async generateColor()
  {
  const randomColor = "#" +  Math.floor(Math.random()*16777215).toString(16)
  console.log("Color:"+randomColor)
  return randomColor
  }
  async componentDidMount() {
    try {
      const album = await getAlbum(this.props.match.params.albumId, this.props.auth.getIdToken())
      console.log('Album retrived')
      const images = await getImages(this.props.match.params.albumId, this.props.auth.getIdToken())
      console.log('Images retrived')
      this.setState({
        images,
        albumName: album.name,
        albumLoc :album.location

      })
    } catch (e) {
      alert(`Failed to fetch images for album : ${e.message}`)
    }
  }

  render() {
    const mystyle1 = {
      boxShadow:"3px 3albumspx 5px 6px #fff",
      backgroundColor:this.generateColor,
      width:"400px",

      
    };

    const mystyle2 =
    { 
      background:"#1c87c9",
      padding: "20px",
      color:"#ffffff",
      blur:"5px"
    };
    return (
      <div>
        <h1>{this.state.albumName}</h1>
        <h3>Location:   {this.state.albumLoc}</h3>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateImage}
          circular={true}
          label="Add"
          color="google plus"

        >
          
        </Button>

        <Divider clearing />

        <Card.Group itemsPerRow={3}>
          {this.state.images.map(image => {
            return       <Card style={mystyle1}  fluid color="blue" key={image.imageId}>
            <Card.Content>
              <Card.Header>{image.title}
                <Button
                      icon
                      color="red"
                      size="small"
                      onClick={() => this.onImageDelete(image.imageId)}
                      floated="right"
                    >
                      <Icon name="delete" />
                </Button>
                <Button
                      icon
                      color="red"
                      size="small"
                      onClick={() => this.onImagePin(image.imageId)}
                      floated="right"
                    >
                      <Icon name="pin" />
                </Button>
              </Card.Header>
              
              {image.imageUrl && (
                <Image src={image.imageUrl} />
              )}
              <Card.Description>Created on: {image.timestamp}</Card.Description>
            </Card.Content>
          </Card>
          })}
        </Card.Group>
      </div>
    )
  }
}
