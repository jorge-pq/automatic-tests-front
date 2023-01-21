import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArticleIcon from '@mui/icons-material/Article';
import Typography from '@mui/material/Typography';

const OrdersTotal = () => {
    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='h5'>{'Ordenes'}</Typography>
                    <ArticleIcon color='info' />
                </Stack>
                <Stack direction={'row'} justifyContent={'center'}>
                     <Typography variant='h3' color={'GrayText'}>{'140'}</Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default OrdersTotal;