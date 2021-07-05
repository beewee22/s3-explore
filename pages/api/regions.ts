import type { NextApiRequest, NextApiResponse } from 'next';
import {DescribeRegionsCommand, EC2Client} from '@aws-sdk/client-ec2'
import { ACCESS_KEY, SECRET_KEY } from './_key';

export interface Regions {
    $metadata: Metadata;
    Regions:   Region[];
}

export interface Metadata {
    httpStatusCode:  number;
    requestId:       string;
    attempts:        number;
    totalRetryDelay: number;
}

export interface Region {
    Endpoint:    string;
    RegionName:  string;
    OptInStatus: OptInStatus;
}

export enum OptInStatus {
    NotOptedIn = "not-opted-in",
    OptInNotRequired = "opt-in-not-required",
    OptedIn = "opted-in",
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const ec2Client = new EC2Client({
    region: 'ap-northeast-2',
    credentials: {
      accessKeyId: ACCESS_KEY,
      secretAccessKey: SECRET_KEY
    }
  });
  const regions = await ec2Client.send(new DescribeRegionsCommand({AllRegions: true}));
  res.status(200).json(regions);
};
