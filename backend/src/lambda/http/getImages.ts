import 'source-map-support/register'
import { getImages } from '../../businessLogic/images'
import { albumExists } from '../../businessLogic/albums'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Caller event', event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const albumId = event.pathParameters.albumId
  const validAlbumId = await albumExists(albumId, jwtToken)

  if (!validAlbumId) {
    logger.error(`not a valid album`)
    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')

  }

  const images = await getImages(albumId)
  logger.info(`Listing images for album: ${albumId}`)
  return new ApiResponseHelper().generateImagesDataSuccessResponse(200,images)

}
