import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import RoomsTable from './components/RoomsTable';
import RoomCreateDialog from './components/RoomCreateDialog';

const RoomsManageContainer = ({hotel}) => {

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
                <Typography variant={'h6'}>{hotel.name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'} onClick={openCreateDialog}>{'Agregar habitacion'}</Button>
                </Grid>
            </Grid>
            <Grid xs={12}>
                <RoomsTable data={hotel.rooms} />
            </Grid>

            <RoomCreateDialog open={openDialog} close={closeCreateDialog} save={save} />

        </Grid>
    );
};

export default RoomsManageContainer;