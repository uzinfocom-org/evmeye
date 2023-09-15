import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Grid, Paper } from '@mui/material';
import BlocksTable from '@/components/BlocksTable';
import { Database } from '@/db';
import { Scanboi } from '@/scanner/scanboi';
import { useAppSelector } from '@/store/hooks';
import { ethers } from 'ethers';
import * as Rx from 'rxjs';
import * as RxOperators from 'rxjs/operators';

const HomeView: React.FC = () => {
  const networks = useAppSelector((state) => state.networks.networks);
  const selectedNetworkId = useAppSelector((state) => state.networks.selected);
  const selectedNetwork = networks.find((n) => n.id == selectedNetworkId);

  const [blocks, setBlocks] = React.useState<ethers.Block[]>([]);

  const scanboi = React.useRef<Scanboi | null>(null);

  React.useEffect(() => {
    if (!selectedNetwork) return;

    const provider = new ethers.JsonRpcProvider(selectedNetwork.url);

    provider.getBlockNumber().then(async () => {
      const db = new Database(selectedNetwork.id);
      scanboi.current = new Scanboi(provider, db);
      scanboi.current.fetchBlocksFromLatest$(10).subscribe((blocks) => setBlocks(blocks));
      scanboi.current.fetchBlocksReverse$();
    });

    return () => {
      setBlocks([]);

      if (scanboi.current) {
        scanboi.current.dispose();
        scanboi.current = null;
      }

      provider.destroy();
    };
  }, [selectedNetwork, selectedNetworkId]);

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <BlocksTable blocks={blocks} />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default HomeView;
