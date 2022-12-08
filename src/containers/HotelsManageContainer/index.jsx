import React, { useState } from 'react';
import { Grid, Typography, Button } from '@mui/material';
import HotelsTable from './components/HotelsTable';
import HotelsCreateDialog from './components/HotelsCreateDialog';
import HotelsEditDialog from './components/HotelsEditDialog';
import { useMutation } from 'react-query';
import {addHotel, updateHotel, removeHotel} from '../../services/hotels.service';
import {useRouter} from 'next/router';


const HotelsManageContainer = ({data}) => {

    const router = useRouter();
    const [openDialog, setOpenDialog] = useState(false);
    const [openDialogEdit, setOpenDialogEdit] = useState(false);
    const [selected, setSelected] = useState();

    const { mutate: save, isLoading, isError } = useMutation(addHotel, {
        onSuccess: (data) => {
            setOpenDialog(false);
            router.reload();
        },
        onError: (error) => {
          alert('Error! ');
        }
      });

      const { mutate: edit} = useMutation(updateHotel, {
        onSuccess: (data) => {
            setOpenDialogEdit(false);
            router.reload();
        },
        onError: (error) => {
          alert('Error! ');
        }
      });

      const { mutate: remove} = useMutation(removeHotel, {
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
                <Typography variant={'h6'}>{'Lista de hoteles'}</Typography>
            </Grid>
            <Grid item xs={6}>
                <Grid container justifyContent={'flex-end'}>
                    <Button variant={'contained'} onClick={openCreateDialog}>{'Agregar hotel'}</Button>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
                <HotelsTable data={data} showEdit={showEdit} removeHotel={remove} />
            </Grid>

            <HotelsCreateDialog open={openDialog} close={closeCreateDialog} save={save} />
            {
                selected && <HotelsEditDialog open={openDialogEdit} close={closeCreateDialogEdit} item={selected} save={edit} />
            }
        </Grid>
    );
};

export default HotelsManageContainer;