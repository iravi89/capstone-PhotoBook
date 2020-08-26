import * as React from 'react'
import { Form, Button } from 'semantic-ui-react'
import { createAlbum } from '../api/Albums-api'
import { Redirect } from 'react-router-dom'
import Auth from '../auth/Auth'

interface CreateAlbumProps {
  auth: Auth
}

interface CreateAlbumState {
  name: string
  description: string
  uploadingAlbum: boolean
  redirect: boolean
  location:string
}

export class CreateAlbum extends React.PureComponent<
CreateAlbumProps,
  CreateAlbumState
> {
  state: CreateAlbumState = {
    name: '',
    description: '',
    uploadingAlbum: false,
    redirect: false,
    location:''
  }

  handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value })
  }

  handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ description: event.target.value })
  }

  handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ location: event.target.value })
  }

  handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      if (!this.state.name) {
        alert('Name should not be empty')
        return
      }
      if (!this.state.description) {
        alert('Description should not be empty')
        return
      }
      this.setUploadState(true)
      const album = await createAlbum(this.props.auth.getIdToken(), {
        name: this.state.name,
        details: this.state.description,
        location: this.state.location
      })

      console.log('Created description', this.state.location)

      alert('Album created!')
      this.setRedirect(true)
    } catch (e) {
      alert('Could not upload an image: ' + e.message)
    } finally {
      this.setUploadState(false)
    }
  }

  setUploadState(uploadingAlbum: boolean) {
    this.setState({
      uploadingAlbum
    })
  }

  setRedirect(redirect: boolean) {
    this.setState({
      redirect: true
    })
  }

  renderRedirect = () => {
    if (this.state.redirect) {
      return <Redirect to='/' />
    }
  }

  render() {
    return (
      <div>
        {this.renderRedirect()}
        <h1>Create New Album</h1>

        <Form onSubmit={this.handleSubmit}>
          <Form.Field>
            <label>Name</label>
            <input
              placeholder="Album name"
              value={this.state.name}
              onChange={this.handleNameChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Location</label>
            <input
              placeholder="Album location"
              value={this.state.location}
              onChange={this.handleLocationChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Details</label>
            <input
              placeholder="Album description"
              value={this.state.description}
              onChange={this.handleDescriptionChange}
            />
          </Form.Field>
          {this.renderButton()}
        </Form>
      </div>
    )
  }

  renderButton() {
    return (
      <Button loading={this.state.uploadingAlbum} type="submit">
        Create
      </Button>
    )
  }
}
