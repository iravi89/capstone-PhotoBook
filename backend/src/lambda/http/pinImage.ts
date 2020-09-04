import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'

import { pinImage,getImage} from '../../businessLogic/items'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'
const logger = createLogger('Albumlogs')

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const imageId = event.pathParameters.imageId

  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  
  const image = await getImage(imageId)

  if (!image) {
    logger.error(`Image not found`)
    return new ApiResponseHelper().generateErrorResponse(404,'Image not found')

  }

  const newItem = await pinImage(image, jwtToken)
  logger.info(`Listing fav images`)
  return new ApiResponseHelper().generateImageDataSuccessResponse(201,newItem)
}
