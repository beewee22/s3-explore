import { Box, Flex, HStack, VStack } from '@chakra-ui/react';
import React, { useEffect, useMemo } from 'react';
import { useRecoilValue, useRecoilValueLoadable } from 'recoil';
import { bucketAtom, bucketListAtom, regionAtom } from 'store/s3';
import Header from './_header';
import RCTable from 'rc-table';
import { ColumnsType } from 'rc-table/lib/interface';
import { Bucket, ListBucketsCommandOutput } from '@aws-sdk/client-s3';

export default function Home() {
  const region = useRecoilValue(regionAtom);
  const bucket = useRecoilValue(bucketAtom);
  const bucketListLoadable = useRecoilValueLoadable(bucketListAtom);

  const bucketList = useMemo(() => {
    if (bucketListLoadable.state === 'hasValue') {
      return bucketListLoadable.contents;
    }
  }, [bucketListLoadable]);

  useEffect(() => {
    console.log(bucket);
  }, [region]);

  const columns = useMemo<ColumnsType<Bucket>>(() => {
    return [
      {
        title: '',
        children: <div>c</div>,
      },
      {
        title: 'Name',
        dataIndex: 'Name',
      },
    ];
  }, []);

  return (
    <VStack>
      <HStack>
        <Header />
      </HStack>
      <Flex>
        {(!bucket || bucket === '') && bucketList?.Buckets && (
          <RCTable columns={columns} data={bucketList?.Buckets} />
        )}
      </Flex>
    </VStack>
  );
}
