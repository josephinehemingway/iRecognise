export const s3Config = {
    bucketName:  process.env.REACT_APP_AWS_BUCKET_NAME!,
    region: process.env.REACT_APP_AWS_REGION!,
    accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID!,
    secretAccessKey:  process.env.REACT_APP_AWS_SECRET_ACCESS_KEY!,
    // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
}