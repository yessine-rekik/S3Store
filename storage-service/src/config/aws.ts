import { S3 } from '@aws-sdk/client-s3';
import config from '.';

export const s3 = new S3({
  credentials: {
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY,
  },
  region: config.AWS_REGION,
});
