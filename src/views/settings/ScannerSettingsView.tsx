import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Grid, Paper } from '@mui/material';
import Title from '@/components/Title';
import NetworkItem from '@/components/settings/NetworkItem';
import NetworkItemAdd from '@/components/settings/NetworkItemAdd';
import { toast } from 'sonner';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { NETWORKS_ACTIONS } from '@/store/slices/networksSlice';

const ScannerSettingsView: React.FC = () => {
  const networks = useAppSelector((state) => state.networks.networks);
  const dispatch = useAppDispatch();

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Title mb={2}>Servers</Title>
            <Grid container spacing={3}>
              {networks.map((network, index) => (
                <Grid item xs={4} key={index}>
                  <NetworkItem
                    item={network}
                    setItem={(item) => {
                      dispatch(NETWORKS_ACTIONS.editNetwork({ index, item }));
                      toast.success('Network updated');
                    }}
                    deleteItem={() => {
                      dispatch(NETWORKS_ACTIONS.deleteNetwork({ index }));
                      toast.success('Network deleted');
                    }}
                  />
                </Grid>
              ))}

              {/* Magic number. Too lazy for better solution */}
              <Grid item xs={4} height={242}>
                <NetworkItemAdd
                  onClick={() => {
                    dispatch(NETWORKS_ACTIONS.addNetwork());
                    toast.success('Network added');
                  }}
                />
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default ScannerSettingsView;
