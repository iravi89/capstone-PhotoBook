import * as uuid from 'uuid'

import { Album } from '../models/Album'
import { Image } from '../models/Image'
import { AlbumAccess } from '../dataLayer/albumsAccess'
import { CreateAlbumInterface } from '../requests/CreateAlbumRequest'
//import { getUserId } from '../auth/utils'
import { ImagesAccess } from '../dataLayer/imagesAccess'
import { CreateImageInterface } from '../requests/CreateImageRequest'
import { saveAlbumInterface } from '../requests/saveAlbumRequest'
const albumAccess = new AlbumAccess()
const imagesAccess = new ImagesAccess()

const bucketName = process.env.IMAGES_S3_BUCKET

export async function getAlbums(jwtToken: string): Promise<Album[]> {
  const userId = jwtToken
  return albumAccess.getAlbums(userId)
}

export async function createAlbum(
  createAlbumRequest: CreateAlbumInterface,
  jwtToken: string
): Promise<Album> {

  const itemId = uuid.v4()
  const userId = jwtToken

  return await albumAccess.createAlbum({
    id: itemId,
    userId: userId,
    name: createAlbumRequest.name,
    description: createAlbumRequest.description,
    private: createAlbumRequest.private,
    timestamp: new Date().toISOString(),
    location:createAlbumRequest.location,
    imgCnt:0
    
  })
}


export async function saveAlbum(
  saveAlbumRequest: saveAlbumInterface,
  jwtToken: string,
  albumId:string
): Promise<Album> {

  const itemId = albumId
  const userId = jwtToken

  return await albumAccess.createAlbum({
    id: itemId,
    userId: userId,
    name: saveAlbumRequest.name,
    description: saveAlbumRequest.description,
    private: saveAlbumRequest.private,
    timestamp: new Date().toISOString(),
    location:saveAlbumRequest.location,
    imgCnt:saveAlbumRequest.imageCount
  })
}


export async function updateImageCounter(
  jwtToken: string,
  albumId:string,
  albumRequest: CreateAlbumInterface
): Promise<Album> {

  //const img = await albumAccess.getAlbum(albumId,jwtToken)
  const itemId = albumId
  const userId = jwtToken

  return await albumAccess.createAlbum({
    id: itemId,
    userId: userId,
    name: albumRequest.name,
    description: albumRequest.description,
    private: albumRequest.private,
    timestamp: new Date().toISOString(),
    location:albumRequest.location,
    imgCnt:4
  })
}


export async function albumExists (
  albumId: string,
  jwtToken: string
): Promise<boolean> {
  const userId = jwtToken
  return await albumAccess.albumExists(
    userId,
    albumId
  )
}

export async function getAlbum (
  albumId: string,
  jwtToken: string
): Promise<Album> {
  const userId = jwtToken
  return await albumAccess.getAlbum(
    userId,
    albumId
  )
}

export async function deleteAlbum (
  albumId: string,
  jwtToken: string
): Promise<void> {
  const userId = jwtToken
  const images = await imagesAccess.getImages(albumId);
  console.log('images', images)
  images.map(async (image: Image) => imagesAccess.deleteImage(image))

  await albumAccess.deleteAlbum(
    userId,
    albumId
  )
}

export async function createImage(
  createImageRequest: CreateImageInterface, 
  albumId: string,
  jwtToken: string
): Promise<Image> {

  const imageId = uuid.v4()
  const userId = jwtToken

  return await imagesAccess.createImage({
    albumId: albumId,
    userId: userId,
    timestamp: new Date().toISOString(),
    imageId: imageId,
    title: createImageRequest.title,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  })
}




export async function pinImage(image: Image, jwtToken: string): Promise<Image> {
  const userId = jwtToken
  const imageId = uuid.v4()

  return imagesAccess.createImage({
    albumId: userId,
    userId: image.userId,
    timestamp: new Date().toISOString(),
    imageId: imageId,
    title: image.title,
    imageUrl: image.imageUrl,
    isPin: true
  })
}

export function getUploadUrl(imageId: string) {
  return imagesAccess.getUploadUrl(imageId)
}


export async function getImages(boardId: string): Promise<Image[]> {
  return imagesAccess.getImages(boardId)
}

export async function getImage(imageId: string): Promise<Image> {
  return imagesAccess.getImage(imageId)
}

export async function deleteImage(image: Image) {
  return imagesAccess.deleteImage(image)
}

export async function getAllImages(): Promise<Image[]> {
  return imagesAccess.getAllImages()
}
