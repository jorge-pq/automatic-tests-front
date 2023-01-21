import React from 'react';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Pagination from '../../../components/Pagination';


const AgencySales = () => {

    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Paper elevation={3}>
            <Box p={2}>
                <Stack direction={'row'} justifyContent={'space-between'} mb={3}>
                    <Typography variant='h6'>{'Ventas por agencia'}</Typography>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={value} onChange={handleChange}>
                            <Tab label="Hoy" id={0} />
                            <Tab label="Mes" id={1} />
                        </Tabs>
                    </Box>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>{'Cafe travel'}</Typography>
                    <Typography><strong>{'$240'}</strong></Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'space-between'}>
                    <Typography>{'Retail test'}</Typography>
                    <Typography><strong>{'$560'}</strong></Typography>
                </Stack>
                <Stack direction={'row'} justifyContent={'flex-end'} mt={3}>
                    <Pagination page={1} totalPages={4} />
                </Stack>
            </Box>
        </Paper>
    );
};

export default AgencySales;