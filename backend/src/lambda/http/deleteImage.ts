import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { deleteImage, getImage } from '../../businessLogic/images'
import { getUserId } from '../../auth/utils'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const imageId = event.pathParameters.imageId

  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const userId = getUserId(jwtToken)
  
  const image = await getImage(imageId)

  if (!image || image.userId !== userId) {
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

  try {
    logger.info(`Deleting Image`)
    await deleteImage(image)
    return new ApiResponseHelper().generateDataSuccessMsgResponse(200,'Image Deleted')
    // return {
    //   statusCode: 200,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   body: 'Deleted'
    // }
  } catch (err) {
    logger.error(`Image Deletion failed`)
    return new ApiResponseHelper().generateErrorResponse(500,'Failed to delete')
    // return {
    //   statusCode: 500,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   body: 'Failed to delete', 
    // }
  }
}
