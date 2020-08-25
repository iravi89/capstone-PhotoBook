import {  APIGatewayProxyResult } from 'aws-lambda'
//import { ImageArr } from 'aws-sdk/clients/sagemaker'
import { Image } from '../models/Image'
import { Album } from '../models/Album'
export class ApiResponseHelper{

    generateDataSuccessResponse(statusCode: number,key: string, itemsd: any): APIGatewayProxyResult{
        return {
            statusCode: statusCode,
            headers:{
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
              items:itemsd
            })
          }
    }

    generateImageItemDataSuccessResponse(statusCode: number,image: Image, items: any): APIGatewayProxyResult{
      return {
          statusCode: statusCode,
          headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
            newItem:image,
            url:items
          })
        }
  }

  generateAlbumDataSuccessResponse(statusCode: number,item: Album): APIGatewayProxyResult{
    return {
        statusCode: statusCode,
        headers:{
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          item
        })
      }
}

generateAlbumsDataSuccessResponse(statusCode: number,item: Album[]): APIGatewayProxyResult{
  return {
      statusCode: statusCode,
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items:item,
      })
    }
}

  generateImagesDataSuccessResponse(statusCode: number,item: Image[]): APIGatewayProxyResult{
    return {
        statusCode: statusCode,
        headers:{
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          items:item,
        })
      }
}

generateImageDataSuccessResponse(statusCode: number,item: Image): APIGatewayProxyResult{
  return {
      statusCode: statusCode,
      headers:{
        'Access-Control-Allow-Origin':'*',
        'Access-Control-Allow-Credentials': true
      },
      body: JSON.stringify({
        items:item,
      })
    }
}
   
  generateEmptySuccessItemResponse(statusCode: number,items:any): APIGatewayProxyResult{
    return {
        statusCode: statusCode,
        headers:{
          'Access-Control-Allow-Origin':'*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({
          items
        })
      }
}

    generateEmptySuccessResponse(statusCode: number): APIGatewayProxyResult{
        return {
            statusCode: statusCode,
            headers:{
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Credentials': true
            },
            body: null
          }
    }

    generateDataSuccessMsgResponse(statusCode: number,message: string): APIGatewayProxyResult{
      return {
          statusCode: statusCode,
          headers:{
            'Access-Control-Allow-Origin':'*',
            'Access-Control-Allow-Credentials': true
          },
          body: JSON.stringify({
            message
          })
        }
  }

    generateErrorResponse(statusCode: number,message:string): APIGatewayProxyResult{
        return {
            statusCode: statusCode,
            headers:{
              'Access-Control-Allow-Origin':'*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify({
              message
            })
          }
    }
}