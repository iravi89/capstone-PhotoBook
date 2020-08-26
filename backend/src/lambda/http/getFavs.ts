import 'source-map-support/register'
import { getImages } from '../../businessLogic/items'
import { getUserId } from '../../auth/utils'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { getUserById} from '../../utils/jwtAuth'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

//  console.log('Caller event', event)
  // const authorization = event.headers.Authorization
  // const split = authorization.split(' ')
  // const jwtToken = split[1]
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const userId = jwtToken//getUserId(jwtToken)

  
  
  const images = await getImages(userId)
  logger.info(`Listing all Fav images user ${userId}`)
  return new ApiResponseHelper().generateImagesDataSuccessResponse(200,images)

}
