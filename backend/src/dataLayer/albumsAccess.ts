import * as AWS  from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk')


const XAWS = AWSXRay.captureAWS(AWS)

import { Album } from '../models/Album'

export class AlbumAccess {

  constructor(
    private readonly docClient:AWS.DynamoDB.DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly albumsTable = process.env.ALBUMS_TABLE) {
  }

  async getAlbums(userId: string): Promise<Album[]> {
    console.log('Getting albums')
    const result = await this.docClient.query({
      TableName: this.albumsTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }).promise()

    const items = result.Items
    return items as Album[]
  }

  async albumExists(userId: string, albumId: string): Promise<boolean> {
    const params = {
      TableName: this.albumsTable,
      Key: {
        id: albumId,
        userId: userId
      }
    }
    const result = await this.docClient.get(params).promise()

    return !!result.Item
  }

  async getAlbum(userId: string, albumId: string): Promise<Album> {
    const params = {
      TableName: this.albumsTable,
      Key: {
        id: albumId,
        userId: userId
      }
    }
    const result = await this.docClient.get(params).promise()

    return result.Item as Album
  }


  async createAlbum(album: Album): Promise<Album> {
    await this.docClient.put({
      TableName: this.albumsTable,
      Item: album
    }).promise()

    return album
  }

  async deleteAlbum(userId: string, albumId: string): Promise<void> {
    await this.docClient.delete({
      TableName : this.albumsTable,
      Key: {
        id: albumId,
        userId: userId
      }
    }).promise()
  }
}

