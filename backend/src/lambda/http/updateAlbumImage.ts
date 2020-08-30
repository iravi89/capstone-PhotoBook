import { APIGatewayProxyHandler, APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda'
import 'source-map-support/register'
import { ApiResponseHelper } from '../../helpers/apiResponseHelper'
import { saveAlbumInterface } from '../../requests/saveAlbumRequest'
import { saveAlbum,getAlbum,updateImageCounter } from '../../businessLogic/items'
import { createLogger } from '../../utils/logger'
import { getUserById} from '../../utils/jwtAuth'
import { CreateAlbumInterface } from '../../requests/CreateAlbumRequest'


const logger = createLogger('Albumlogs')
export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
  console.log('Processing event: ', event)
  logger.info('image counter updated start')
  const albumId = event.pathParameters.albumId
  const authHeader = event.headers['Authorization']
  const jwtToken = getUserById(authHeader)
  //const newAlbum: saveAlbumInterface = JSON.parse(event.body)
  //newAlbum.imageCount = newAlbum.imageCount+1
  //  logger.info(`Album updating`)
   const tt = await getAlbum(albumId,jwtToken)
   let request : CreateAlbumInterface
   request.name = tt.name
   request.description = tt.description
   request.location = tt.location
   request.imageCounter = tt.imgCnt + 1
  // tt.imgCnt = tt.imgCnt + 1
  logger.info('image counter updated')
  const newItem = await updateImageCounter(jwtToken,albumId,request)
  return new ApiResponseHelper().generateDataSuccessResponse(201,'item',newItem)

}