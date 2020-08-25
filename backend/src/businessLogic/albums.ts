import * as uuid from 'uuid'

import { Album } from '../models/Album'
import { Image } from '../models/Image'
import { AlbumAccess } from '../dataLayer/albumsAccess'
import { CreateAlbumRequest } from '../requests/CreateAlbumRequest'
import { getUserId } from '../auth/utils'
import { getImages, deleteImage } from './images'

const albumAccess = new AlbumAccess()

export async function getAlbums(jwtToken: string): Promise<Album[]> {
  const userId = getUserId(jwtToken)
  return albumAccess.getAlbums(userId)
}

export async function createAlbum(
  createAlbumRequest: CreateAlbumRequest,
  jwtToken: string
): Promise<Album> {

  const itemId = uuid.v4()
  const userId = getUserId(jwtToken)

  return await albumAccess.createAlbum({
    id: itemId,
    userId: userId,
    name: createAlbumRequest.name,
    description: createAlbumRequest.description,
    private: createAlbumRequest.private,
    timestamp: new Date().toISOString()
  })
}

export async function albumExists (
  albumId: string,
  jwtToken: string
): Promise<boolean> {
  const userId = getUserId(jwtToken)
  return await albumAccess.albumExists(
    userId,
    albumId
  )
}

export async function getAlbum (
  albumId: string,
  jwtToken: string
): Promise<Album> {
  const userId = getUserId(jwtToken)
  return await albumAccess.getAlbum(
    userId,
    albumId
  )
}

export async function deleteAlbum (
  albumId: string,
  jwtToken: string
): Promise<void> {
  const userId = getUserId(jwtToken)
  const images = await getImages(albumId);
  console.log('images', images)
  images.map(async (image: Image) => deleteImage(image))

  await albumAccess.deleteAlbum(
    userId,
    albumId
  )
}