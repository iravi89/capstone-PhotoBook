import { apiEndpoint } from '../config'
import { ImageModel } from '../types/ImageModel'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'
import Axios from 'axios'
import { REPL_MODE_SLOPPY } from 'repl'
import { realpath } from 'fs'
export async function getImages(albumId: string, idToken: string): Promise<ImageModel[]> {
  console.log('Fetching images')

  const reply = await Axios.get(`${apiEndpoint}/albums/${albumId}/images`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },})

  
  return reply.data.items

}


export async function createImage(
  idToken: string,
  newImage: ImageUploadInfo
): Promise<ImageUploadResponse> {

  // console.log('going to start')
  // const reply1 = await Axios.post(`${apiEndpoint}/albums/${newImage.albumId}/images`,JSON.stringify({newImage}), {
  //   headers: {
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${idToken}`
  //   }})

  //   console.log('passed till')


  const reply = await fetch(
    `${apiEndpoint}/albums/${newImage.albumId}/images`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${idToken}`
      },
      body: JSON.stringify({
        title: newImage.title
      })
    }
  )

  console.log('Reply'+reply)
 return await reply.json()
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
 
  await Axios.put(uploadUrl, file)
}

export async function deleteImage(imageId: string, idToken: string): Promise<void> {
  console.log('Deleting image')


  await Axios.delete(`${apiEndpoint}/images/${imageId}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },})


}

export async function pinImage(imageId: string, idToken: string): Promise<string> {
  console.log('Pinning image')


  const reply1 = await Axios.post(`${apiEndpoint}/images/${imageId}`,'', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },})

    console.log('Pinning image passed')
  
  return reply1.data.item
}

export async function getPins(idToken: string): Promise<ImageModel[]> {
  console.log('Fetching pins')


  const reply = await Axios.get(`${apiEndpoint}/favs`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },})

   return reply.data.items
}
