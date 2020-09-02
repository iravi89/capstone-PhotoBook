import { AlbumModel } from '../types/AlbumModel'
import { apiEndpoint } from '../config'
import { AlbumUploadInfo } from '../types/AlbumUploadInfo'
import {UpdateAlbum} from '../types/UpdateAlbum'
import Axios from 'axios'
import { UpdateAlbumInfo } from '../types/UpdateAlbumInfo'
import { pathToFileURL } from 'url'



export async function getAlbums(idToken: string): Promise<AlbumModel[]> {
  console.log('Fetching albums')


  const response = await Axios.get(`${apiEndpoint}/albums`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  
  return response.data.items
}

export async function getAlbum(albumId: string, idToken: string): Promise<AlbumModel> {
  console.log('Fetching Album')



  const response = await Axios.get(`${apiEndpoint}/albums/${albumId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  

  return response.data.album
}

export async function createAlbum(
  idToken: string,
  newAlbum: AlbumUploadInfo,
  
): Promise<AlbumModel> {
   
  const reply = await Axios.post(`${apiEndpoint}/albums`,  JSON.stringify({name:newAlbum.name,location:newAlbum.location,description:newAlbum.details}), {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })

  return reply.data.item   
}

export async function deleteAlbum(albumId: string, idToken: string): Promise<void> 
{
  await Axios.delete(`${apiEndpoint}/albums/${albumId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    }
  })
}


export async function editAlbum(albumId: string, idToken: string,patch:UpdateAlbumInfo): 

  Promise<void> {
    console.log('album id:',albumId)
    console.log(' Token:',idToken)
    await Axios.patch(`${apiEndpoint}/albums/${albumId}`, JSON.stringify(patch), {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })

}

export async function updateImageCounter(albumId: string, idToken: string,count:number): 

  Promise<void> {

    console.log('album id:',albumId)
    console.log(' Token:',idToken)
    const reply = await Axios.post(`${apiEndpoint}/albums/${albumId}/counter`, count, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })

    console.log('reply:',reply);
  }

export async function saveAlbum(albumId: string, idToken: string,patch:UpdateAlbumInfo): 

  Promise<void> {

    console.log('save album id:',albumId)
    console.log('save Token:',idToken)
    const reply = await Axios.post(`${apiEndpoint}/albums/${albumId}/save`, {name:patch.name,description:patch.details,location:patch.location}, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      }
    })

    return reply.data.items
    
}