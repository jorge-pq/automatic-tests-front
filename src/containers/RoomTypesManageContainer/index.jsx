import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import RoomTypesTable from './components/RoomTypesTable';
import RoomTypeCreateDialog from './components/RoomTypeCreateDialog';
import RoomTypeEditDialog from './components/RoomTypeEditDialog';
import { addRoomTypes, updateRoomTypes, removeRoomTypes } from '../../services/hotels.service';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';

const RoomTypesManageContainer = ({types}) => {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);

    const [selected, setSelected] = useState();

    const { mutate: save, isLoading, isError } = useMutation(addRoomTypes, {
        onSuccess: (data) => {
            setOpenDialog(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: update } = useMutation(updateRoomTypes, {
        onSuccess: (data) => {
            setOpenDialogEdit(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const { mutate: remove } = useMutation(removeRoomTypes, {
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

    const handleRemove = id => {
        remove(id);
    }

    const showEdit = id => {
        const item = types.find(d=>d._id===id);
        setSelected(item);
        setOpenDialogEdit(true);
    }

    return (
        <Grid container>
        <Grid item xs={6}>
            <Typography variant={'h6'}>{'Tipos'}</Typography>
        </Grid>
        <Grid item xs={6}>
            <Grid container justifyContent={'flex-end'}>
                <Button variant={'contained'} onClick={openCreateDialog}>{'Agregar tipo de habitación'}</Button>
            </Grid>
        </Grid>
        <Grid item xs={12} mt={2}>
            <RoomTypesTable data={types} removeRoom={handleRemove} showEdit={showEdit} />
        </Grid>

        <RoomTypeCreateDialog open={openDialog} close={closeCreateDialog} save={save} />
        {
            selected && <RoomTypeEditDialog selected={selected} open={openDialogEdit} close={closeDialogEdit} save={update} />
        }

    </Grid>
    );
};

export default RoomTypesManageContainer;