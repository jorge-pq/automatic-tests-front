import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import TourDetailsTable from './components/TourDetailsTable';
import TourDetailsCreateDialog from './components/TourDetailsCreateDialog';
import TourDetailsEditDialog from './components/TourDetailsEditDialog';
import { addDetails, removeDetails, updateDetails } from '../../services/tours.service';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';
import 'react-datepicker/dist/react-datepicker.css';


const TourDetailsManageContainer = ({ tour, roomTypes }) => {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);

    const [selected, setSelected] = useState();

    const { mutate: save, isLoading, isError } = useMutation(addDetails, {
        onSuccess: (data) => {
            setOpenDialog(false);
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    // const { mutate: update } = useMutation(updateDetails, {
    //     onSuccess: (data) => {
    //         setOpenDialogEdit(false);
    //         router.reload();
    //     },
    //     onError: (error) => {
    //         alert('Error! ');
    //     }
    // });

    const { mutate: remove } = useMutation(removeDetails, {
        onSuccess: (data) => {
            router.reload();
        },
        onError: (error) => {
            alert('Error! ');
        }
    });

    const handleDialog = () => {
        if(tour.details.length > 0){
            setSelected(tour.details[0]);
            setOpenDialogEdit(true);
        }
        else{
            setOpenDialog(true);
        }
    }

    const closeCreateDialog = () => {
        setOpenDialog(false);
    }
    
    const closeDialogEdit = () => {
        setOpenDialogEdit(false);
    }

    const handleRemove = room => {
        const data = {
            hotelId: tour._id,
            roomName: room
        }
        remove(data);
    }

    const showEdit = room => {
        const item = tour.details.find(d=>d.name===room);
        setSelected(item);
        setOpenDialogEdit(true);
    }
    
    const types = roomTypes.map(d=>d.name);

    const getRoomTypePersons = name => roomTypes.find(d=>d.name===name).persons;

    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant={'h6'}>{tour.name}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'} onClick={handleDialog}>{tour.details.length > 0 ? 'Editar detalles' : 'Agregar detalles'}</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
                <TourDetailsTable data={tour.details} removeRoom={handleRemove} showEdit={showEdit} />
            </Grid>

            <TourDetailsCreateDialog types={types} getRoomTypePersons={getRoomTypePersons} id={tour._id} open={openDialog} close={closeCreateDialog} save={save} />
            {
                selected && <TourDetailsEditDialog types={types} id={tour._id} selected={selected} open={openDialogEdit} close={closeDialogEdit} save={save} />
            }

        </Grid>
    );
};

export default TourDetailsManageContainer;