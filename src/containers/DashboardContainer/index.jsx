import React from 'react';
import Grid from '@mui/material/Grid';
import OrdersTotal from './components/OrdersTotal';
import ClientsTotal from './components/ClientsTotal';
import ToursSales from './components/ToursSales';
import AgencySales from './components/AgencySales';

const DashboardContainer = () => {
    return (
        <Grid container p={3}>
            <Grid xs={12} item>
                <Grid container spacing={3}>
                    <Grid xs={3} item>
                        <OrdersTotal />
                    </Grid>
                    <Grid xs={3} item>
                        <ClientsTotal />
                    </Grid>
                </Grid>
            </Grid>
            <Grid xs={12} item mt={3}>
                <Grid container spacing={3}>
                    <Grid xs={5} item>
                        <ToursSales />
                    </Grid>
                    <Grid xs={5} item>
                        <AgencySales />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
};

export default DashboardContainer;