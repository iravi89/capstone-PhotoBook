import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { saveAlbumInterface } from '../../requests/saveAlbumRequest'
import { saveAlbum } from '../../businessLogic/items'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'


const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const albumId = event.pathParameters.albumId
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const newAlbum: saveAlbumInterface = JSON.parse(event.body)
  logger.info(`Album updating`)
  const newItem = await saveAlbum(newAlbum, jwtToken,albumId)
  return new ApiResponseHelper().generateDataSuccessResponse(201,'item',newItem)

}