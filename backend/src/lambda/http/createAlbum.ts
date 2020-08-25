import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { CreateAlbumRequest } from '../../requests/CreateAlbumRequest'
import { createAlbum } from '../../businessLogic/albums'
import { createLogger } from '../../utils/logger'



const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)

  const newAlbum: CreateAlbumRequest = JSON.parse(event.body)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  logger.info(`Album creating`)
  const newItem = await createAlbum(newAlbum, jwtToken)
  return new ApiResponseHelper().generateDataSuccessResponse(201,'item',newItem)

}