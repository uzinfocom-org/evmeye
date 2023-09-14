import React from 'react';
import DashboardLayout from '@/layouts/DashboardLayout';
import { Grid, Paper } from '@mui/material';
import Title from '@/components/Title';
import NetworkItem from '@/components/settings/NetworkItem';
import NetworkItemAdd from '@/components/settings/NetworkItemAdd';
import useSettingsNetworks from '@/sources/networks/useSettingsNetworks';
import { toast } from 'sonner';

const ScannerSettingsView: React.FC = () => {
  const { networks, addNetwork, editNetwork, deleteNetwork } = useSettingsNetworks();

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
                      toast.success('Network updated');
                      editNetwork(index, item);
                    }}
                    deleteItem={() => {
                      toast.success('Network deleted');
                      deleteNetwork(index);
                    }}
                  />
                </Grid>
              ))}

              {/* Magic number. Too lazy for better solution */}
              <Grid item xs={4} height={242}>
                <NetworkItemAdd
                  onClick={() => {
                    addNetwork();
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
