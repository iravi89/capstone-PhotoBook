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

    var params = {
      TableName : this.imagesTable,
      Item:image,
  };

  await this.docClient.put(params).promise()
    return image
  }

  getUploadUrl(imageId: string) {
    const url = new S3Access().getPresignedUrl(imageId)
    return url
  }


  async getImages(albumId: string): Promise<Image[]> {
  
    var params = {
      TableName : this.imagesTable,
      KeyConditionExpression: "#id = :albumId",
      ExpressionAttributeNames:{
          "#id": "albumId"
      },
      ExpressionAttributeValues: {
          ":albumId": albumId
      }
  };

  const result = await this.docClient.query(params).promise()
    const items = result.Items
    return items as Image[]
  }

  async getImage(imageId: string): Promise<Image> {

    var params = {
      TableName : this.imagesTable,
      IndexName : this.imageIdIndex,
      KeyConditionExpression: "#id = :imageId",
      ExpressionAttributeNames:{
          "#id": "imageId"
      },
      ExpressionAttributeValues: {
          ":imageId": imageId
      }
  };

  const result = await this.docClient.query(params).promise()
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
    const params = {
      TableName : this.imagesTable,
      
    }
    const result = await this.docClient.query(params).promise()
    const items = result.Items
    return items as Image[]
  }
}

