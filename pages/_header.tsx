import { Select } from '@chakra-ui/react';
import React, { useMemo } from 'react';
import { useRecoilState, useRecoilValueLoadable } from 'recoil';
import { regionAtom, regionListAtom } from 'store/s3';

const Header = () => {
  const [region, setRegion] = useRecoilState(regionAtom);
  const regionListLoadable = useRecoilValueLoadable(regionListAtom);
  const regionList = useMemo(() => {
    if (regionListLoadable.state === 'hasValue') {
      return regionListLoadable.contents;
    }
  }, [regionListLoadable]);

  return (
    <>
      <Select value={region} onChange={(e) => setRegion(e.currentTarget.value)}>
        {regionList &&
          regionList.Regions.map((region) => {
            return (
              <option key={region.RegionName} value={region.RegionName}>
                {region.RegionName}
              </option>
            );
          })}{' '}
      </Select>
    </>
  );
};

export default Header;
