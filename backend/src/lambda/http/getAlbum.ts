import 'source-map-support/register'
import { getAlbum } from '../../businessLogic/albums'
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
  logger.error(`Album not found`)

    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')
    // return {
    //   statusCode: 404,
    //   headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Access-Control-Allow-Credentials': true
    //   },
    //   body: JSON.stringify({
    //     error: 'Album not found'
    //   })
    // }
  }

  //return new ApiResponseHelper().generateAlbumDataSuccessResponse(200,album)

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      album
    })
  }
}
