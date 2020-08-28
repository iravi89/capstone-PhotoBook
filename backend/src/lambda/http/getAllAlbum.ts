import 'source-map-support/register'
import { getAlbums } from '../../businessLogic/items'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'
const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const albums = await getAlbums(jwtToken);
  logger.info(`Listing all albums`)
  
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
