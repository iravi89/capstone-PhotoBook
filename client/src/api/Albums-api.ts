import { AlbumModel } from '../types/AlbumModel'
import { apiEndpoint } from '../config'
import { AlbumUploadInfo } from '../types/AlbumUploadInfo'
import Axios from 'axios'
export async function getAlbums(idToken: string): Promise<AlbumModel[]> {
  console.log('Fetching albums')

  const response = await fetch(`${apiEndpoint}/albums`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()

  return result.items
}

export async function getAlbum(albumId: string, idToken: string): Promise<AlbumModel> {
  console.log('Fetching Album')

  const response = await fetch(`${apiEndpoint}/albums/${albumId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()
  console.log(JSON.stringify(result))

  return result.album
}

export async function createAlbum(
  idToken: string,
  newAlbum: AlbumUploadInfo,
  
): Promise<AlbumModel> {
   
  const reply = await fetch(`${apiEndpoint}/albums`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
    body:JSON.stringify({//test
      name: newAlbum.name,
      location:newAlbum.location,
      description: newAlbum.details
      //newAlbum.location
    })
  })
  const result = await reply.json()
  return result.newItem
}

export async function deleteAlbum(albumId: string, idToken: string): Promise<void> {
  console.log('Deleting album')

  await fetch(`${apiEndpoint}/albums/${albumId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
}

export async function editAlbum(albumId: string, idToken: string): Promise<void> {
  console.log('Deleting album')

  // await fetch(`${apiEndpoint}/albums/${albumId}`, {
  //   method: 'PUT',
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   },
  // })
}