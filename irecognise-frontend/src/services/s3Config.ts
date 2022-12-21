export const s3Config = {
    bucketName:  process.env.REACT_AWS_BUCKET_NAME!,
    region: 'ap-southeast-1'!,
    accessKeyId: process.env.ACCESS_KEY_ID!,
    secretAccessKey: process.env.REACT_AWS_SECRET_ACCESS_KEY!,
    // s3Url: 'https:/your-aws-s3-bucket-url/'     /* Optional */
}