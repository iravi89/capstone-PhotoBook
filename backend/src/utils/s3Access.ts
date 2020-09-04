import * as AWS from 'aws-sdk'
import * as AWSXRay from 'aws-xray-sdk'



export class S3Access{

    constructor(
        private readonly urlExpiration = process.env.SIGNED_URL_EXPIRATION,
        private readonly XAWS = AWSXRay.captureAWS(AWS),
        private readonly  s3:AWS.S3 = new XAWS.S3({
            signatureVersion: 'v4',
            region: process.env.region,
            params: {Bucket: process.env.IMAGES_S3_BUCKET}
            
          }),
          
    ){
        
    }

    getPresignedUrl(imageId: string): string{
        return this.s3.getSignedUrl('putObject', {
            Bucket: process.env.IMAGES_S3_BUCKET,
            Key: imageId,
            Expires: this.urlExpiration
          }) as string ;
    }
}