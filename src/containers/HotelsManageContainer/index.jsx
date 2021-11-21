import React from 'react';
import {Grid, Typography, Button} from '@mui/material';
import HotelsTable from './components/HotelsTable';


const HotelsManageContainer = () => {
    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant={'h6'}>{'Lista de hoteles'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'}>{'Agregar hotel'}</Button>
                </Grid>
            </Grid>
            <Grid xs={12}>
                <HotelsTable />
            </Grid>
        </Grid>
    );
};

export default HotelsManageContainer;