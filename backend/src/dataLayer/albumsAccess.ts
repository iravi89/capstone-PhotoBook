import * as AWS from 'aws-sdk'
//import * as AWSXRay from 'aws-xray-sdk'
const AWSXRay = require('aws-xray-sdk')


const XAWS = AWSXRay.captureAWS(AWS)

import { Album } from '../models/Album'

export class AlbumAccess {

  constructor(
    private readonly docClient: AWS.DynamoDB.DocumentClient = new XAWS.DynamoDB.DocumentClient(),
    private readonly albumsTable = process.env.ALBUMS_TABLE) {
  }

  async getAlbums(userId: string): Promise<Album[]> {
    console.log('Getting albums')

    const params = {
      TableName: this.albumsTable,
      KeyConditionExpression: 'userId = :userId',
      ExpressionAttributeValues: {
        ':userId': userId
      }
    }
    const result = await this.docClient.query(params).promise()

    // const result = await this.docClient.query({
    //   TableName: this.albumsTable,
    //   KeyConditionExpression: 'userId = :userId',
    //   ExpressionAttributeValues: {
    //     ':userId': userId
    //   }
    // }).promise()

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
    console.log('Image Count Get:',result.Item.imgCnt)
    return result.Item as Album
  }


  async createAlbum(album: Album): Promise<Album> {

    const params = {
      TableName: this.albumsTable,
      Item: album
    }
    await this.docClient.put(params).promise()
    // await this.docClient.put({
    //   TableName: this.albumsTable,
    //   Item: album
    // }).promise()

    return album
  }

  async updateAlbum(album: Album): Promise<Album> {

    console.log('Name:'+album.name)
    console.log('Description:'+album.description)
    await this.docClient.update({
      TableName: this.albumsTable, 
      Key:{ "userId": album.userId,"id":album.id},
       UpdateExpression: "set #desc = :r, #nzz=:p, #locat=:a", 
       ExpressionAttributeNames:{"#desc":"description","#nzz":"name","#locat":"location"},
       ExpressionAttributeValues:{ ":r":album.description, ":p":album.name, ":a":album.location }, 
       ReturnValues:"UPDATED_NEW" 
    }).promise()

    return album
  }

  async updateImageCounter(album: Album,counter:number): Promise<Album> {

    await this.docClient.update({
      TableName: this.albumsTable, 
      Key:{ "userId": album.userId,"id":album.id},
       UpdateExpression: "ADD #ctr :r", 
       ExpressionAttributeNames:{"#ctr":"imgCnt"},
       ExpressionAttributeValues:{ ":r":counter },
       ReturnValues:"UPDATED_NEW" 
    }).promise()

    return album
  }


  async deleteAlbum(userId: string, albumId: string): Promise<void> {


    const params = {
      TableName: this.albumsTable,
      Key: {
        id: albumId,
        userId: userId
      }
    }
    await this.docClient.delete(params).promise()
    // await this.docClient.delete({
    //   TableName: this.albumsTable,
    //   Key: {
    //     id: albumId,
    //     userId: userId
    //   }
    // }).promise()
  }
}

