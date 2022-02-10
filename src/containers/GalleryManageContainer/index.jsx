import React, {useState} from 'react';
import { Grid, Typography, Divider, Stack, Button } from '@mui/material';
import { upload } from '../../services/hotels.service';
import { useMutation } from 'react-query';
import { useRouter } from 'next/router';


const GalleryManageContainer = ({ hotel }) => {

    const router = useRouter();

    const [imageMain, setImageMain] = useState();
    const [images, setImages] = useState();

    const { mutate: save, isLoading, isError } = useMutation(upload, {
        onSuccess: (data) => {
            router.reload();
        },
        onError: (error) => {
            alert('Error!');
        }
    });

    const handleImageMain = e => setImageMain(e.target.files[0]);
    const handleImages = e => setImages(e.target.files);

    const submit = () => {
        let form = new FormData();
        form.append("id", hotel._id);
        form.append("main", imageMain);
        if(images){
            Array.from(images).forEach(item => {
                form.append("images", item);    
            });
        }
        save(form);
    }


    console.log(hotel);

    return (
        <Grid container>
            <Grid item xs={12}>
                <Typography variant={'h6'}>{hotel.name}</Typography>
            </Grid>
            <Grid item xs={12} mt={3}>
                <Typography variant='body1'>{'Subir imagenes'}</Typography>
                <Divider />
            </Grid>
            <Grid item xs={12} mt={3}>
                <Grid container justifyContent={'flex-start'}>
                    <Stack direction={'row'} spacing={3}>
                        <label>Imagen principal</label>
                        <input type={'file'} size={'small'} onChange={handleImageMain} />
                        <label>Imagenes</label>
                        <input type={'file'} size={'small'} multiple onChange={handleImages} />
                        <Button variant='contained' disabled={imageMain ? false : true} onClick={submit}>{'Subir'}</Button>
                    </Stack>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={2}>
                Images
            </Grid>
        </Grid>
    );
};

export default GalleryManageContainer;