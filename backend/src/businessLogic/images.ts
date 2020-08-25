import * as uuid from 'uuid'

import { Image } from '../models/Image'
import { ImagesAccess } from '../dataLayer/imagesAccess'
import { CreateImageRequest } from '../requests/CreateImageRequest'
import { getUserId } from '../auth/utils'

const bucketName = process.env.IMAGES_S3_BUCKET

const imagesAccess = new ImagesAccess()

export async function createImage(
  createImageRequest: CreateImageRequest, 
  albumId: string,
  jwtToken: string
): Promise<Image> {

  const imageId = uuid.v4()
  const userId = getUserId(jwtToken)

  return await imagesAccess.createImage({
    albumId: albumId,
    userId: userId,
    timestamp: new Date().toISOString(),
    imageId: imageId,
    title: createImageRequest.title,
    imageUrl: `https://${bucketName}.s3.amazonaws.com/${imageId}`
  })
}

export function getUploadUrl(imageId: string) {
  return imagesAccess.getUploadUrl(imageId)
}


export async function getImages(albumId: string): Promise<Image[]> {
  return imagesAccess.getImages(albumId)
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

export async function pinImage(image: Image, jwtToken: string): Promise<Image> {
  const userId = getUserId(jwtToken)
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