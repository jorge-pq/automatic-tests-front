import React from 'react';
import PeopleIcon from '@mui/icons-material/People';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';



const ClientsTotal = () => {
    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='h5'>{'Clientes'}</Typography>
                    <PeopleIcon color='info' />
                </Stack>
                <Stack direction={'row'} justifyContent={'center'}>
                     <Typography variant='h3' color={'GrayText'}>{'2500'}</Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default ClientsTotal;