import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import HotelsTable from './components/HotelsTable';
import { hotels } from '../../../data/hotels';
import HotelsCreateDialog from './components/HotelsCreateDialog';

const HotelsManageContainer = () => {

    const [openDialog, setOpenDialog] = useState(false);

    const openCreateDialog = () => {
        setOpenDialog(true);
    }

    const closeCreateDialog = () => {
        setOpenDialog(false);
    }

    const save = () => {

    }

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant={'h6'}>{'Lista de hoteles'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'} onClick={openCreateDialog}>{'Agregar hotel'}</Button>
                </Grid>
            </Grid>
            <Grid xs={12} mt={2}>
                <HotelsTable data={hotels} />
            </Grid>

            <HotelsCreateDialog open={openDialog} close={closeCreateDialog} save={save} />

        </Grid>
    );
};

export default HotelsManageContainer;