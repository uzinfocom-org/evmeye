import { useAppSelector } from '@/store/hooks';
import { ethers } from 'ethers';
import React from 'react';
import { Scanboi } from './scanboi';

const Scanner: React.FC = () => {
  const networks = useAppSelector((state) => state.networks.networks);
  const selectedNetworkIndex = useAppSelector((state) => state.networks.selected);
  const selectedNetwork = networks[selectedNetworkIndex ?? -1];

  React.useEffect(() => {
    if (!selectedNetwork) return;

    let scanboi: Scanboi | null = null;
    const provider = new ethers.JsonRpcProvider(selectedNetwork.url);

    provider.getBlockNumber().then(() => {
      scanboi = new Scanboi(provider);
    });

    return () => {
      if (scanboi) {
        scanboi.dispose();
      }
    };
  }, [selectedNetwork, selectedNetworkIndex]);

  return <></>;
};

export default Scanner;
