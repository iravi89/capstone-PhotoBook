import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { CreateAlbumInterface } from '../../requests/CreateAlbumRequest'
import { createAlbum } from '../../businessLogic/items'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'


const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const newAlbum: CreateAlbumInterface = JSON.parse(event.body)
  logger.info(`Album creating`)
  const newItem = await createAlbum(newAlbum, jwtToken)
  return new ApiResponseHelper().generateDataSuccessResponse(201,'item',newItem)

}