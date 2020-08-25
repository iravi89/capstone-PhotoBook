import { apiEndpoint } from '../config'
import { ImageModel } from '../types/ImageModel'
import { ImageUploadInfo } from '../types/ImageUploadInfo'
import { ImageUploadResponse } from '../types/ImageUploadResponse'

export async function getImages(albumId: string, idToken: string): Promise<ImageModel[]> {
  console.log('Fetching images')

  const response = await fetch(`${apiEndpoint}/albums/${albumId}/images`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()

  return result.items
}

export async function getAllImages(idToken: string): Promise<ImageModel[]> {
  console.log('Fetching all images')

  const response = await fetch(`${apiEndpoint}/images`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()

  return result.items
}

export async function createImage(
  idToken: string,
  newImage: ImageUploadInfo
): Promise<ImageUploadResponse> {

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

  return await reply.json()
}

export async function uploadFile(uploadUrl: string, file: Buffer): Promise<void> {
  await fetch(uploadUrl, {
    method: 'PUT',
    body: file
  })
}

export async function deleteImage(imageId: string, idToken: string): Promise<void> {
  console.log('Deleting image')

  await fetch(`${apiEndpoint}/images/${imageId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
}

export async function pinImage(imageId: string, idToken: string): Promise<ImageUploadResponse> {
  console.log('Pinning image')

  const reply = await fetch(`${apiEndpoint}/images/${imageId}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })

  return await reply.json()
}

export async function getPins(idToken: string): Promise<ImageModel[]> {
  console.log('Fetching pins')

  const response = await fetch(`${apiEndpoint}/pins`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${idToken}`
    },
  })
  const result = await response.json()

  return result.items
}
