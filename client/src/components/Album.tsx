import * as React from 'react'
import { Card, Button, Icon } from 'semantic-ui-react'
import { AlbumModel } from '../types/AlbumModel'
import { Link } from 'react-router-dom'

interface AlbumCardProps {
  album: AlbumModel
}

interface AlbumCardState {
}

export class Album extends React.PureComponent<AlbumCardProps, AlbumCardState> {

  render() {
    return (
      <Card>
        <Card.Content>
          <Card.Header>
            <Link to={`/images/${this.props.album.id}`}>{this.props.album.name}</Link>
            
            <Button
                  icon
                  color="green"
                  size="mini"
                  floated="right"
                >
                  <Icon name="delete" />
            </Button>


          </Card.Header>
          <Card.Description>Description:  {this.props.album.description}</Card.Description>
          <Card.Description>Location:  {this.props.album.location}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}
