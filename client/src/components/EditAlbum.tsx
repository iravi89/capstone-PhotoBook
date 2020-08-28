import * as React from 'react'
import { Form, Button, Input, Label, Grid, Loader, GridRow, GridColumn, Divider, Message } from 'semantic-ui-react'
import Auth from '../auth/Auth'
import {editAlbum,getAlbum} from '../api/Albums-api'
import {UpdateAlbumInfo} from '../types/UpdateAlbumInfo'
import { Redirect } from 'react-router-dom'
import { Album } from './Album'

  
  interface EditAlbumProps {
    match: {
      params: {
        albumId: string
      }
    }
    auth: Auth
  }
  
  interface EditAlbumState {
    //album:UpdateAlbumInfo
    album_name:string
    location:string
    des:string
    albumId:string
    loading: boolean
    redirect:boolean
  }

  export class EditTodo extends React.PureComponent<
  EditAlbumProps,
  EditAlbumState>
    {
        state: EditAlbumState = {
          album_name:'',
          location:'',
          des:'',
          albumId:'',
          loading:false,
          redirect:false
        }
      
        async componentDidMount()
        {
            
            //const fetchedTeam = await getAlbum(this.props.match.params.albumId,this.props.auth.getIdToken())

            try {
                //const t_album =  EditAlbumState()
                const albums = await getAlbum(this.props.match.params.albumId,this.props.auth.getIdToken())
                this.setState({
                    album_name : albums.name,
                    location:albums.location,
                    des : albums.description

                })
              } catch (e) {
                alert(`Failed to fetch albums: ${e.message}`)
              }
            // const team: UpdateAlbumInfo = {
            //     name: fetchedTeam.name,
            //     location: fetchedTeam.location,
            //     details: fetchedTeam.description
            
            // }


            //this.setState({album_name:fetchedTeam.name,location:fetchedTeam.location,des:fetchedTeam.description,albumId:this.props.match.params.albumId,loading:false,redirect:true})
        }
    
        handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({album_name:event.target.value})
          }
        
          handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ des: event.target.value })
          }
        
          handleLocationChange = (event: React.ChangeEvent<HTMLInputElement>) => {
            this.setState({ location: event.target.value })
          }


    handleSubmit = async (event: React.SyntheticEvent) => {
        event.preventDefault()
   try {
        if (!this.state.album_name) {
          alert('Name should not be empty')
          return
        }
        if (!this.state.des) {
          alert('Description should not be empty')
          return
        }
        this.setLoadingState(true)
        const album = await editAlbum(this.props.match.params.albumId,this.props.auth.getIdToken(), {
          name: this.state.album_name,
          details: this.state.des,
          location: this.state.location
        })

    }catch (e) {
        alert('Could not upload an image: ' + e.message)
      } finally {
        this.setLoadingState(false)
      }
    }
    setLoadingState(updatingAlbum: boolean) {
        this.setState({
            loading:true
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
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Field>
                            <Label>Name</Label>
                            <Input
                                type='text'
                                name='name'
                                placeholder='Add a team name'
                                value={this.state.album_name}
                                onChange={this.handleNameChange}
                            />
                        </Form.Field>
    
                        <Form.Field>
                            <Label>Location</Label>
                            <Input
                                type='text'
                                name='Location'
                                placeholder='Add a sport (baseball, hockey, volleyball, football, ...)'
                                value={this.state.location}
                                onChange={this.handleLocationChange}
                            />
                        </Form.Field>
    
                        <Form.Field>
                            <Label>Description</Label>
                            <Input
                                type='text'
                                name='Description'
                                placeholder='Add a season (1999, 2003-2004)'
                                value={this.state.des}
                                onChange={this.handleDescriptionChange}
                            />
                        </Form.Field>
                        
                        <Grid>
                            <GridRow>
                                <GridColumn width='2'>
                                    <Button color='green' type='submit'>Save</Button>
                                </GridColumn>
                                <GridColumn width='11'>
    
                                </GridColumn>

                            </GridRow>
                        </Grid>
    
                    </Form>
                </div>
            )
        }
    }
  
