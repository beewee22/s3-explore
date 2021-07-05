import { ListBucketsCommandOutput } from '@aws-sdk/client-s3';
import { Region, Regions } from 'pages/api/regions';
import { atom, selector } from 'recoil';

export const regionListAtom = selector<Regions>({
  key: 'REGIONS',
  get: async () => {
    const response = await fetch('/api/regions');
    return response.json();
  },
});

export const regionAtom = atom<Region['RegionName']>({
  key: 'S3_REGION',
  default: 'ap-northeast-2'
})

export const bucketListAtom = selector<ListBucketsCommandOutput>({
  key: 'BUCKETS',
  get: async ({ get }) => {
    const region = get(regionAtom);
    const response = await fetch(`/api/s3/buckets?region=${region}`);
    return response.json();
  },
});

export const bucketAtom = atom({
  key: 'S3_BUCKET',
  default: ''
});

export const pathAtom = atom({
  key: 'S3_PATH',
  default: '/'
})

export const selectedFilesAtom = atom({
  key: 'S3_SELECTED',
  default: []
})
