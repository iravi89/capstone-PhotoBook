import 'source-map-support/register'
import { getImages } from '../../businessLogic/images'
import { getUserId } from '../../auth/utils'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Caller event', event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const userId = getUserId(jwtToken)

  const images = await getImages(userId)
  logger.info(`Listing all Fav images user ${userId}`)
  return new ApiResponseHelper().generateImagesDataSuccessResponse(200,images)

  // return {
  //   statusCode: 200,
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Credentials': true
  //   },
  //   body: JSON.stringify({
  //     items: images
  //   })
  // }
}
