import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import RoomsTable from './components/RoomsTable';
import RoomCreateDialog from './components/RoomCreateDialog';
import {addRoom} from '../../services/hotels.service';
import { useMutation } from 'react-query';


const RoomsManageContainer = ({hotel}) => {

    const [openDialog, setOpenDialog] = useState(false);

    const { mutate: save, isLoading, isError } = useMutation(addRoom, {
        onSuccess: (data) => {
            setOpenDialog(false);
            router.reload();
        },
        onError: (error) => {
          alert('Error! ');
        }
      });


    const openCreateDialog = () => {
        setOpenDialog(true);
    }

    const closeCreateDialog = () => {
        setOpenDialog(false);
    }

    console.log(hotel);

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
            <Grid item xs={12} mt={2}>
                <RoomsTable data={hotel.rooms} />
            </Grid>

            <RoomCreateDialog id={hotel._id} open={openDialog} close={closeCreateDialog} save={save} />

        </Grid>
    );
};

export default RoomsManageContainer;