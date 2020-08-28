import 'source-map-support/register'

import { albumExists,getImages } from '../../businessLogic/items'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'
const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const albumId = event.pathParameters.albumId

  //check
  const validAlbumId = await albumExists(albumId, jwtToken)

  if (!validAlbumId) {
    logger.error(`not a valid album`)
    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')

  }

  const images = await getImages(albumId)
  logger.info(`Listing images for album: ${albumId}`)
  return new ApiResponseHelper().generateImagesDataSuccessResponse(200,images)

}
