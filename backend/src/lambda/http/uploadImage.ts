import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { CreateImageInterface } from '../../requests/CreateImageRequest'
import { albumExists } from '../../businessLogic/items'
import { createImage, getUploadUrl } from '../../businessLogic/items'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'
const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  // console.log('Caller event', event)

  // const authorization = event.headers.Authorization
  // const split = authorization.split(' ')
  // const jwtToken = split[1]
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const albumId = event.pathParameters.albumId
  const validAlbumId = await albumExists(albumId, jwtToken)

  if (!validAlbumId) {
    //const error_msg = 'Album not found'
    logger.error(`Album not found`)
    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')

  }

  const newImage: CreateImageInterface = JSON.parse(event.body)
  const newItem = await createImage(newImage, albumId, jwtToken)

  const url = getUploadUrl(newItem.imageId)
  logger.info(`Image Uploaded`)
 
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}
