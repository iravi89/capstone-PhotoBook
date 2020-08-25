import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getPins, deleteImage } from '../api/images-api'
import { Card, Divider, Button, Icon, Image } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'

interface FavouriteImagesProps {
  history: History
  auth: Auth
}

interface FavouriteImagesState {
  images: ImageModel[]
}

export class ImagesPins extends React.PureComponent<
FavouriteImagesProps,
FavouriteImagesState
> {
  state: FavouriteImagesState = {
    images: []
  }

  onPinDelete = async (imageId: string) => {
    try {
      await deleteImage(imageId, this.props.auth.getIdToken())
      this.setState({
        images: this.state.images.filter(image => image.imageId != imageId)
      })
    } catch {
      alert('Image deletion failed')
    }
  }

  async componentDidMount() {
    try {
      const images = await getPins(this.props.auth.getIdToken())
      this.setState({
        images
      })
    } catch (e) {
      alert(`Failed to fetch Image List : ${e.message}`)
    }
  }

  render() {
    return (
      <div>
        <h1>Favourite Images:</h1>

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
                      onClick={() => this.onPinDelete(image.imageId)}
                      floated="right"
                    >
                      Remove
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
