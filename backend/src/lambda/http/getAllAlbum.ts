import 'source-map-support/register'
import { getAlbums } from '../../businessLogic/albums'
//import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]

  const albums = await getAlbums(jwtToken);
  logger.info(`Listing all albums`)
  //return new ApiResponseHelper().generateAlbumsDataSuccessResponse(200,albums)
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
        items: albums,
    }),
  }
}
