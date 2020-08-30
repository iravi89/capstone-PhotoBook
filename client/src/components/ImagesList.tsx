import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getImages, deleteImage,pinImage } from '../api/images-api'
import { getAlbum } from '../api/Albums-api'
import { Card, Divider, Button, Icon, Image } from 'semantic-ui-react'
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
  albumName: string
}

export class ImagesList extends React.PureComponent<
  ImagesListProps,
  ImagesListState
> {
  state: ImagesListState = {
    images: [],
    albumName: ''
  }

  handleCreateImage = () => {
    this.props.history.push(`/images/${this.props.match.params.albumId}/create`)
  }

  onImageDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId, this.props.auth.getIdToken())
      //await updateImageCounter(this.props.match.params.albumId,this.props.auth.getIdToken(),-1)
      this.setState({
        images: this.state.images.filter(image => image.imageId != imageId)
      })
    } catch {
      alert('Image deletion failed')
    }
  }

  onImagePin = async (imageId: string) => {
    try {
      const replyInfo = await pinImage(imageId, this.props.auth.getIdToken())
      console.log('Favourite image', replyInfo)
      
      alert('Saved to My Favourite')
    } catch {
      alert('Saving image failed')
    }
  }


  async componentDidMount() {
    try {
      const album = await getAlbum(this.props.match.params.albumId, this.props.auth.getIdToken())
      const images = await getImages(this.props.match.params.albumId, this.props.auth.getIdToken())
      console.log("image recieved...")
      this.setState({
        images,
        albumName: album.name
      })
    } catch (e) {
      alert(`Failed to fetch images for album : ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>{this.state.albumName}</h1>

        <Button
          primary
          size="huge"
          className="add-button"
          onClick={this.handleCreateImage}
        >
          Upload new image
        </Button>

        <Divider clearing />

        <Card.Group itemsPerRow={3}>
          {this.state.images.map(image => {
            return       <Card fluid color="blue" key={image.imageId}>
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
              <Card.Description>{image.timestamp}</Card.Description>
              {image.imageUrl && (
                <Image src={image.imageUrl} />
              )}
            </Card.Content>
          </Card>
          })}
        </Card.Group>
      </div>
    )
  }
}
