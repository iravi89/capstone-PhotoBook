import 'source-map-support/register'
import { getAlbum, deleteAlbum } from '../../businessLogic/items'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
 
  const albumId = event.pathParameters.albumId
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const album = await getAlbum(albumId, jwtToken)

  if (!album) {
    logger.error(`Album not found to delete`)
    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')
  }

  try {
    await deleteAlbum(albumId, jwtToken)
    logger.info(`Album deleted`)
    return new ApiResponseHelper().generateDataSuccessMsgResponse(200,'Album Deleted')

  } catch (err) {
    console.log('Failed to delete', err)
    logger.info(`Album failed to delete`)
    return new ApiResponseHelper().generateErrorResponse(500,'Failed to delete')

  }
}
