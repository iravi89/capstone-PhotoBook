import * as React from 'react'
import { ImageModel } from '../types/ImageModel'
import { getAllImages, pinImage } from '../api/images-api'
import { Card, Divider, Button, Icon, Image } from 'semantic-ui-react'
import { History } from 'history'
import Auth from '../auth/Auth'

interface ImagesSearchProps {
  history: History
  auth: Auth
  match: {
    params: {
      albumId: string
    }
  }
}

interface ImagesSearchState {
  images: ImageModel[]
}

export class ImagesDiscover extends React.PureComponent<
ImagesSearchProps,
ImagesSearchState
> {
  state: ImagesSearchState = {
    images: [],
  }

  async componentDidMount() {
    try {
      const images = await getAllImages(this.props.auth.getIdToken())
      this.setState({
        images: images.filter(image => image.isPin != true)
      })
    } catch (e) {
      alert(`Failed to fetch images for album : ${e.message}`)
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

  render() {
    return (
      <div>
        <h1>Gallery</h1>

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