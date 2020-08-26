import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { getUserById} from '../../utils/jwtAuth'
import {getImage,deleteImage} from '../../businessLogic/items'
//import { getUserId } from '../../auth/utils'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')


export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const imageId = event.pathParameters.imageId

  // const authorization = event.headers.Authorization
  // const split = authorization.split(' ')
  // const jwtToken = split[1]
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const userId = jwtToken//getUserId(jwtToken)
  
  const image = await getImage(imageId)

  if (!image || image.userId !== userId) {
    logger.error(`Image not found`)
    return new ApiResponseHelper().generateErrorResponse(404,'Image not found')

  }

  try {
    logger.info(`Deleting Image`)
    await deleteImage(image)
    return new ApiResponseHelper().generateDataSuccessMsgResponse(200,'Image Deleted')

  } catch (err) {
    logger.error(`Image Deletion failed`)
    return new ApiResponseHelper().generateErrorResponse(500,'Failed to delete')

  }
}
