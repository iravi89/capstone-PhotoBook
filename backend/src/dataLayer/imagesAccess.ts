import * as AWS  from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk')


const XAWS = AWSXRay.captureAWS(AWS)

import { Image } from '../models/Image'
import {S3Access} from '../utils/s3Access'

export class ImagesAccess {

  constructor(
    private readonly docClient: AWS.DynamoDB.DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly imagesTable = process.env.IMAGES_TABLE,
    private readonly imageIdIndex = process.env.IMAGE_ID_INDEX) {
  }
  async createImage(image: Image): Promise<Image> {
    await this.docClient.put({
      TableName: this.imagesTable,
      Item: image
    }).promise()

    return image
  }

  getUploadUrl(imageId: string) {
    const url = new S3Access().getPresignedUrl(imageId)
    return url
  }


  async getImages(albumId: string): Promise<Image[]> {
  
    const result = await this.docClient.query({
      TableName: this.imagesTable,
      KeyConditionExpression: 'albumId = :albumId',
      ExpressionAttributeValues: {
        ':albumId': albumId
      }
    }).promise()
    const items = result.Items
    return items as Image[]
  }

  async getImage(imageId: string): Promise<Image> {
    const result = await this.docClient.query({
        TableName : this.imagesTable,
        IndexName : this.imageIdIndex,
        KeyConditionExpression: 'imageId = :imageId',
        ExpressionAttributeValues: {
            ':imageId': imageId
        }
    }).promise()
    if (result.Count !== 0) {
      return result.Items[0] as Image
    }
  }

  async deleteImage(image: Image) {
    const params = {
      TableName : this.imagesTable,
      Key: {
        albumId: image.albumId,
        timestamp: image.timestamp
      }
    }
    await this.docClient.delete(params).promise()
  }

  async getAllImages(): Promise<Image[]> {
    const result = await this.docClient.scan({
      TableName: this.imagesTable,
    }).promise()
    const items = result.Items
    return items as Image[]
  }
}

