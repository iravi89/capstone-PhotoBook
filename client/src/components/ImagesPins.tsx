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
      <div style={mystyle4}>
        <h1 style={mystyle2}>Favourite Images:</h1>

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
