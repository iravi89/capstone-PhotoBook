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
  logger.info('image counter updated start')
  const albumId = event.pathParameters.albumId
  const authHeader = event.headers['Authorization']

  const count : number = JSON.parse(event.body)
  const jwtToken = getUserById(authHeader)

   const tt = await getAlbum(albumId,jwtToken)
   let request : CreateAlbumInterface
   request.name = tt.name
   request.description = tt.description
   request.location = tt.location
   request.imageCounter = tt.imgCnt + count

  logger.info('image counter updated')
  const newItem = await updateImageCounter(jwtToken,albumId,request)
  return new ApiResponseHelper().generateDataSuccessResponse(201,'item',newItem)

}