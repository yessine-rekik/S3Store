import { s3 } from '../config/aws';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, PutObjectCommand } from '@aws-sdk/client-s3';
import config from '../config';

// upload
export async function putObjectSignedUrl(id: string) {
  return await getSignedUrl(
    s3,
    new PutObjectCommand({
      Bucket: config.AWS_S3_BUCKET,
      Key: id,
    }),
    { expiresIn: 30 }
  );
}

// download
export async function getObjectSignedUrl(id: string) {
  return await getSignedUrl(
    s3,
    new GetObjectCommand({
      Bucket: config.AWS_S3_BUCKET,
      Key: id,
    }),
    { expiresIn: 30 }
  );
}
