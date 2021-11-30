import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import RoomsTable from './components/RoomsTable';
import RoomCreateDialog from './components/RoomCreateDialog';
import RoomEditDialog from './components/RoomEditDialog';
import { addRoom, removeRoom, updateRoom } from '../../services/hotels.service';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const RoomsManageContainer = ({ hotel }) => {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);

    const [selected, setSelected] = useState();

    const { mutate: save, isLoading, isError } = useMutation(addRoom, {
        onSuccess: (data) => {
            setOpenDialog(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: update } = useMutation(updateRoom, {
        onSuccess: (data) => {
            setOpenDialogEdit(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: remove } = useMutation(removeRoom, {
        onSuccess: (data) => {
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

    const closeDialogEdit = () => {
        setOpenDialogEdit(false);
    }

    const handleRemove = room => {
        const data = {
            hotelId: hotel._id,
            roomName: room
        }
        remove(data);
    }

    const showEdit = room => {
        const item = hotel.rooms.find(d=>d.name===room);
        setSelected(item);
        setOpenDialogEdit(true);
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
            <Grid item xs={12} mt={2}>
                <RoomsTable data={hotel.rooms} removeRoom={handleRemove} showEdit={showEdit} />
            </Grid>

            <RoomCreateDialog id={hotel._id} open={openDialog} close={closeCreateDialog} save={save} />
            {
                selected && <RoomEditDialog id={hotel._id} selected={selected} open={openDialogEdit} close={closeDialogEdit} save={update} />
            }

        </Grid>
    );
};

export default RoomsManageContainer;