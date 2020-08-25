import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { pinImage, getImage } from '../../businessLogic/images'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const imageId = event.pathParameters.imageId

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  
  const image = await getImage(imageId)

  if (!image) {
    logger.error(`Image not found`)
    return new ApiResponseHelper().generateErrorResponse(404,'Image not found')
    // return {
    //   statusCode: 404,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   body: JSON.stringify({
    //     error: 'Image not found'
    //   })
    // }
  }

  const newItem = await pinImage(image, jwtToken)
  logger.info(`Listing fav images`)
  return new ApiResponseHelper().generateImageDataSuccessResponse(201,newItem)

  // return {
  //   statusCode: 201,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': true
  //   },
  //   body: JSON.stringify({
  //     newItem: newItem
  //   })
  // }
}
