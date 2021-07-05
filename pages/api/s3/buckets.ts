import { ListBucketsCommand, S3Client } from '@aws-sdk/client-s3';
import type { NextApiRequest, NextApiResponse } from 'next';
import { ACCESS_KEY, SECRET_KEY } from '../_key';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { region } = req.query;

  if(typeof region !== 'string' || region === '' ) {
    res.status(500).send('region needed');
    return;
  }

  const s3 = new S3Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY
    }
  });
  const buckets = await s3.send(new ListBucketsCommand({}));
  res.status(200).json(buckets);
};
