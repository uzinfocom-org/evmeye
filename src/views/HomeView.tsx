import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Grid, Paper } from '@mui/material';
import Deposits from '../components/Deposits';
import Orders from '../components/Orders';

const HomeView: React.FC = () => {
  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            <Deposits />
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            <Orders />
          </Paper>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default HomeView;
