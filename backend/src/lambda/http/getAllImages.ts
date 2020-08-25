import 'source-map-support/register'
import { getAllImages } from '../../businessLogic/images'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  console.log('Caller event', event)

  const images = await getAllImages()

  logger.info(`Listing all Images`)
  return new ApiResponseHelper().generateImagesDataSuccessResponse(200,images)

}
