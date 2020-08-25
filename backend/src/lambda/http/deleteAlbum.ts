import 'source-map-support/register'
import { getAlbum, deleteAlbum } from '../../businessLogic/albums'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda'
import { createLogger } from '../../utils/logger'

const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Caller event', event)
  const authorization = event.headers.Authorization
  const split = authorization.split(' ')
  const jwtToken = split[1]
  const albumId = event.pathParameters.albumId
  const album = await getAlbum(albumId, jwtToken)

  if (!album) {
    logger.error(`Album not found to delete`)
    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')

  }

  try {
    await deleteAlbum(albumId, jwtToken)
    logger.info(`Album deleted`)
    return new ApiResponseHelper().generateDataSuccessMsgResponse(200,'Album Deleted')
    // return {
    //   statusCode: 200,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   body: 'Deleted'
    // }
  } catch (err) {
    console.log('Failed to delete', err)
    logger.info(`Album failed to delete`)
    return new ApiResponseHelper().generateErrorResponse(500,'Failed to delete')
    // return {
    //   statusCode: 500,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   body: 'Failed to delete', 
    // }
  }
}
