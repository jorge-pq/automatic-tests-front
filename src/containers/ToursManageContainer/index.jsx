import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import ToursTable from './components/ToursTable';
import TourCreateDialog from './components/TourCreateDialog';
import TourEditDialog from './components/TourEditDialog';
import { useMutation } from 'react-query';
import {addTour, updateTour, removeTour} from '../../services/tours.service';
import {useRouter} from 'next/router';


const ToursManageContainer = ({data}) => {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [selected, setSelected] = useState();

    const { mutate: save, isLoading, isError } = useMutation(addTour, {
        onSuccess: (data) => {
            setOpenDialog(false);
            router.reload();
        },
        onError: (error) => {
          alert('Error! ');
        }
      });

      const { mutate: edit} = useMutation(updateTour, {
        onSuccess: (data) => {
            setOpenDialogEdit(false);
            router.reload();
        },
        onError: (error) => {
          alert('Error! ');
        }
      });

      const { mutate: remove} = useMutation(removeTour, {
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

    const closeCreateDialogEdit = () => setOpenDialogEdit(false);

    const showEdit = id => {
        let item = data.find(d=>d._id===id);
        setSelected(item);
        setOpenDialogEdit(true);
    }


    return (
        <Grid container>
            <Grid item xs={6}>
                <Typography variant={'h6'}>{'Lista de tours'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'} onClick={openCreateDialog}>{'Agregar tour'}</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
                <ToursTable data={data} showEdit={showEdit} removeHotel={remove} />
            </Grid>

            <TourCreateDialog open={openDialog} close={closeCreateDialog} save={save} />
            {
                selected && <TourEditDialog open={openDialogEdit} close={closeCreateDialogEdit} item={selected} save={edit} />
            }
        </Grid>
    );
};

export default ToursManageContainer;