import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import ArticleIcon from '@mui/icons-material/Article';
import Typography from '@mui/material/Typography';
import {getOrdersCount} from '../../../services/booking.service';


const OrdersTotal = () => {

    const [count, setCount] = useState(0);

    const getTotal = async ()=> {
        let data = await getOrdersCount();
        setCount(parseInt(data.total));
    }

    useEffect(() => {
         getTotal();
        return () => {
            setCount(0);
        };
    }, []);

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography variant='h5'>{'Ordenes'}</Typography>
                    <ArticleIcon color='info' />
                </Stack>
                <Stack direction={'row'} justifyContent={'center'}>
                     <Typography variant='h3' color={'GrayText'}>{count}</Typography>
                </Stack>
            </Box>
        </Paper>
    );
};

export default OrdersTotal;