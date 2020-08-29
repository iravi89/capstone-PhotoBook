import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'

import { CreateImageInterface } from '../../requests/CreateImageRequest'
import { saveAlbumInterface } from '../../requests/saveAlbumRequest'
import { albumExists } from '../../businessLogic/items'
import { createImage, getUploadUrl ,getAlbum,updateImageCounter} from '../../businessLogic/items'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'
const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {

  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  const albumId = event.pathParameters.albumId
  const validAlbumId = await albumExists(albumId, jwtToken)

  if (!validAlbumId) {
    logger.error(`Album not found`)
    return new ApiResponseHelper().generateErrorResponse(404,'Album not found')

  }

  // const album_t = await getAlbum(albumId,jwtToken)
  // let tt: saveAlbumInterface
  // tt.name = album_t.name
  // tt.location = album_t.location
  // tt.description = album_t.description
  // album_t.imgCnt = album_t.imgCnt + 1
  // console.log('image count:',album_t.imgCnt)

  // await updateImageCounter(jwtToken,albumId)

  const newImage: CreateImageInterface = JSON.parse(event.body)
  const newItem = await createImage(newImage, albumId, jwtToken)
  
  //const saveItem = await saveAlbum(tt, jwtToken,albumId,album_t.imgCnt)
  
  const url = getUploadUrl(newItem.imageId)
  logger.info(`Image Uploaded`)
 
  return {
    statusCode: 201,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({
      newItem: newItem,
      uploadUrl: url
    })
  }
}
